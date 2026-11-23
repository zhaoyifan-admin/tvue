import { deepClone, detailDataType, getAsVal } from 'utils/util';
import { validatenull } from 'utils/validate';
import { DIC_PROPS } from 'global/variable';

const key = 'key';
type DicErrorHandler = (error: any, prop: string) => void;

const settleDic = <T>(task: Promise<T>, prop: string, onError?: DicErrorHandler) =>
  task.catch((error) => {
    if (onError) onError(error, prop);
    return null;
  });

const getDicTemplateKeys = (column: Record<string, any>) => {
  const values = [
    column.dicUrl,
    ...Object.values(column.dicQuery || {}),
    ...Object.values(column.dicHeaders || {}),
  ];
  const keys: string[] = [];
  values.forEach((value) => {
    if (typeof value !== 'string') return;
    (value.match(/\{\{[^{}]+\}\}/g) || []).forEach((match) => {
      keys.push(match.slice(2, -2));
    });
  });
  return keys;
};

export const isRowDicColumn = (column: Record<string, any>) =>
  !!column.dicUrl &&
  !column.parentProp &&
  column.remote !== true &&
  column.lazy !== true &&
  column.dicFlag !== false &&
  getDicTemplateKeys(column).length > 0;

// Only track fields used by the request. Generated $labels must not reload it.
export const getRowDicRequests = (
  columns: Record<string, any>[] = [],
  rows: Record<string, any>[] = [],
  childrenKey = DIC_PROPS.children,
) => {
  const rowColumns = columns.filter(isRowDicColumn);
  const requests: Record<string, any>[] = [];
  const visit = (list: Record<string, any>[]) => {
    list.forEach((form) => {
      rowColumns.forEach((column) => {
        const value = form[column.prop];
        const values = getDicTemplateKeys(column).map((prop) =>
          prop === key ? value : form[prop],
        );
        requests.push({
          form,
          column: { ...column, props: { ...column.props } },
          value,
          // Track in-place changes to array-valued request parameters as well.
          context: JSON.stringify(values),
          empty: values.some(validatenull),
        });
      });
      if (Array.isArray(form[childrenKey])) visit(form[childrenKey]);
    });
  };
  if (rowColumns.length) visit(rows);
  return requests;
};

export const normalizeDicData = (
  list: Record<string, any>[] = [],
  props: Record<string, any> = {},
  type?: any,
) => {
  const valueKey = props.value || DIC_PROPS.value;
  const childrenKey = props.children || DIC_PROPS.children;
  if (!Array.isArray(list)) return list;
  return list.map((ele) => {
    const item = { ...ele, [valueKey]: detailDataType(ele[valueKey], type) };
    if (Array.isArray(ele[childrenKey])) {
      item[childrenKey] = normalizeDicData(ele[childrenKey], props, type);
    }
    return item;
  });
};

function getResData(data: any, props: Record<string, any>) {
  const bind = props.res;
  let res = data;
  const deep = data.data;
  if (bind) {
    res = getAsVal(res, bind);
  } else if (deep) {
    res = Array.isArray(deep) ? deep : [deep];
  }
  return res;
}

export const loadCascaderDic = async (
  columnOption: Record<string, any>[] = [],
  safe: any,
  onError?: DicErrorHandler,
) => {
  const columnList = columnOption.filter((ele) => ele.parentProp);
  const tasks: Promise<{ prop: string; data: any[]; index: number }>[] = [];

  (safe.data || []).forEach((form: any, index: number) => {
    columnList.forEach((column) => {
      if (column.hide === true || column.dicFlag === false) return;

      const value = form[column.parentProp];
      if (validatenull(value)) {
        tasks.push(Promise.resolve({ prop: column.prop, data: [], index }));
        return;
      }

      tasks.push(
        settleDic(sendDic(
          {
            url: column.dicUrl,
            props: column.props,
            method: column.dicMethod,
            headers: column.dicHeaders,
            formatter: column.dicFormatter,
            query: column.dicQuery,
            dataType: column.dataType,
            form,
            value,
          },
          safe,
        ).then((data) => ({ prop: column.prop, data, index })), column.prop, onError),
      );
    });
  });

  const result: Record<string, any> = {};
  const data = await Promise.all(tasks);
  data.forEach((item) => {
    if (!item) return;
    if (!result[item.index]) result[item.index] = {};
    result[item.index][item.prop] = item.data;
  });
  return result;
};

