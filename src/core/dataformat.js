import { validatenull } from "utils/validate";
import {
  KEY_COMPONENT_NAME,
  DIC_SPLIT,
  ARRAY_LIST,
  ARRAY_LIST_ANT,
  DATE_LIST,
  DATE_LIST_ANT,
  INPUT_LIST,
  ARRAY_VALUE_LIST,
  MULTIPLE_LIST,
  SELECT_LIST,
  RANGE_LIST,
} from "global/variable";
import { detailDataType, findObject, createObj } from "utils/util";
import { t } from "locale";
/**
 * 计算级联属性
 */
export const calcCascader = (list = []) => {
  list.forEach((ele) => {
    let cascader = ele.cascader;
    if (!validatenull(cascader)) {
      let parentProp = ele.prop;
      cascader.forEach((citem) => {
        let column = findObject(list, citem);
        if (column) column.parentProp = parentProp;
      });
    }
  });
  return list;
};
/**
 * 计算空白列row
 */
let count = 0;
export const calcCount = (ele, spanDefault = 12, init = false) => {
  const spanAll = 24;
  if (init) count = 0;
  const currentSpan = (ele.span || spanDefault) + (ele.offset || 0);
  count += currentSpan;
  if (ele.row && count < spanAll) {
    ele.count = spanAll - count;
    count = 0;
  } else if (count >= spanAll) {
    count = 0;
  }
  return ele;
};

/**
 * 初始化数据格式
 */
export const initVal = (value, safe) => {
  let {
    type,
    multiple,
    dataType,
    separator = DIC_SPLIT,
    alone,
    emitPath,
    range,
  } = safe;
  let list = value;
  if (
    (MULTIPLE_LIST.includes(type) && multiple == true) ||
    (ARRAY_VALUE_LIST.includes(type) && emitPath !== false) ||
    (RANGE_LIST.includes(type) && range == true)
  ) {
    if (!Array.isArray(list)) {
      if (validatenull(list)) {
        list = [];
      } else {
        if (dataType == "json") {
          list = JSON.parse(list);
        } else {
          list = (list + "").split(separator) || [];
        }
      }
    }
    // 数据转化
    list.forEach((ele, index) => {
      list[index] = detailDataType(ele, dataType);
    });
    if (ARRAY_LIST.includes(type) && validatenull(list) && alone) list = [""];
  } else {
    list = detailDataType(list, dataType);
  }
  return list;
};

/**
 * 搜索框获取动态组件
 */
export const getSearchType = (column) => {
  const type = column.type;
  const range = column.searchRange;
  let result = type;
  if (column.searchType) return column.searchType;
  if (["radio", "checkbox", "switch"].includes(type)) {
    result = "select";
  } else if (DATE_LIST.includes(type)) {
    let rangeKey = "range";
    if (range) {
      if (!type.includes(rangeKey)) {
        result = type + rangeKey;
      } else {
        result = type;
      }
    } else result = type.replace(rangeKey, "");
  } else if (["textarea"].includes(type)) {
    result = "input";
  }
  return result;
};

/**
 * 根据 componentType 转换 type
 * @param {String} type - 原始类型
 * @param {String} componentType - 组件库类型 'element' | 'ant' | '' (默认为 element)
 * @returns {String} 转换后的类型
 */
export const transformTypeByComponentType = (type, componentType) => {
  if (!type) return type;

  // 默认使用 element，如果 componentType 为空或 'element'，移除 ant- 前缀
  if (!componentType || componentType === 'element') {
    // 如果 type 有 ant- 前缀，移除它
    if (type.startsWith('ant-')) {
      return type.replace('ant-', '');
    }
    return type;
  }

  // 如果是 ant 类型，添加 ant- 前缀
  if (componentType === 'ant') {
    // 如果已经有 ant- 前缀，直接返回
    if (type.startsWith('ant-')) {
      return type;
    }
    return `ant-${type}`;
  }

  return `${componentType}-${type}`;
};

/**
 * 动态获取组件
 * @param {String} type - 组件类型
 * @param {String|Function} component - 自定义组件（可选）
 * @param {String} componentType - 组件库类型 'element' | 'ant' | '' (默认为 element)
 * @returns {String} 组件名称
 */
export const getComponent = (type, component, componentType = '') => {
  let result = type || 'input';

  // 如果提供了 component，优先使用
  if (!validatenull(component)) {
    return component;
  }

  // 根据 componentType 转换 type（element 为默认，无需显式指定）
  result = transformTypeByComponentType(result, componentType);

  // 原有的组件映射逻辑
  if (ARRAY_LIST.includes(result)) {
    result = 'array';
  } else if (ARRAY_LIST_ANT.includes(result)) {
    result = 'ant-array';
  } else if (['time', 'timerange'].includes(result)) {
    result = 'time';
  } else if (DATE_LIST.includes(result)) {
    result = 'date';
  } else if (DATE_LIST_ANT.includes(result)) {
    result = 'ant-date';
  } else if (['password', 'textarea', 'search', 'phone', 'currency', 'bankCard', 'bank-card', 'idCard', 'id-card', 'email', 'code', 'plate', 'ip', 'mac', 'uscc'].includes(result)) {
    result = 'input';
  } else if (['ant-search', 'ant-phone', 'ant-currency', 'ant-bankCard', 'ant-password', 'ant-bank-card', 'ant-idCard', 'ant-id-card', 'ant-email', 'ant-code', 'ant-plate', 'ant-ip', 'ant-mac', 'ant-uscc', 'ant-textarea'].includes(result)) {
    result = 'ant-input';
  } else if (result === 'cron') {
    result = 'input-cron';
  } else if (INPUT_LIST.includes(result)) {
    result = 'input-' + result;
  }

  return KEY_COMPONENT_NAME + result;
};

/**
 * 表格初始化值
 */

export const formInitVal = (list = []) => {
  let tableForm = {};
  list.forEach((ele) => {
    if (
      ["rate", "slider", "number"].includes(ele.type) ||
      ele.dataType === "number" ||
      (ele.type == "select" && ele.virtualize == true)
    ) {
      tableForm[ele.prop] = undefined;
    } else if (
      (ARRAY_VALUE_LIST.includes(ele.type) &&
        ele.emitPath !== false &&
        ele.dataType != "json") ||
      (MULTIPLE_LIST.includes(ele.type) && ele.multiple) ||
      ele.dataType === "array"
    ) {
      tableForm[ele.prop] = [];
    } else if (RANGE_LIST.includes(ele.type) && ele.range == true) {
      tableForm[ele.prop] = [0, 0];
    } else {
      tableForm[ele.prop] = "";
    }
    if (ele.bind) {
      tableForm = createObj(tableForm, ele.bind);
    }
    // 表单默认值设置
    if (!validatenull(ele.value)) {
      tableForm[ele.prop] = ele.value;
    }
  });
  return tableForm;
};

export const getPlaceholder = function (column, type) {
  const placeholder = column.placeholder;
  const label = column.label;
  if (type === "search") {
    const searchPlaceholder = column.searchPlaceholder;
    if (!validatenull(searchPlaceholder)) {
      return searchPlaceholder;
    } else {
      return label;
    }
  } else if (validatenull(placeholder)) {
    if (SELECT_LIST.includes(column.type)) {
      return `${t("tip.select")} ${label}`;
    } else {
      return `${t("tip.input")} ${label}`;
    }
  }

  return placeholder;
};
