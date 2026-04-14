<template>
  <a-cascader
    ref="cascader"
    :class="b()"
    v-model:value="text"
    :options="dicOptions"
    :placeholder="placeholder"
    :size="size"
    :disabled="disabled"
    :allow-clear="clearableVal"
    :show-search="filterable ? { filter } : false"
    :multiple="multiple"
    :max-tag-count="tags || collapseTags ? maxCollapseTags || 'responsive' : undefined"
    :max-tag-placeholder="collapseTagsTooltip ? getCollapsedTooltip : undefined"
    :dropdown-class-name="popperClass"
    :field-names="fieldNames"
    :change-on-select="checkStrictly"
    :load-data="lazyLoadData"
    @change="handleValueChange"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <template #displayRender="{ labels, selectedOptions }">
      <slot v-if="$slots.default" :data="selectedOptions" :labels="labels"></slot>
      <span v-else>{{ labels.join(separator || '/') }}</span>
    </template>
  </a-cascader>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";

export default create({
  name: "ant-cascader",
  mixins: [props(), event()],
  emits: ['update:modelValue', 'click', 'focus', 'blur', 'change'],
  props: {
    clearValidate: Function,
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    emitPath: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: Boolean,
      default: false,
    },
    collapseTags: Boolean,
    collapseTagsTooltip: Boolean,
    maxCollapseTags: Number,
    expandTrigger: {
      type: String,
      default: "hover",
    },
    showAllLevels: {
      type: Boolean,
      default: true,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    lazyLoad: Function,
    filterable: {
      type: Boolean,
      default: false,
    },
    separator: {
      type: String,
      default: "/",
    },
  },
  data() {
    return {
      dicOptions: [],
      isInitializing: false,
    };
  },
  computed: {
    fieldNames() {
      return {
        label: this.labelKey,
        value: this.valueKey,
        children: this.childrenKey,
        disabled: this.disabledKey,
      };
    },
  },
  watch: {
    modelValue: {
      handler(val) {
        if (this.lazy && this.lazyLoad && val && !this.isInitializing) {
          this.loadDefaultValues(val);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.lazy && this.lazyLoad) {
      this.loadFirstLevel();
    }
  },
  methods: {
    loadFirstLevel() {
      const node = {
        level: 0,
        data: {},
      };

      this.lazyLoad(node, (list) => {
        this.dicOptions = list.map(item => ({
          ...item,
          isLeaf: item.leaf === true,
        }));
      });
    },
    async loadDefaultValues(value) {
      if (!value || !Array.isArray(value) || value.length === 0) return;

      this.isInitializing = true;

      try {
        await this.loadLevelByLevel(value, 0);
      } catch (error) {
        console.error('Failed to load default values:', error);
      } finally {
        this.isInitializing = false;
      }
    },
    async loadLevelByLevel(values, level) {
      if (level >= values.length) return;

      const currentValue = values[level];

      if (level === 0) {
        if (this.dicOptions.length === 0) {
          await new Promise((resolve) => {
            const node = { level: 0, data: {} };
            this.lazyLoad(node, (list) => {
              this.dicOptions = list.map(item => ({
                ...item,
                isLeaf: item.leaf === true,
              }));
              resolve();
            });
          });
        }
        await this.loadNextLevel(values, level, currentValue, this.dicOptions);
      } else {
        const parentNode = this.findNodeByValue(this.dicOptions, values[level - 1]);
        if (parentNode && !parentNode.children) {
          await new Promise((resolve) => {
            const node = { level: level, data: parentNode };
            this.lazyLoad(node, (list) => {
              const processedList = list.map(item => ({
                ...item,
                isLeaf: item.leaf === true,
              }));
              parentNode.children = processedList;
              this.dicOptions = [...this.dicOptions];
              resolve();
            });
          });
        }

        if (parentNode && parentNode.children) {
          await this.loadNextLevel(values, level, currentValue, parentNode.children);
        }
      }
    },
    async loadNextLevel(values, level, currentValue, options) {
      const node = options.find(item => item[this.valueKey] == currentValue);

      if (node && level < values.length - 1 && !node.isLeaf) {
        if (!node.children) {
          await new Promise((resolve) => {
            const nextLevel = level + 1;
            const loadNode = { level: nextLevel, data: node };
            this.lazyLoad(loadNode, (list) => {
              const processedList = list.map(item => ({
                ...item,
                isLeaf: item.leaf === true,
              }));
              node.children = processedList;
              this.dicOptions = [...this.dicOptions];
              resolve();
            });
          });
        }

        const nextValue = values[level + 1];
        if (node.children) {
          await this.loadNextLevel(values, level + 1, nextValue, node.children);
        }
      }
    },
    findNodeByValue(options, value) {
      for (const option of options) {
        if (option[this.valueKey] == value) {
          return option;
        }
        if (option.children) {
          const found = this.findNodeByValue(option.children, value);
          if (found) return found;
        }
      }
      return null;
    },
    handleValueChange(value, selectedOptions) {
      setTimeout(() => {
        if (!this.validatenull(value) && this.rules && this.clearValidate) {
          this.clearValidate(this.prop);
        }
      });

      let result = value;
      if (!this.emitPath && Array.isArray(value)) {
        result = value[value.length - 1];
      }

      if (this.isJson) {
        result = JSON.stringify(result);
      } else {
        let flag = this.isString || this.isNumber || this.stringMode;
        if (flag && Array.isArray(result)) {
          result = result.join(this.separator || ',');
        }
      }

      this.$emit('update:modelValue', result);
      this.bindEvent('change', { value: result, selectedOptions });
    },
    filter(inputValue, path) {
      return path.some(option => option[this.labelKey].toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    },
    lazyLoadData(selectedOptions) {
      if (this.isInitializing) return;

      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      const level = selectedOptions.length;
      const node = {
        level: level,
        data: targetOption,
      };

      this.lazyLoad(node, (list) => {
        targetOption.loading = false;
        const processedList = list.map(item => ({
          ...item,
          isLeaf: item.leaf === true,
        }));
        targetOption.children = processedList;

        this.dicOptions = [...this.dicOptions];
      });
    },
    getCollapsedTooltip(omittedValues) {
      return `+ ${omittedValues.length} ...`;
    },
    getCheckedNodes(leafOnly = false) {
      return this.$refs.cascader.getCheckedNodes(leafOnly);
    },
  },
});
</script>
