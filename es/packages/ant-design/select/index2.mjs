/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import packages from '../../../src/core/packages.mjs';
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props2.mjs';
import event from '../../core/common/event2.mjs';
import { sendDic } from '../../../src/core/dic.mjs';
import { DIC_SPLIT } from '../../../src/global/variable.mjs';
import { resolveComponent, h } from 'vue';

var script = create({
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
      addInputValue: '',
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
    maxTagCount: {
      type: [Number, String],
      default: undefined,
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
    dropdownRender: Function,
    showTip: {
      type: Boolean,
      default: false,
    },
    tipText: {
      type: String,
      default: '💡 提示：可以输入关键词搜索选项',
    },
    showProgress: {
      type: Boolean,
      default: false,
    },
    progressColor: {
      type: String,
      default: 'rgba(0, 132, 253, 0.4)',
    },
    bottomText: {
      type: String,
      default: '提示：可使用搜索功能快速查找',
    },
    showBottomText: {
      type: Boolean,
      default: false,
    },
    allowAdd: {
      type: Boolean,
      default: false,
    },
    addPlaceholder: {
      type: String,
      default: '输入新选项名称',
    },
    addButtonText: {
      type: String,
      default: '添加',
    },
    onAddOption: Function,
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
    dropdownRenderConfig() {
      return this.dropdownRender && typeof this.dropdownRender === 'function';
    },
    hasStandardContent() {
      return this.showTip || this.showProgress || this.showBottomText || this.allowAdd;
    },
    selectedCount() {
      return Array.isArray(this.text) ? this.text.length : 0;
    },
    totalCount() {
      return this.netDic.length;
    },
    percent() {
      return this.totalCount > 0 ? Math.round((this.selectedCount / this.totalCount) * 100) : 0;
    },
    dropdownRenderComponent() {
      const customRender = this.dropdownRender;
      const self = this;

      return {
        name: 'DropdownRenderWrapper',
        props: ['menu', 'option', 'value', 'multiple', 'showTip', 'tipText', 'showProgress', 'progressColor', 'bottomText', 'showBottomText', 'allowAdd', 'addPlaceholder', 'addButtonText', 'onAddOption'],
        render() {
          try {
            const AProgress = resolveComponent('a-progress');
            const AInput = resolveComponent('a-input');
            const AButton = resolveComponent('a-button');
            const ADivider = resolveComponent('a-divider');

            const standardElements = [];

            if (self.showTip) {
              standardElements.push(
                h('div', {
                  style: {
                    padding: '3px 12px',
                    background: '#e6f7ff',
                    border: '1px solid #91d5ff',
                    borderRadius: '4px 4px 0 0',
                    fontSize: '12px',
                    color: '#1890ff'
                  }
                }, [
                  h('div', {
                    style: {
                      fontSize: '12px',
                      opacity: 0.9
                    }
                  }, self.tipText),
                ].filter(Boolean))
              );
            }

            if (self.showProgress) {
              standardElements.push(
                h('div', {
                  style: {
                    padding: '8px 12px',
                    background: '#fafafa',
                    borderBottom: '1px solid #e8e8e8'
                  }
                }, [
                  h('div', {
                    style: {
                      fontSize: '12px',
                      marginBottom: '6px',
                      color: '#666'
                    }
                  }, `已选 ${self.selectedCount}/${self.totalCount} 项 (${self.percent}%)`),
                  h(AProgress, {
                    percent: self.percent,
                    strokeColor: self.progressColor,
                    showInfo: false,
                    size: 'small'
                  })
                ])
              );
            }

            // 标准化新增选项功能
            if (self.allowAdd) {
              standardElements.push(
                h(ADivider, { style: { margin: '4px 0' } }),
                h('div', {
                  style: {
                    padding: '8px 12px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center'
                  }
                }, [
                  h(AInput, {
                    placeholder: self.addPlaceholder,
                    size: 'small',
                    style: { flex: 1 },
                    value: self.addInputValue,
                    onChange: (e) => {
                      self.addInputValue = e.target.value;
                    },
                    onPressEnter: () => {
                      self.handleAddOption(self.addInputValue);
                      self.addInputValue = '';
                    }
                  }),
                  h(AButton, {
                    type: 'primary',
                    size: 'small',
                    onClick: () => {
                      if (self.addInputValue) {
                        self.handleAddOption(self.addInputValue);
                        self.addInputValue = '';
                      }
                    }
                  }, {
                    default: () => self.addButtonText
                  })
                ])
              );
            }

            if (self.showBottomText) {
              standardElements.push(
                h('div', {
                  style: {
                    padding: '8px 12px',
                    textAlign: 'center',
                    color: '#999',
                    fontSize: '12px',
                    borderTop: '1px solid #e8e8e8'
                  }
                }, self.bottomText)
              );
            }

            if (typeof customRender !== 'function') {
              if (standardElements.length === 0) {
                return this.menu;
              }
              return h('div', [...standardElements, this.menu]);
            }

            const customResult = customRender.call(self, this.menu, {
              option: this.option,
              value: this.value,
              multiple: this.multiple,
            });

            if (!customResult) {
              if (standardElements.length === 0) {
                return this.menu;
              }
              return h('div', [...standardElements, this.menu]);
            }

            // 将标准化内容（进度条、新增功能）放在自定义内容之前
            if (standardElements.length > 0) {
              return h('div', [...standardElements, customResult]);
            }

            return customResult;
          } catch (error) {
            console.error('dropdownRender error:', error);
            return this.menu;
          }
        }
      };
    },
    standardDropdownRenderComponent() {
      const self = this;

      return {
        name: 'StandardDropdownRender',
        props: ['menu'],
        render() {
          const AProgress = resolveComponent('a-progress');
          const ADivider = resolveComponent('a-divider');
          const AInput = resolveComponent('a-input');
          const AButton = resolveComponent('a-button');

          const elements = [];

          // 完整标准化渲染：提示 + 进度条 + 菜单 + 底部文本
          if (self.showTip) {
            elements.push(
              h('div', {
                style: {
                  padding: '3px 12px',
                  background: '#e6f7ff',
                  border: '1px solid #91d5ff',
                  borderRadius: '4px 4px 0 0',
                  fontSize: '12px',
                  color: '#1890ff'
                }
              }, [
                h('div', {
                  style: {
                    fontSize: '12px',
                    opacity: 0.9
                  }
                }, self.tipText)
              ].filter(Boolean))
            );
          }

          if (self.showProgress) {
            elements.push(
              h('div', {
                style: {
                  padding: '8px 12px',
                  background: '#fafafa',
                  borderBottom: '1px solid #e8e8e8'
                }
              }, [
                h('div', {
                  style: {
                    fontSize: '12px',
                    marginBottom: '6px',
                    color: '#666'
                  }
                }, `已选 ${self.selectedCount}/${self.totalCount} 项 (${self.percent}%)`),
                h(AProgress, {
                  percent: self.percent,
                  strokeColor: self.progressColor,
                  showInfo: false,
                  size: 'small'
                })
              ])
            );
          }

          // 安全地添加 menu 内容（直接作为子元素，不使用 slot）
          if (this.menu) {
            elements.push(this.menu);
          }

          // 标准化新增选项功能
          if (self.allowAdd) {
            elements.push(
              h(ADivider, { style: { margin: '4px 0' } }),
              h('div', {
                style: {
                  padding: '8px 12px',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center'
                }
              }, [
                h(AInput, {
                  placeholder: self.addPlaceholder,
                  size: 'small',
                  style: { flex: 1 },
                  value: self.addInputValue,
                  onChange: (e) => {
                    self.addInputValue = e.target.value;
                  },
                  onPressEnter: () => {
                    self.handleAddOption(self.addInputValue);
                    self.addInputValue = '';
                  }
                }),
                h(AButton, {
                  type: 'primary',
                  size: 'small',
                  onClick: () => {
                    if (self.addInputValue) {
                      self.handleAddOption(self.addInputValue);
                      self.addInputValue = '';
                    }
                  }
                }, {
                  default: () => self.addButtonText
                })
              ])
            );
          }

          if (self.showBottomText) {
            elements.push(
              h(ADivider, { style: { margin: '4px 0' } }),
              h('div', {
                style: {
                  padding: '8px 12px',
                  textAlign: 'center',
                  color: '#999',
                  fontSize: '12px'
                }
              }, self.bottomText)
            );
          }

          return h('div', elements);
        }
      };
    },
  },

  mounted() {
    if (this.drag) {
      this.setSort();
    }
  },
  methods: {
    handleAddOption(value, event, inputEl) {
      const val = value ? value.trim() : '';

      if (!val) {
        this.showMessage('warning', '请输入选项名称');
        return;
      }

      // 检查是否已存在
      const exists = this.netDic.some(item => item[this.labelKey] === val);
      if (exists) {
        this.showMessage('warning', '该选项已存在');
        return;
      }

      // 如果有自定义添加回调，优先使用
      if (this.onAddOption && typeof this.onAddOption === 'function') {
        this.onAddOption(val, this.netDic);
        return;
      }

      // 默认行为：生成新值并添加到字典
      const maxValue = this.netDic.length > 0
        ? Math.max(...this.netDic.map(item => item[this.valueKey]))
        : -1;
      const newValue = maxValue + 1;

      const newOption = {
        [this.labelKey]: val,
        [this.valueKey]: newValue
      };

      // 添加到字典数据
      this.netDic.push(newOption);

      // 自动选中新添加的选项
      const currentValue = Array.isArray(this.text) ? [...this.text] : [];
      currentValue.push(newValue);
      this.text = currentValue;

      // 触发更新
      this.handleChange(currentValue);

      this.showMessage('success', `已添加: ${val}`);
    },
    showMessage(type, message) {
      // 尝试多种消息提示方式
      if (window.message && window.message[type]) {
        window.message[type](message);
      } else if (this.$message && this.$message[type]) {
        this.$message[type](message);
      } else if (window.AntdMessage && window.AntdMessage[type]) {
        window.AntdMessage[type](message);
      } else {
        console.log(`[${type}] ${message}`);
      }
    },
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
    handleFilterOption(input, option) {
      if (!input || !option) return true;

      // 获取选项数据
      const optionData = option.componentOptions?.propsData || option.props || {};

      // 从 netDic 中找到对应的项
      const value = optionData.value;
      const item = this.netDic.find(d => d[this.valueKey] === value);

      if (!item) return false;

      // 使用 labelKey 对应的字段进行过滤
      const label = item[this.labelKey];
      if (!label) return false;

      return String(label).toLowerCase().includes(String(input).toLowerCase());
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

export { script as default };
