/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props2.mjs';
import event from '../../core/common/event2.mjs';

var script = create({
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
    showCheckedStrategyValue() {
      return this.multiple ? 'SHOW_ALL' : undefined;
    },
  },
  watch: {
    dic: {
      handler(val) {
        if (!this.lazy && val && Array.isArray(val)) {
          this.dicOptions = val.map(item => ({
            ...item,
            isLeaf: item.leaf === true || (!item.children && !this.lazy),
          }));
        }
      },
      immediate: true,
      deep: true,
    },
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
      if (!this.lazyLoad) return;

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
        if (this.dicOptions.length === 0 && this.lazyLoad) {
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
        if (parentNode && !parentNode.children && this.lazyLoad) {
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

      if (node && level < values.length - 1 && !node.isLeaf && this.lazyLoad) {
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

      // 多选模式下，如果使用了 SHOW_ALL 策略，需要确保返回所有叶子节点的完整路径
      if (this.multiple && this.showCheckedStrategyValue === 'SHOW_ALL' && Array.isArray(value)) {
        result = this.getAllLeafPaths(value);
      } else if (!this.emitPath && Array.isArray(value)) {
        result = value[value.length - 1];
      }

      if (this.isJson) {
        result = JSON.stringify(result);
      } else {
        let flag = this.isString || this.isNumber || this.stringMode;
        if (flag && Array.isArray(result)) {
          if (!this.multiple) {
            result = result.join(this.separator || ',');
          }
        }
      }

      this.$emit('update:modelValue', result);
      this.bindEvent('change', { value: result, selectedOptions });
    },
    getAllLeafPaths(selectedPaths) {
      // 遍历所有选中的路径，找出所有叶子节点
      const allLeafPaths = [];

      selectedPaths.forEach(path => {
        const leafNodes = this.findLeafNodesByPath(path);
        allLeafPaths.push(...leafNodes);
      });

      return allLeafPaths.length > 0 ? allLeafPaths : selectedPaths;
    },
    findLeafNodesByPath(path) {
      // 根据路径找到对应的节点
      let currentNode = null;
      let options = this.dicOptions;

      for (let i = 0; i < path.length; i++) {
        const value = path[i];
        currentNode = options.find(opt => opt[this.valueKey] === value);

        if (!currentNode) {
          return [path]; // 找不到节点，返回原路径
        }

        if (currentNode.children && currentNode.children.length > 0) {
          options = currentNode.children;
        } else {
          // 这是叶子节点
          return [path];
        }
      }

      // 如果当前节点还有子节点，递归查找所有叶子节点
      if (currentNode && currentNode.children) {
        const allLeaves = [];
        this.collectAllLeafPaths(currentNode.children, path, allLeaves);
        return allLeaves;
      }

      return [path];
    },
    collectAllLeafPaths(children, parentPath, result) {
      children.forEach(child => {
        const currentPath = [...parentPath, child[this.valueKey]];

        if (child.children && child.children.length > 0) {
          // 还有子节点，继续递归
          this.collectAllLeafPaths(child.children, currentPath, result);
        } else {
          // 叶子节点，添加路径
          result.push(currentPath);
        }
      });
    },
    filter(inputValue, path) {
      return path.some(option => option[this.labelKey].toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    },
    lazyLoadData(selectedOptions) {
      if (this.isInitializing || !this.lazyLoad) return;

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

export { script as default };
