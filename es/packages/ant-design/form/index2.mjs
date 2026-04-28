/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { detail } from '../../../src/core/detail.mjs';
import create from '../../../src/core/create.mjs';
import init from '../../core/common/init.mjs';
import '../../core/components/form/index.mjs';
import './menu.mjs';
import { DIC_PROPS } from '../../../src/global/variable.mjs';
import { getPlaceholder, getComponent, formInitVal, calcCount, calcCascader } from '../../../src/core/dataformat.mjs';
import { sendDic } from '../../../src/core/dic.mjs';
import { filterParams, clearVal, blankVal, setAsVal, getAsVal, getColumn } from '../../../src/utils/util.mjs';
import mock from '../../../src/utils/mock.mjs';
import config from './config.mjs';
import script$1 from './menu2.mjs';
import script$2 from '../../core/components/form/index2.mjs';

var script = create({
  name: "ant-form",
  mixins: [init("form")],
  emits: [
    "update:modelValue",
    "update:status",
    "reset-change",
    "mock-change",
    "tab-click",
    "submit",
    "error",
  ],
  components: {
    formTemp: script$2,
    antFormMenu: script$1,
  },
  data() {
    return {
      config,
      activeName: "",
      allDisabled: false,
      tableOption: {},
      form: {},
      formCreate: false,
      formList: [],
      formBind: {},
      count: {},
      timers: [],
    };
  },
  provide() {
    return {
      formSafe: this,
    };
  },
  watch: {
    modelValue: {
      handler(val) {
        if (this.formCreate) {
          this.setForm();
        }
      },
      deep: true,
    },
    form: {
      handler(val) {
        if (this.formCreate) {
          this.setLabel();
          this.setVal();
        }
      },
      deep: true,
    },
    tabsActive: {
      handler(val) {
        this.activeName = this.tabsActive;
      },
      immediate: true,
    },
    DIC: {
      handler() {
        this.setLabel();
      },
      deep: true,
      immediate: true,
    },
    allDisabled: {
      handler(val) {
        this.$emit("update:status", val);
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    size() {
      return this.tableOption.size || this.$TVUE.formSize || this.$TVUE.size;
    },
    columnSlot() {
      return Object.keys(this.$slots).filter(
        (item) => !this.propOption.map((ele) => ele.prop).includes(item)
      );
    },
    labelSuffix() {
      return this.tableOption.labelSuffix || ":";
    },
    isMenu() {
      return this.columnOption.length != 1;
    },
    isDetail() {
      return this.detail === true;
    },
    isAdd() {
      return ["parentAdd", "add"].includes(this.boxType);
    },
    isTabs() {
      return this.tableOption.tabs === true;
    },
    isEdit() {
      return this.boxType === "edit";
    },
    isView() {
      return this.boxType === "view";
    },
    detail() {
      return this.tableOption.detail;
    },
    disabled() {
      return this.tableOption.disabled;
    },
    readonly() {
      return this.tableOption.readonly;
    },
    tabsType() {
      return this.tableOption.tabsType;
    },
    columnLen() {
      return this.columnOption.length;
    },
    dynamicOption() {
      let list = [];
      this.propOption.forEach((ele) => {
        if (ele.type == "dynamic" && this.vaildDisplay(ele)) {
          list.push(ele);
        }
      });
      return list;
    },
    propOption() {
      let list = [];
      this.columnOption.forEach((option) => {
        if (option.display !== false) {
          option.column.forEach((column) => list.push(column));
        }
      });
      return list;
    },
    columnOption() {
      const processColumnDetails = (list) => {
        list.forEach((groupItem, groupIndex) => {
          groupItem.column = getColumn(groupItem.column) || [];

          groupItem.column.forEach((column, columnIndex) => {
            if (column.display !== false && !this.isMobile) {
              column = calcCount(
                column,
                this.tableOption.span || this.config.span,
                columnIndex === 0
              );
            }
          });

          groupItem.column = calcCascader(groupItem.column);

          groupItem.column = groupItem.column.sort(
            (a, b) => (b.order || 0) - (a.order || 0)
          );
        });
      };

      const {tableOption} = this;

      const mainColumn = getColumn(tableOption.column);

      const processedGroups = (tableOption.group || []).map((groupItem) => ({
        ...groupItem,
        column: getColumn(groupItem.column),
      }));

      const footerColumns = tableOption.footer || [];

      const mainGroup =
        [
          {
            header: false,
            column: mainColumn,
          },
        ];

      const footerGroup =
        footerColumns.length > 0
          ? [
            {
              header: false,
              column: footerColumns,
            },
          ]
          : [];

      processColumnDetails(mainGroup);
      processColumnDetails(processedGroups);
      if (footerColumns.length > 0) {
        processColumnDetails(footerGroup);
      }
      return [...mainGroup, ...processedGroups, ...footerGroup];
    },
    menuPosition: function () {
      if (this.tableOption.menuPosition) {
        return this.tableOption.menuPosition;
      } else {
        return "center";
      }
    },
    boxType: function () {
      return this.tableOption.boxType;
    },
    isPrint() {
      return this.validData(this.tableOption.printBtn, false);
    },
    tabsActive() {
      return this.validData(this.tableOption.tabsActive + "", "1");
    },
    isMock() {
      return this.validData(this.tableOption.mockBtn, false);
    },
    isVerifyAll() {
      return this.validData(this.tableOption.tabsVerifyAll, true);
    },
    menuSpan() {
      return this.tableOption.menuSpan || 24;
    },
    labelCol() {
      const width = this.tableOption.labelWidth || this.config.labelWidth;
      if (typeof width === 'number') {
        return {style: {width: width + 'px'}};
      }
      return width;
    },
    wrapperCol() {
      const wrapperCol = this.tableOption.wrapperCol || this.config.wrapperCol;
      if (wrapperCol) {
        return wrapperCol
      }
      return {};
    },
    antdLocale() {
      return this.$TVUE?.locale || null;
    },
  },
  props: {
    uploadSized: Function,
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    status: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },
  mounted() {
    this.initFun();
    const timerId = setTimeout(() => {
      this.dataFormat();
    });
    this.timers.push(timerId);
  },
  methods: {
    getComponent,
    getPlaceholder,
    initFun() {
      this.initFormMethods([
        "validateField",
        "scrollToField",
        "clearValidate",
        "resetFields",
        "getField",
        "fields",
      ]);
    },
    initFormMethods(methods) {
      methods.forEach((ele) => {
        this[ele] = (...args) => {
          const formRef = this.$refs.form;
          if (formRef && typeof formRef[ele] === "function") {
            return formRef[ele](...args);
          }
        };
      });
    },
    getDisabled(column) {
      return (
        this.vaildDetail(column) ||
        this.isDetail ||
        this.vaildDisabled(column) ||
        this.allDisabled
      );
    },
    isGroupShow(item, index, verifyAll) {
      if (verifyAll) return true;
      else if (this.isTabs) {
        return index == this.activeName || index == 0;
      } else {
        return true;
      }
    },
    getColumnLabelCol(column, item) {
      const width = this.getItemParams(column, item, 'labelWidth', true);
      if (width) {
        return {style: {width}};
      }
      return this.labelCol;
    },
    getColumnWrapperCol(column, item) {
      // 优先使用 column 或 item 中配置的 wrapperCol
      const columnWrapperCol = column.wrapperCol || item.wrapperCol;
      if (columnWrapperCol) {
        return columnWrapperCol;
      }

      // 如果没有配置 wrapperCol，返回空对象，不应用任何默认样式
      return {};
    },
    dataFormat() {
      let formDefault = formInitVal(this.propOption);
      let formValue = this.modelValue;
      let form = {};
      Object.entries(Object.assign(formDefault, formValue)).forEach((ele) => {
        let key = ele[0],
          value = ele[1];
        if (this.validatenull(formValue[key])) {
          form[key] = value;
        } else {
          form[key] = formValue[key];
        }
      });
      this.form = form;
      this.setLabel();
      this.setControl();
      this.setVal();
      const timerId = setTimeout(() => {
        this.formCreate = true;
        this.clearValidate();
      });
      this.timers.push(timerId);
    },
    setControl() {
      this.propOption.forEach((column) => {
        let prop = column.prop;
        let bind = column.bind;
        let control = column.control;
        if (this.formBind[prop]) {
          this.formBind[prop].forEach((unWatch) => {
            if (typeof unWatch === "function") {
              unWatch();
            }
          });
          delete this.formBind[prop];
        }

        let bindList = [];
        if (bind) {
          let formProp = this.$watch("form." + prop, (n, o) => {
            setAsVal(this.form, bind, n);
          });
          let formDeep = this.$watch("form." + bind, (n, o) => {
            this.form[prop] = n;
          });
          bindList.push(formProp);
          bindList.push(formDeep);
          this.form[prop] = getAsVal(this.form, bind);
        }
        if (control) {
          const callback = () => {
            const controlResolve = (list) => {
              Object.keys(list).forEach((item) => {
                let ele = Object.assign(
                  this.objectOption[item] || {},
                  list[item]
                );
                this.objectOption[item] = ele;
                if (list[item].dicData) this.DIC[item] = list[item].dicData;
              });
            };
            let result = this.form["$" + column.prop] || this.form[column.prop];
            let controlList =
              control(this.form[column.prop], this.form, result, column) || {};
            if (controlList instanceof Promise) {
              controlList.then((res) => {
                controlResolve(res);
              });
            } else {
              controlResolve(controlList);
            }
          };
          let formControl = this.$watch("form." + prop, (n, o) => {
            callback();
          });
          bindList.push(formControl);
          callback();
        }
        if (bindList.length > 0) {
          this.formBind[prop] = bindList;
        }
      });
    },
    setForm() {
      Object.keys(this.modelValue).forEach((ele) => {
        this.form[ele] = this.modelValue[ele];
      });
    },
    setVal() {
      this.$emit("update:modelValue", this.form);
      this.$emit("change", this.form);
    },
    setLabel() {
      if (this.tableOption.filterNull === true) {
        this.form = filterParams(this.form, [""], false);
      }
      if (this.tableOption.filterDic == true) {
        this.form = filterParams(this.form, ["$"], false);
      } else {
        this.propOption.forEach((column) => {
          let result;
          let DIC = this.DIC[column.prop];
          if (this.validatenull(DIC)) return;
          result = detail(this.form, column, this.tableOption, DIC);
          if (result) {
            this.form[`$${column.prop}`] = result;
          } else {
            delete this.form[`$${column.prop}`];
          }
        });
      }
    },
    handleGroupClick(activeNames) {
      this.$emit("tab-click", activeNames);
    },
    handleTabClick(tab, event) {
      this.$emit("tab-click", tab, event);
    },
    getItemParams(column, item, type, isPx) {
      let result;
      if (!this.validatenull(column[type])) {
        result = column[type];
      } else if (!this.validatenull(item[type])) {
        result = item[type];
      } else {
        result = this.tableOption[type];
      }
      result = this.validData(result, this.config[type]);
      return isPx ? this.setPx(result) : result;
    },
    validTip(column) {
      return !column.tip || column.type === "upload";
    },
    getPropRef(prop) {
      return this.$refs[prop][0];
    },
    handleChange(list, column) {
      this.$nextTick(() => {
        const cascader = column.cascader;
        const str = cascader.join(",");
        cascader.forEach((item) => {
          const columnNextProp = item;
          const value = this.form[column.prop];
          const columnNext = this.findObject(list, columnNextProp);
          if (this.validatenull(columnNext)) return;
          if (this.formList.includes(str)) {
            cascader.forEach((ele) => {
              this.form[ele] = blankVal(this.form[ele]);
              this.DIC[ele] = [];
            });
          }
          if (
            this.validatenull(cascader) ||
            this.validatenull(value) ||
            this.validatenull(columnNext)
          ) {
            return;
          }
          sendDic(
            {
              column: columnNext,
              value: value,
              form: this.form,
            },
            this
          ).then((res) => {
            if (!this.formList.includes(str)) this.formList.push(str);
            const dic = res || [];
            this.DIC[columnNextProp] = dic;
            if (
              !this.validatenull(dic) &&
              !this.validatenull(dic) &&
              !this.validatenull(columnNext.cascaderIndex) &&
              this.validatenull(this.form[columnNextProp])
            ) {
              this.form[columnNextProp] =
                dic[columnNext.cascaderIndex][
                (columnNext.props || {}).value || DIC_PROPS.value
                  ];
            }
          });
        });
      });
    },
    handlePrint() {
      this.$Print(this.$el);
    },
    propChange(option, column) {
      let key = column.prop;
      if (column.type === "ant-cascader" || column.type === "ant-upload") {
        this.$nextTick(() => {
          const validateResult = this.validateField(key);
          if (validateResult && typeof validateResult.catch === 'function') {
            validateResult.catch((error) => {
            });
          }
        });
      }
      if (!this.count[key]) {
        if (column.cascader) this.handleChange(option, column);
      }
      this.count[key] = true;
      this.$nextTick(() => (this.count[key] = false));
    },
    handleMock() {
      if (!this.isMock) return;
      this.columnOption.forEach((column) => {
        const form = mock(column.column, this.DIC, this.form, this.isMock);
        if (!this.validatenull(form)) {
          Object.keys(form).forEach((ele) => {
            this.form[ele] = form[ele];
          });
        }
      });
      this.$nextTick(() => {
        this.clearValidate();
        this.$emit("mock-change", this.form);
      });
    },
    vaildDetail(column) {
      let key;
      if (this.detail) return false;
      if (!this.validatenull(column.detail)) {
        key = "detail";
      } else if (this.isAdd) {
        key = "addDetail";
      } else if (this.isEdit) {
        key = "editDetail";
      } else if (this.isView) {
        return false;
      }
      return this.validData(column[key], false);
    },
    vaildDisabled(column) {
      let key;
      if (this.disabled) return true;
      if (!this.validatenull(column.disabled)) {
        key = "disabled";
      } else if (this.isAdd) {
        key = "addDisabled";
      } else if (this.isEdit) {
        key = "editDisabled";
      } else if (this.isView) {
        return true;
      }
      return this.validData(column[key], false);
    },
    vaildDisplay(column) {
      let key;
      if (!this.validatenull(column.display)) {
        key = "display";
      } else if (this.isAdd) {
        key = "addDisplay";
      } else if (this.isEdit) {
        key = "editDisplay";
      } else if (this.isView) {
        key = "viewDisplay";
      } else {
        return true;
      }
      return this.validData(column[key], true);
    },
    validateCellForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid, msg) => {
          resolve(msg);
        });
      });
    },
    validate(callback) {
      this.$refs.form.validate((valid, msg) => {
        let dynamicList = [];
        let dynamicName = [];
        let dynamicError = {};
        this.dynamicOption.forEach((ele) => {
          let isForm = ele.children.type === "form";
          dynamicName.push(ele.prop);
          if (isForm) {
            if (
              !this.validatenull(this.$refs[ele.prop][0].$refs.temp.$refs.main)
            ) {
              this.$refs[ele.prop][0].$refs.temp.$refs.main.forEach((ele) => {
                dynamicList.push(ele.validateCellForm());
              });
            }
          } else {
            dynamicList.push(
              this.$refs[ele.prop][0].$refs.temp.$refs.main.validateCellForm()
            );
          }
        });
        Promise.all(dynamicList).then((res) => {
          res.forEach((error, index) => {
            if (!this.validatenull(error)) {
              dynamicError[dynamicName[index]] = error;
            }
          });
          let result = Object.assign(dynamicError, msg);
          if (this.validatenull(result)) {
            this.show();
            callback && callback(true, this.hide, result);
          } else {
            callback && callback(false, this.hide, result);
          }
        });
      });
    },
    resetForm(reset = true) {
      if (reset) {
        let propList = this.propOption.map((ele) => ele.prop);
        this.form = clearVal(
          this.form,
          propList,
          (this.tableOption.filterParams || []).concat([this.rowKey])
        );
      }
      this.$nextTick(() => {
        this.clearValidate();
        this.$emit("reset-change");
      });
    },
    show() {
      this.allDisabled = true;
    },
    hide() {
      this.allDisabled = false;
    },
    submit() {
      this.validate((valid, hide, msg) => {
        if (valid) {
          this.$emit("submit", filterParams(this.form, ["$"]), this.hide);
        } else {
          this.$emit("error", msg);
        }
      });
    },
    shouldShowDivider(column) {
      return (
        this.vaildDisplay(column) &&
        column.row &&
        column.span !== 24 &&
        column.count
      );
    },
  },
  beforeUnmount() {
    this.timers.forEach((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
    });
    this.timers = [];

    Object.keys(this.formBind).forEach((ele) => {
      this.formBind[ele].forEach((unWatch) => {
        if (typeof unWatch === "function") {
          unWatch();
        }
      });
    });

    this.formBind = {};
    this.formList = [];
    this.count = {};
    this.form = {};
  },

  unmounted() {
  },
});

export { script as default };
