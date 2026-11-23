import {
  sendDic, loadDic, loadCascaderDic, loadLocalDic,
  getRowDicRequests, isRowDicColumn, normalizeDicData,
} from 'core/dic';
import { DIC_PROPS } from 'global/variable';
import slot from 'core/slot';
import { validateOption, warnOption } from 'core/option';
import isEqual from 'lodash/isEqual';
import { getViewportWidth, subscribeViewportWidth } from 'core/viewport';

interface DicRequestState {
  active: Set<string>;
  sequence: Record<string, number>;
  revision: Record<string, number>;
  config?: Record<string, any>;
  unmounted: boolean;
  stopViewport?: () => void;
}

const dicRequestStates = new WeakMap<object, DicRequestState>();
const dicRequestKeys = [
  'dicUrl', 'dicQuery', 'dicHeaders', 'dicMethod', 'dicFormatter',
  'props', 'dataType', 'dicFlag', 'lazy', 'remote', 'parentProp',
];

const getDicRequestState = (safe: object) => {
  let state = dicRequestStates.get(safe);
  if (!state) {
    state = {
      active: new Set(),
      sequence: {},
      revision: {},
      unmounted: false,
    };
    dicRequestStates.set(safe, state);
  }
  return state;
};

export default function (name: string) {
  return {
    mixins: [slot],
    emits: ['update:modelValue', 'change', 'dic-error'],
    props: {
      tableData: {
        type: Object,
        default: () => {
          return {};
        },
      },
      option: {
        type: Object,
        required: true,
        default: () => {
          return {};
        },
      },
    },
    watch: {
      rowDicRequests(requests: any[]) {
        this.handleLoadRowDic(requests);
      },
      propOption: {
        handler(list: any[]) {
          list.forEach((ele) => (this.objectOption[ele.prop] = ele));
        },
        deep: true,
      },
      option: {
        handler() {
          this.init(false);
        },
        deep: true,
      },
    },
    data() {
      return {
        DIC: {},
        cascaderDIC: {},
        rowDIC: new Map(),
        rowDicOverrides: {},
        tableOption: {},
        objectOption: {},
        dicLoading: false,
        dicError: null,
        componentViewportWidth: getViewportWidth(),
      };
    },
    mounted() {
      const state = getDicRequestState(this);
      state.unmounted = false;
      state.stopViewport = subscribeViewportWidth(width => { this.componentViewportWidth = width; });
      this.init();
    },
    beforeUnmount() {
      const state = getDicRequestState(this);
      state.unmounted = true;
      state.stopViewport?.();
      state.active.clear();
    },
    computed: {
      rowDicColumns() {
        // propOption has resolved cascader parentProp; those columns keep the parent key.
        const columns: Record<string, any>[] = name === 'crud'
          ? this.propOption.filter(isRowDicColumn)
          : [];
        return new Map(columns.map((column) => [column.prop, column]));
      },
      rowDicRequests() {
        if (!this.rowDicColumns.size) return [];
        return getRowDicRequests(
          Array.from(this.rowDicColumns.values()), this.data, this.childrenKey,
        );
      },
      isMobile() {
        return this.componentViewportWidth <= 768;
      },
      resultOption() {
        return {
          ...this.tableOption,
          ...{
            column: this.propOption || [],
          },
        };
      },
      rowKey() {
        return this.tableOption.rowKey || DIC_PROPS.rowKey;
      },
      formRules() {
        const result: Record<string, any> = {};
        this.propOption.forEach((ele: any) => {
          if (ele.rules && ele.display !== false) result[ele.prop] = ele.rules;
        });
        return result;
      },
    },
    methods: {
      init(this: any, type?: boolean) {
        const globOption = this.deepClone(this.$TVUE[`${name}Option`]);
        const option = {
          ...globOption,
          ...this.deepClone(this.option),
        };
        this.tableOption = option;
        const componentName =
          name || (this.$options.name || '').replace(/^tvue-/, '') || 'component';
        if (
          this.$TVUE.optionValidate !== false &&
          option.optionValidate !== false
        ) {
          warnOption(validateOption(option, componentName), componentName);
        }
        if (name === 'crud' && typeof this.restoreColumnState === 'function') {
          this.restoreColumnState();
        }
        const state = getDicRequestState(this);
        const previous = state.config;
        const config: Record<string, any> = {};
        this.propOption.forEach((column: any) => {
          const request: Record<string, any> = {};
          dicRequestKeys.forEach((key) => {
            if (column[key] !== undefined) request[key] = column[key];
          });
          config[column.prop] = {
            request,
            local: {
              dicData: column.dicData,
              optionData: (option.dicData || {})[column.prop],
              props: column.props,
              dataType: column.dataType,
            },
          };
        });
        state.config = this.deepClone(config);
        if (type !== false || !previous) {
          this.handleLocalDic();
          if (type !== false) this.handleLoadDic();
          return;
        }
        const localProps = new Set<string>();
        const remoteColumns: any[] = [];
        this.propOption.forEach((column: any) => {
          const prop = column.prop;
          const before = previous[prop] || {};
          const localChanged = !isEqual(before.local, config[prop].local);
          const requestChanged = !isEqual(before.request, config[prop].request);
          if (!localChanged && !requestChanged) return;
          this.invalidateDicRequest(`option-dic:${prop}`, prop);
          if (localChanged) localProps.add(prop);
          if (requestChanged && column.dicUrl && !column.parentProp &&
            column.dicFlag !== false && column.lazy !== true &&
            !this.rowDicColumns.has(prop)) remoteColumns.push(column);
        });
        Object.keys(previous).forEach((prop) => {
          if (!config[prop]) this.invalidateDicRequest(`option-dic:${prop}`, prop);
        });
        if (localProps.size) this.handleLocalDic(localProps);
        remoteColumns.forEach((column: any) => {
          const revision = state.revision[column.prop];
          this.requestDic({ column }, `option-dic:${column.prop}`).then((list: any[]) => {
            if (list && !state.unmounted && state.revision[column.prop] === revision) {
              this.DIC[column.prop] = list;
            }
          });
        });
      },
      dicInit(this: any, type: string) {
        if (type === 'cascader') {
          return this.handleLoadCascaderDic();
        } else {
          return this.rowDicColumns.size
            ? Promise.all([this.handleLoadDic(), this.handleLoadRowDic()])
              .then(([result]) => result)
            : this.handleLoadDic();
        }
      },
      updateDic(this: any, prop: string, list?: any[]) {
        if (this.validatenull(prop)) return this.handleLoadDic();
        const column = this.findObject(this.propOption, prop);
        if (!column) return Promise.resolve(null);
        // Invalidate every older load source for this column, without dropping
        // unrelated columns from a pending batch.
        this.invalidateDicRequest(`update:${prop}`, prop);
        const revision = getDicRequestState(this).revision[prop];
        const useRowDic = this.rowDicColumns.has(prop);
        const formatter = column.dicFormatter;
        const isCurrent = () => {
          const state = getDicRequestState(this);
          return !state.unmounted && state.revision[prop] === revision;
        };
        const apply = (currentList: any[], normalized = false) => {
          if (!isCurrent()) return;
          if (!Array.isArray(currentList)) throw new TypeError('Dictionary formatter must return an array');
          this.DIC[prop] = normalized ? currentList : normalizeDicData(currentList, column.props, column.dataType);
          if (useRowDic) {
            // A pending automatic response must not replace an explicit dictionary.
            this.rowDicOverrides[prop] = this.DIC[prop];
          }
        };
        if (list === undefined && !this.validatenull(column.dicUrl)) {
          if (useRowDic) {
            return this.handleLoadRowDic();
          }
          return this.requestDic(
            {
              column,
            },
            `update:${prop}`,
          ).then((currentList: any[]) => {
            if (currentList) apply(currentList, true);
            return currentList;
          });
        } else {
          const source = list || [];
          if (!isCurrent()) return Promise.resolve(null);
          try {
            const formatted = source.length && typeof formatter === 'function'
              ? formatter(this.deepClone(source), this.deepClone(this.tableForm || this.form || {}))
              : source;
            if (formatted && typeof formatted.then === 'function') {
              const pending = Promise.resolve(formatted);
              // A same-tick clear can skip the scheduled request altogether.
              // Its formatter still needs a rejection observer.
              pending.catch(() => {});
              return this.runDicRequest(`update:${prop}`, () => pending,
                (result: any[]) => apply(result), isCurrent, prop)
                .then((result: any) => result === null ? null : source);
            }
            apply(formatted);
            return Promise.resolve(source);
          } catch (error) {
            if (isCurrent()) this.reportDicError(`update:${prop}`, error, prop);
            return Promise.resolve(null);
          }
        }
      },
      handleSetDic(
        this: any,
        list: Record<string, any>,
        res: Record<string, any> = {},
        revisions?: Record<string, number>,
      ) {
        Object.keys(res).forEach((ele) => {
          if (revisions && (revisions[ele] || 0) !==
            (getDicRequestState(this).revision[ele] || 0)) return;
          list[ele] = res[ele];
        });
      },
      handleLocalDic(this: any, props?: Set<string>) {
        const revisions = { ...getDicRequestState(this).revision };
        const errors: { error: any; prop: string }[] = [];
        const option = { ...this.resultOption };
        if (props) {
          option.column = option.column.filter((column: any) => props.has(column.prop));
          option.dicData = Object.entries(option.dicData || {}).reduce((result, [prop, data]) => {
            if (props.has(prop)) result[prop] = data;
            return result;
          }, {} as Record<string, any>);
        }
        const localDic = loadLocalDic(option, (error, prop) => errors.push({ error, prop }));
        this.handleSetDic(this.DIC, localDic.data);
        return this.runDicRequest(
          props ? `local-dic:${Array.from(props).sort().join(',')}` : 'local-dic',
          () => localDic.pending,
          (result: Record<string, any>) => {
            this.handleSetDic(this.DIC, result, revisions);
            this.handleDicErrors('local-dic', errors, revisions);
          },
        );
      },
      handleLoadDic(this: any) {
        const revisions = { ...getDicRequestState(this).revision };
        const errors: { error: any; prop: string }[] = [];
        return this.runDicRequest(
          'dic',
          () => loadDic(this.resultOption, this, this.rowDicColumns.size > 0,
            (error, prop) => errors.push({ error, prop })),
          (result: Record<string, any>) => {
            this.handleSetDic(this.DIC, result, revisions);
            this.handleDicErrors('dic', errors, revisions);
          },
        );
      },
      getRowDic(this: any, row: any, column: any) {
        if (this.rowDicColumns.has(column.prop)) {
          if (Object.prototype.hasOwnProperty.call(this.rowDicOverrides, column.prop)) {
            return this.rowDicOverrides[column.prop];
          }
          return this.rowDIC.get(row)?.[column.prop];
        }
        const cascader = (this.cascaderDIC[row.$index] || {})[column.prop];
        return column.parentProp ? cascader : cascader || this.DIC[column.prop];
      },
      handleLoadRowDic(this: any, requests = this.rowDicRequests) {
        const revisions = { ...getDicRequestState(this).revision };
        const errors: { error: any; prop: string }[] = [];
        // Drop the previous page immediately; late responses are guarded by runDicRequest.
        this.rowDIC = new Map();
        this.rowDicOverrides = {};
        return this.runDicRequest(
          'row-dic',
          () => Promise.all(requests.map((request: any) => {
            const { column, value, empty } = request;
            return (empty ? Promise.resolve([]) : sendDic({
              column,
              value,
              form: this.deepClone(request.form),
              dataType: column.dataType,
            }, this)).then((data: any[]) => ({ ...request, data })).catch((error: any) => {
              errors.push({ error, prop: column.prop });
              return null;
            });
          })),
          (result: any[]) => {
            const dictionaries = new Map();
            result.forEach((item) => {
              if (!item) return;
              const { form, column, data } = item;
              if ((revisions[column.prop] || 0) !==
                (getDicRequestState(this).revision[column.prop] || 0)) return;
              if (!dictionaries.has(form)) dictionaries.set(form, {});
              dictionaries.get(form)[column.prop] = data;
            });
            this.rowDIC = dictionaries;
            this.handleDicErrors('row-dic', errors, revisions);
          },
        );
      },
      handleLoadCascaderDic(this: any) {
        const revisions = { ...getDicRequestState(this).revision };
        const errors: { error: any; prop: string }[] = [];
        return this.runDicRequest(
          'cascader',
          () => loadCascaderDic(this.propOption, this,
            (error, prop) => errors.push({ error, prop })),
          (result: Record<string, any>) => {
            Object.keys(result).forEach((index) => {
              if (!this.cascaderDIC[index]) this.cascaderDIC[index] = {};
              this.handleSetDic(this.cascaderDIC[index], result[index], revisions);
            });
            this.handleDicErrors('cascader', errors, revisions);
          },
        );
      },
      requestDic(
        this: any,
        params: Record<string, any>,
        requestType = 'manual',
      ) {
        const column = params.column || {};
        const form = params.form || this.tableForm || this.form || {};
        const prop = column.prop || params.name;
        const revision = getDicRequestState(this).revision[prop] || 0;
        const requestParams = this.deepClone({
          ...params,
          form,
          value: params.value === undefined ? form[column.parentProp || prop] : params.value,
          dataType: params.dataType === undefined ? column.dataType : params.dataType,
        });
        // Capture the form and column configuration before another model update.
        return this.runDicRequest(
          requestType,
          () => sendDic(requestParams, this),
          undefined,
          () => !prop || (getDicRequestState(this).revision[prop] || 0) === revision,
          prop,
        );
      },
      handleDicErrors(this: any, type: string, errors: { error: any; prop: string }[],
                      revisions: Record<string, number>) {
        errors.forEach(({ error, prop }) => {
          if ((revisions[prop] || 0) !== (getDicRequestState(this).revision[prop] || 0)) return;
          this.reportDicError(type, error, prop);
        });
      },
      reportDicError(this: any, type: string, error: any, prop?: string) {
        this.dicError = error;
        this.$emit('dic-error', { type, error, prop });
      },
      invalidateDicRequest(this: any, requestType: string, prop?: string) {
        const state = getDicRequestState(this);
        state.sequence[requestType] = (state.sequence[requestType] || 0) + 1;
        if (prop) state.revision[prop] = (state.revision[prop] || 0) + 1;
        state.active.forEach((token) => {
          if (token.startsWith(`${requestType}:`)) state.active.delete(token);
        });
        if (!state.unmounted) this.dicLoading = state.active.size > 0;
      },
      runDicRequest(
        this: any,
        requestType: string,
        request: () => Promise<any>,
        apply?: (result: any) => void,
        isValid?: () => boolean,
        prop?: string,
      ) {
        const state = getDicRequestState(this);
        if (state.unmounted) return Promise.resolve(null);
        this.invalidateDicRequest(requestType);
        const requestId = state.sequence[requestType];
        const token = `${requestType}:${requestId}`;
        state.active.add(token);
        this.dicLoading = true;
        this.dicError = null;

        const isCurrent = () =>
          !state.unmounted && state.sequence[requestType] === requestId &&
          (!isValid || isValid());

        return Promise.resolve()
          .then(() => isCurrent() ? request() : null)
          .then((result) => {
            if (!isCurrent()) return null;
            if (apply) apply(result);
            return result;
          })
          .catch((error) => {
            if (isCurrent()) {
              this.reportDicError(requestType, error, prop);
            }
            return null;
          })
          .finally(() => {
            state.active.delete(token);
            if (!state.unmounted) {
              this.dicLoading = state.active.size > 0;
            }
          });
      },
    },
  };
}
