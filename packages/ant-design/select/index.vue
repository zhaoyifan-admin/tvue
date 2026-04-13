<template>
  <a-select
    ref="main"
    :class="b()"
    v-model:value="text"
    :size="size"
    :loading="loading"
    :multiple="multiple"
    :mode="tags ? 'tags' : undefined"
    :show-search="remote ? true : filterable"
    :allow-clear="clearableVal"
    :placeholder="placeholder"
    :disabled="disabled"
    :max-tag-count="tags || collapseTags ? maxCollapseTags || 'responsive' : undefined"
    :max-tag-placeholder="collapseTagsTooltip ? getCollapsedTooltip : undefined"
    :option-filter-prop="filterable ? labelKey : undefined"
    :not-found-content="noDataText"
    :dropdown-match-select-width="false"
    :dropdown-class-name="popperClass"
    :get-popup-container="popperAppendToBody ? undefined : triggerNode => triggerNode.parentNode"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
    @remove="handleremoveTag"
    @search="remote ? handleRemoteMethod : undefined"
    :default-active-first-option="defaultFirstOption"
  >
    <!-- 虚拟滚动模式 -->
    <template v-if="virtualize">
      <a-select-option
        v-for="(item, index) in netDic"
        :key="item[valueKey]"
        :value="item[valueKey]"
        :disabled="item[disabledKey]"
      >
        <slot
          :label="labelKey"
          :value="valueKey"
          :item="item"
          v-if="$slots.default"
        >
        </slot>
        <template v-else>
          <span>{{ getLabelText(item) }}</span>
          <span v-if="item[descKey]" :class="b('desc')">{{
              item[descKey]
            }}</span>
        </template>
      </a-select-option>
    </template>

    <!-- 分组模式 -->
    <template v-else-if="isGroup">
      <a-select-opt-group
        v-for="(item, index) in netDic"
        :key="index"
        :label="getLabelText(item)"
      >
        <a-select-option
          v-for="(citem, cindex) in item[groupsKey]"
          :key="citem[valueKey]"
          :value="citem[valueKey]"
          :disabled="citem[disabledKey]"
        >
          <slot
            :label="labelKey"
            :value="valueKey"
            :item="citem"
            v-if="$slots.default"
          >
          </slot>
          <template v-else>
            <span>{{ getLabelText(citem) }}</span>
            <span v-if="citem[descKey]" :class="b('desc')">{{
                citem[descKey]
              }}</span>
          </template>
        </a-select-option>
      </a-select-opt-group>
    </template>

    <!-- 普通模式（带全选） -->
    <template v-else>
      <div :class="b('check')" v-if="all && multiple" style="padding: 8px 12px;">
        <a-checkbox
          v-model:checked="checked"
          :disabled="disabled"
          :indeterminate="indeterminate"
          @change="checkChange"
          style="width: 100%;"
        >全选</a-checkbox>
      </div>

      <a-select-option
        v-for="(item, index) in netDic"
        :key="item[valueKey]"
        :value="item[valueKey]"
        :disabled="item[disabledKey]"
      >
        <slot
          :label="labelKey"
          :value="valueKey"
          :item="item"
          v-if="$slots.default"
        >
        </slot>
        <template v-else>
          <span>{{ getLabelText(item) }}</span>
          <span v-if="item[descKey]" :class="b('desc')">{{
              item[descKey]
            }}</span>
        </template>
      </a-select-option>
    </template>

    <!-- 加载中状态 -->
    <template #notFoundContent v-if="loading">
      <a-spin size="small" />
      <span style="margin-left: 8px;">{{ loadingText || '加载中...' }}</span>
    </template>
  </a-select>
</template>

<script>
import packages from "core/packages";
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
import { sendDic } from "core/dic";
import { DIC_SPLIT } from "global/variable";