export const loadDic = async (
  option: Record<string, any>, safe: any, rowScoped = false, onError?: DicErrorHandler,
) => {
  let notList: string[] = [];
  const tasks: Promise<{ prop: string; data: any[] }>[] = [];
  const column = option.column || [];

  column.forEach((ele: any) => {
    const url = ele.dicUrl;
    const prop = ele.prop;
    const parentProp = ele.parentProp;
    notList = notList.concat(ele.cascader || []);
    const flag = ele.dicFlag === false || ele.lazy === true || notList.includes(prop);
    if (!url || parentProp || flag || (rowScoped && isRowDicColumn(ele))) return;

    tasks.push(
      settleDic(sendDic(
        {
          url,
          name: prop,
          method: ele.dicMethod,
          headers: ele.dicHeaders,
          formatter: ele.dicFormatter,
          props: ele.props,
          dataType: ele.dataType,
          query: ele.dicQuery,
          form: safe.tableForm || safe.form || {},
          value: (safe.tableForm || safe.form || {})[prop],
        },
        safe,
      ).then((data) => ({ prop, data })), prop, onError),
    );
  });

  const result: Record<string, any> = {};
  const data = await Promise.all(tasks);
  data.forEach((item) => {
    if (!item) return;
    result[item.prop] = item.data;
  });
  return result;
};

export const loadLocalDic = (option: Record<string, any>, onError?: DicErrorHandler) => {
  const columnData: Record<string, any> = {};
  const optionData = option.dicData || {};
  const tasks: Promise<{ prop: string; data: any[] }>[] = [];

  (option.column || []).forEach((ele: any) => {
    const dic = ele.dicData;
    const prop = ele.prop;
    if (dic instanceof Function) {
      try {
        const dicResult = dic(ele);
        if (dicResult && typeof dicResult.then === 'function') {
          tasks.push(
            settleDic(Promise.resolve(dicResult).then((res: any[]) => ({
              prop,
              data: normalizeDicData(res, ele.props, ele.dataType),
            })), prop, onError),
          );
        } else {
          columnData[prop] = normalizeDicData(dicResult, ele.props, ele.dataType);
        }
      } catch (error) {
        tasks.push(settleDic(Promise.reject(error), prop, onError));
      }
    } else if (dic instanceof Array) {
      columnData[prop] = normalizeDicData(dic, ele.props, ele.dataType);
    } else if (Object.prototype.hasOwnProperty.call(optionData, prop)) {
      columnData[prop] = normalizeDicData(optionData[prop], ele.props, ele.dataType);
    }
  });

  return {
    data: { ...optionData, ...columnData },
    pending: Promise.all(tasks).then((items) => {
      return items.reduce((result, item) => {
        if (!item) return result;
        result[item.prop] = item.data;
        return result;
      }, {} as Record<string, any>);
    }),
  };
};

export const sendDic = (params: Record<string, any>, safe: any) => {
  let {
    url,
    query,
    method,
    props,
    formatter,
    headers,
    value,
    column = {},
    form = {},
    dataType,
  } = params;
  url = column.dicUrl || url;
  method = (column.dicMethod || method || 'get').toLowerCase();
  headers = column.dicHeaders || headers || {};
  query = column.dicQuery || query || {};
  formatter = column.dicFormatter || formatter;
  props = column.props || props || {};
  dataType = column.dataType === undefined ? dataType : column.dataType;
  if (!url) return Promise.resolve([]);
  // Request templates and formatters must observe the same form snapshot.
  form = deepClone(form);

  const list = url.match(/[^\{\}]+(?=\})/g) || [];
  list.forEach((ele: string) => {
    let result = ele === key ? value : form[ele];
    if (validatenull(result)) result = '';
    url = url.replace(`{{${ele}}}`, result);
  });

  const getKey = (data: Record<string, any>) => {
    const result: Record<string, any> = {};
    Object.keys(data).forEach((ele) => {
      const eleKey = data[ele];
      if (typeof eleKey === 'string' && eleKey.match(/\{{|}}/g)) {
        const prop = eleKey.replace(/\{{|}}/g, '');
        result[ele] = prop == key ? value : form[prop];
      } else {
        result[ele] = eleKey;
      }
    });
    return result;
  };

  const getData = () => {
    const data = getKey(query);
    if (method == 'get') return { params: data };
    return { data };
  };

  const requestConfig = Object.assign(
    { url, method, headers: getKey(headers) },
    getData(),
  );

  return Promise.resolve()
    .then(() =>
      safe.$axios(requestConfig),
    )
    .then(async (res: any) => {
      let currentList: any[] = [];
      res = res.data || {};
      if (typeof formatter === 'function') {
        currentList = await formatter(res, form);
      } else {
        currentList = getResData(res, props);
      }
      return normalizeDicData(currentList, props, dataType);
    });
};
