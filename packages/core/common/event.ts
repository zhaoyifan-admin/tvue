import { initVal } from 'core/dataformat';
import { cloneModel, isModelEqual } from 'core/model';
import { findNode } from 'utils/util';

interface PublishedModel {
  value: any;
  pending: any[];
  settled: boolean;
}

const publishedModels = new WeakMap<object, PublishedModel>();

export default function () {
  return {
    beforeUnmount() {
      publishedModels.delete(this);
    },
    methods: {
      bindEvent(this: any, name: string, params: Record<string, any>) {
        const dic = typeof this.getDicData === 'function' ? this.getDicData() : this.dic;
        const item = findNode(dic, this.props, this.text);
        params = Object.assign(params, { column: this.column, dic, item }, this.tableData);
        if (typeof this[name] === 'function') {
          if (name == 'change') {
            if (this.column.cell != true) {
              this[name](params);
            }
          } else {
            this[name](params);
          }
        }
        this.$emit(name, params);
      },
      initVal(this: any) {
        this.stringMode = typeof this.modelValue == 'string';
        const published = publishedModels.get(this);
        const acknowledged = published && (isModelEqual(published.value, this.modelValue) ||
          published.pending.some(value => isModelEqual(value, this.modelValue)));
        if (acknowledged && !isModelEqual(this.modelValue, this.formatModelValue(this.text))) {
          // An acknowledged model may arrive after a newer local deep edit.
          return false;
        }
        const value = initVal(this.modelValue, this);
        if (!isModelEqual(this.text, value)) {
          this.text = cloneModel(value);
        }
      },
      getLabelText(this: any, item: any) {
        if (this.validatenull(item)) return '';
        if (typeof this.typeformat === 'function') {
          return this.typeformat(item, this.labelKey, this.valueKey);
        }
        return item[this.labelKey];
      },
      handleFocus(this: any, event: Event) {
        this.bindEvent('focus', { value: this.modelValue, event });
      },
      handleBlur(this: any, event: Event) {
        this.bindEvent('blur', { value: this.modelValue, event });
      },
      handleClick(this: any, event: Event) {
        this.bindEvent('click', { value: this.modelValue, event });
      },
      emitModelValue(this: any, value: any) {
        const previous = publishedModels.get(this);
        if (previous && isModelEqual(previous.value, value)) return;
        const pending = previous?.pending || [];
        if (previous && !previous.settled) pending.push(previous.value);
        const published = { value: cloneModel(value), pending, settled: false };
        // Record before emitting so reentrant or manually forwarded updates converge.
        publishedModels.set(this, published);
        this.$emit('update:modelValue', cloneModel(value));
        this.$nextTick(() => {
          if (publishedModels.get(this) !== published) return;
          published.pending.length = 0;
          published.settled = true;
        });
        return published;
      },
      formatModelValue(this: any, value: any) {
        let result = value;
        if (this.isJson) {
          result = JSON.stringify(value);
        } else {
          const flag = this.isString || this.isNumber || this.stringMode || this.listType === 'picture-img';
          if (flag && Array.isArray(value)) {
            result = value.join(this.separator);
          }
        }
        return result;
      },
      handleChange(this: any, value: any) {
        const result = this.formatModelValue(value);
        const published = this.emitModelValue(result);
        if (!published) return;
        // Form publishes bindings, cascades and its outer model during the Vue flush.
        // Notify business listeners afterwards, without reporting superseded edits.
        return this.$nextTick(() => {
          if (publishedModels.get(this) !== published) return;
          this.bindEvent('change', { value: cloneModel(published.value) });
        });
      },
    },
  };
}