export default create({
  name: "ant-select",
  mixins: [props(), event()],
  emits: ['update:modelValue', 'click', 'focus', 'blur', 'change', 'remove-tag'],
  data() {
    return {
      checked: false,
      indeterminate: false,
      created: false,
      netDic: [],
      loading: false,
    };
  },
  props: {
    virtualize: Boolean,
    valueOnClear: {
      type: [String, Number, Boolean, Function],
      default: undefined,
    },
    loadingText: {
      type: String,
    },
    noMatchText: {
      type: String,
    },
    noDataText: {
      type: String,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Boolean,
      default: false,
    },
    removeTag: Function,
    collapseTags: Boolean,
    collapseTagsTooltip: Boolean,
    maxCollapseTags: Number,
    limit: {
      type: Number,
      default: 0,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    defaultFirstOption: {
      type: Boolean,
      default: false,
    },
    all: {
      type: Boolean,
      default: false,
    },
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    dic: {
      handler(val) {
        this.netDic = val;
      },
      immediate: true,
    },
    modelValue: {
      handler(val) {
        this.initText();
      },
      immediate: true,
    },
  },
  computed: {
    classNameKey() {
      return this.props.className || "className";
    },
    isGroup() {
      return this.netDic.length > 0 && this.netDic[0][this.groupsKey];
    },
  },
  mounted() {
    if (this.drag) {
      this.setSort();
    }
  },
  methods: {
    initText() {
      // 处理空值，将空字符串转换为 undefined
      let val = this.modelValue;
      if (val === '' || val === null) {
        val = undefined;
      }

      // 处理多选情况
      if (this.multiple && !Array.isArray(val)) {
        if (this.validatenull(val)) {
          val = [];
        } else if (typeof val === 'string') {
          val = val.split(this.separator || ',');
        }
      }

      this.text = val;
    },
    getLabelText(item) {
      if (!item) return '';
      return item[this.labelKey] || '';
    },
    handleChange(value) {
      this.text = value;

      // 处理多选全选状态
      if (this.multiple) {
        const values = Array.isArray(value) ? value : [];
        if (values.length == 0) {
          this.checked = false;
          this.indeterminate = false;
        } else if (values.length == this.netDic.filter(ele => !ele[this.disabledKey]).length) {
          this.checked = true;
          this.indeterminate = false;
        } else {
          this.indeterminate = true;
        }
      }

      // 触发 update:modelValue 事件以更新父组件数据
      let result = value;
      if (this.isJson) {
        result = JSON.stringify(value);
      } else {
        let flag = this.isString || this.isNumber || this.stringMode || this.listType === "picture-img";
        if (flag && Array.isArray(value)) {
          result = value.join(this.separator);
        }
      }
      this.$emit('update:modelValue', result);
      this.bindEvent('change', { value: result });
    },
    handleModelValue(val) {
      if (!this.validatenull(this.text)) {
        if (this.remote && !this.created) {
          this.created = true;
          this.handleRemoteMethod(
            this.multiple ? this.text.join(DIC_SPLIT) : this.text
          );
        }
      }
      if (this.multiple) {
        const values = Array.isArray(this.text) ? this.text : [];
        if (values.length == 0) {
          this.checked = false;
          this.indeterminate = false;
        } else if (values.length == this.netDic.filter(ele => !ele[this.disabledKey]).length) {
          this.checked = true;
          this.indeterminate = false;
        } else {
          this.indeterminate = true;
        }
      }
    },
    setSort() {
      if (!window.Sortable) {
        packages.logs("Sortable");
        return;
      }
      const el = this.$refs.main.$el.querySelector(
        ".ant-select-selection-overflow"
      );
      if (el) {
        this.sortable = window.Sortable.create(el, {
          animation: 100,
          onEnd: (evt) => {
            const targetRow = this.modelValue.splice(evt.oldIndex, 1)[0];
            this.modelValue.splice(evt.newIndex, 0, targetRow);
          },
        });
      }
    },
    handleRemoteMethod(query) {
      this.loading = true;
      sendDic(
        {
          column: this.column,
          value: query,
        },
        this
      ).then((res) => {
        this.loading = false;
        this.netDic = res;
      });
    },
    checkChange(e) {
      const val = e.target.checked;
      this.text = [];
      this.checked = val;
      this.indeterminate = false;
      if (val) {
        this.text = this.netDic
          .filter((ele) => !ele[this.disabledKey])
          .map((ele) => ele[this.valueKey]);
      }
    },
    handleremoveTag(tagValue) {
      if (this.removeTag && typeof this.removeTag === 'function') {
        this.removeTag(tagValue);
      }
    },
    getCollapsedTooltip(omittedValues) {
      return `+ ${omittedValues.length} ...`;
    },
  },
});
</script>
