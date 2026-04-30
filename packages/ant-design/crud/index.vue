<template>
  <div :class="b({ card: !option.card })">
    <component
      :is="tableOption.titleSize || 'h2'"
      :style="tableOption.titleStyle"
      v-if="tableOption.title"
    >{{ tableOption.title }}</component
    >
    <!-- 搜索组件 -->
    <header-search ref="headerSearch">
      <template #search="scope">
        <slot name="search" v-bind="scope"></slot>
      </template>
      <template #search-menu="scope">
        <slot name="search-menu" v-bind="scope"></slot>
      </template>
      <template v-for="item in searchSlot" #[item]="scope">
        <slot v-bind="scope" :name="item"></slot>
      </template>
    </header-search>
    <a-card :bordered="!isCard" :class="b('body')">
      <slot name="header"></slot>
      <!-- 表格功能列 -->
      <header-menu ref="headerMenu" v-if="validData(tableOption.header, true)">
        <template #menu-left="scope">
          <slot name="menu-left" v-bind="scope"></slot>
        </template>
        <template #menu-right="scope">
          <slot name="menu-right" v-bind="scope"></slot>
        </template>
      </header-menu>
      <div
        class="tvue-crud__tip"
        v-if="validData(tableOption.tip, config.tip) && tableOption.selection"
      >
        <span class="tvue-crud__tip-name">
          {{ t("crud.tipStartTitle") }}
          <span class="tvue-crud__tip-count">{{ selectLen }}</span>
          {{ t("crud.tipEndTitle") }}
        </span>
        <span class="tvue-crud__tip-button" @click="clearSelection">{{
            t("crud.emptyBtn")
          }}</span>
        <slot name="tip"></slot>
      </div>
      <slot name="body"></slot>
      <a-form :model="cellForm" @validate="handleValidate" ref="cellForm">
        <component
          :is="tableName"
          :key="reload"
          :data-source="cellForm.list"
          :row-key="rowKey"
          :class="{
            'tvue-crud--indeterminate': validData(
              tableOption.indeterminate,
              false
            ),
          }"
          :size="size"
          :lazy="validData(tableOption.lazy, false)"
          :load="treeLoad"
          :expand-row-by-click="tableOption.expandRowByClick"
          :default-expand-all-rows="tableOption.defaultExpandAll"
          :show-sorter-tooltip="
            tableOption.showSorterTooltip || tableOption.showOverflowTooltip
          "
          @change="handleChange"
          @expand="expandChange"
          @expandedRowsChange="expandedRowsChange"
          :show-summary="tableOption.showSummary"
          :summary-method="tableSummaryMethod"
          :custom-row="customRow"
          :pagination="false"
          :scroll="scrollConfig"
          :row-selection="rowSelection"
          :bordered="tableOption.border"
          @resizeColumn="handleResizeColumn"
          ref="table"
          v-loading.lock="tableLoading"
          :element-loading-text="tableOption.loadingText"
          :element-loading-spinner="tableOption.loadingSpinner"
          :element-loading-svg="tableOption.loadingSvg"
          :element-loading-background="tableOption.loadingBackground"
        >
          <template #emptyText>
            <div :class="b('empty')">
              <slot name="empty" v-if="$slots.empty"></slot>
              <a-empty
                v-else
                :description="tableOption.emptyText || t('crud.emptyText')"
              ></a-empty>
            </div>
          </template>
          <column v-if="!virtualize" :columnOption="columnOption">
            <template #header>
              <column-default ref="columnDefault">
                <template #expand="{ record, index }">
                  <slot :row="record" :index="index" name="expand"></slot>
                </template>
              </column-default>
            </template>
            <template v-for="item in mainSlot" #[item]="scope">
              <slot v-bind="scope" :name="item"></slot>
            </template>
            <template #footer>
              <column-menu>
                <template #menu-header="scope">
                  <slot name="menu-header" v-bind="scope"></slot>
                </template>
                <template #menu="scope">
                  <slot name="menu" v-bind="scope"></slot>
                </template>
                <template #menu-btn="scope">
                  <slot name="menu-btn" v-bind="scope"></slot>
                </template>
                <template #menu-before="scope">
                  <slot name="menu-before" v-bind="scope"></slot>
                </template>
                <template #menu-btn-before="scope">
                  <slot name="menu-btn-before" v-bind="scope"></slot>
                </template>
              </column-menu>
            </template>
          </column>
        </component>
      </a-form>
      <slot name="footer"></slot>
    </a-card>
    <!-- 分页 -->
    <table-page ref="tablePage">
      <template #page>
        <slot name="page"></slot>
      </template>
    </table-page>
    <!-- 表单 -->
    <dialog-form ref="dialogForm">
      <template v-for="item in formSlot" #[item]="scope">
        <slot v-bind="scope" :name="item"></slot>
      </template>
      <template #menu-form="scope">
        <slot name="menu-form" v-bind="scope"></slot>
      </template>
      <template #menu-form-before="scope">
        <slot name="menu-form-before" v-bind="scope"></slot>
      </template>
    </dialog-form>
    <dialog-excel ref="dialogExcel"></dialog-excel>
    <dialog-column ref="dialogColumn"></dialog-column>
    <dialog-filter ref="dialogFilter"></dialog-filter>
  </div>
</template>
<script>
import create from "core/create";
import packages from "core/packages";
import locale from "core/locale";
import permission from "common/directive/permission";
import init from "common/common/init";
import tableCard from "./grid/index";
import tableItemCard from "./grid/item";
import tablePage from "./menu/table-page";
import headerSearch from "./menu/header-search";
import headerMenu from "./menu/header-menu";
import dialogColumn from "./dialog/dialog-column";
import dialogFilter from "./dialog/dialog-filter";
import dialogForm from "./dialog/dialog-form";
import dialogExcel from "./dialog/dialog-excel";
import column from "./column/column";
import columnMenu from "./column/column-menu";
import columnDefault from "./column/column-default";
import config from "./config";
import { calcCascader, formInitVal } from "core/dataformat";
import { DIC_PROPS } from "global/variable";
import { getColumn } from "utils/util";

export default create({
  name: "ant-crud",
  mixins: [init("crud"), locale],
  emits: [
    "update:modelValue",
    "tree-load",
    "selection-clear",
    "resize-column",
    "expand-change",
    "expanded-rows-change",
    "current-row-change",
    "refresh-change",
    "selection-change",
    "select",
    "select-all",
    "sortable-change",
    "column-sortable-change",
    "filter",
    "filter-change",
    "sort-change",
    "row-dblclick",
    "row-click",
    "cell-mouse-enter",
    "cell-mouse-leave",
    "cell-click",
    "header-click",
    "tab-click",
    "enter",
    "error",
    "date-change",
    "grid-status-change",
    "update:search",
    "update:page",
    "search-icon-change",
    "search-change",
    "search-reset",
    "on-load",
    "current-change",
    "size-change",
    "row-contextmenu",
    "header-contextmenu",
    "cell-dblclick",
    "row-del",
    "row-save",
    "row-update",
    "change",
    "scroll",
  ],
  directives: {
    permission,
  },
  provide() {
    return {
      crud: this,
    };
  },
  components: {
    tableCard,
    tableItemCard,
    column,
    columnDefault,
    columnMenu,
    tablePage,
    headerSearch,
    headerMenu,
    dialogColumn,
    dialogFilter,
    dialogForm,
    dialogExcel,
  },
  data() {
    return {
      reload: Math.random(),
      cellForm: {
        list: [],
      },
      config: config,
      list: [],
      listError: {},
      tableForm: {},
      tableHeight: undefined,
      tableIndex: -1,
      tableSelect: [],
      sumsList: {},
      cascaderIndexList: [],
      cascaderDicList: {},
      cascaderFormList: {},
      btnDisabledList: {},
      btnDisabled: false,
      default: {},
      gridShow: false,
    };
  },
  mounted() {
    this.dataInit();
    this.getTableHeight();
    this.initFun();
    this.initVirtualizeFun();
  },
  computed: {
    columnVirtualizeOption() {
      return this.columnOption.map((ele) => {
        return {
          ...ele,
          ...{
            key: ele.prop,
            title: ele.label,
            dataIndex: ele.prop,
          },
        };
      });
    },
    tableName() {
      if (this.virtualize) {
        return "aTableV2";
      }
      return this.gridShow ? "tableCard" : "aTable";
    },
    tableColumnName() {
      return this.gridShow ? "tableItemCard" : "aTableColumn";
    },
    virtualize() {
      return this.tableOption.virtualize;
    },
    size() {
      return this.tableOption.size || this.$TVUE.tableSize || this.$TVUE.size;
    },
    isSortable() {
      return this.tableOption.sortable;
    },
    isRowSort() {
      return this.tableOption.rowSort;
    },
    isColumnSort() {
      return this.tableOption.columnSort;
    },
    rowParentKey() {
      return this.option.rowParentKey || DIC_PROPS.rowParentKey;
    },
    childrenKey() {
      return this.treeProps.children || DIC_PROPS.children;
    },
    hasChildrenKey() {
      return this.treeProps.hasChildren || DIC_PROPS.hasChildren;
    },
    treeProps() {
      return this.tableOption.treeProps || {};
    },
    isAutoHeight() {
      return this.tableOption.height === "auto";
    },
    formSlot() {
      return this.getSlotList(
        ["-error", "-label", "-type", "-form", "-header", "-desc"],
        this.$slots,
        this.propOption
      );
    },
    searchSlot() {
      return this.getSlotList(["-search"], this.$slots, this.propOption);
    },
    mainSlot() {
      let result = [];
      this.propOption.forEach((item) => {
        let prop = item.prop;
        if (this.$slots[prop]) result.push(prop);
      });
      return this.getSlotList(
        ["-header", "-form"],
        this.$slots,
        this.propOption
      ).concat(result);
    },
    calcHeight() {
      return (this.tableOption.calcHeight || 0) + this.$TVUE.calcHeight;
    },
    propOption() {
      let result = [];
      function findProp(list = []) {
        if (!Array.isArray(list)) return;
        list.forEach((ele) => {
          if (Array.isArray(ele.children)) findProp(ele.children);
          else result.push(ele);
        });
      }
      findProp(this.columnOption);
      result = calcCascader(result);
      return result;
    },
    isShowSummary() {
      return this.option.showSummary;
    },
    isHeader() {
      let flag = false;
      this.columnOption.forEach((ele) => {
        if (ele.children) {
          flag = true;
        }
      });
      return flag;
    },
    isTree() {
      let flag = false;
      this.data.forEach((ele) => {
        if (ele.children) {
          flag = true;
        }
      });
      return this.validData(this.tableOption.tree, flag);
    },
    isCard() {
      return this.option.card ? "always" : "never";
    },
    expandLevel() {
      return this.parentOption.expandLevel || 0;
    },
    expandAll() {
      return this.parentOption.expandAll || false;
    },
    parentOption() {
      return this.tableOption || {};
    },
    columnOption() {
      return getColumn(this.tableOption.column);
    },
    sumColumnList() {
      return this.tableOption.sumColumnList || [];
    },
    selectLen() {
      return this.tableSelect ? this.tableSelect.length : 0;
    },
    scrollConfig() {
      const config = {};
      if (this.isAutoHeight) {
        config.y = this.tableHeight;
      } else if (this.height) {
        config.y = this.height;
      } else if (this.tableOption.maxHeight) {
        config.y = this.tableOption.maxHeight;
      }
      if (this.width) {
        config.x = this.width;
      } else if (this.tableOption.width) {
        config.x = this.tableOption.width;
      }
      return config;
    },
    rowSelection() {
      if (!this.tableOption.selection) {
        return null;
      }
      return {
        selectedRowKeys: this.tableSelect.map((item) => item[this.rowKey]),
        onChange: this.selectionChange,
        onSelect: this.select,
        onSelectAll: this.selectAll,
        getCheckboxProps: (record) => ({
          disabled: record.disabled || false,
        }),
      };
    },
    customRow() {
      return {
        on: {
          click: (event, record) => {
            this.rowClick(record, event);
          },
          dblclick: (event, record) => {
            this.rowDblclick(record, event);
          },
          contextmenu: (event, record) => {
            this.rowContextmenu(record, event);
          },
          mouseenter: (event, record) => {
            const column = {};
            const cell = {};
            this.cellMouseEnter(record, column, cell, event);
          },
          mouseleave: (event, record) => {
            const column = {};
            const cell = {};
            this.cellMouseLeave(record, column, cell, event);
          },
        },
      };
    },
  },
  watch: {
    modelValue: {
      handler(val) {
        this.tableForm = val;
      },
      immediate: true,
      deep: true,
    },
    list: {
      handler() {
        this.cellForm.list = this.list;
      },
      deep: true,
    },
    data: {
      handler() {
        this.dataInit();
      },
      deep: true,
    },
    tableOption: {
      handler() {
        this.gridShow = this.tableOption.grid;
      },
      immediate: true,
    },
  },
  props: {
    spanMethod: Function,
    summaryMethod: Function,
    beforeClose: Function,
    beforeOpen: Function,
    rowStyle: [Function, Object],
    cellStyle: [Function, Object],
    rowClassName: [Function, String],
    cellClassName: [Function, String],
    headerCellClassName: [Function, String],
    headerRowClassName: [Function, String],
    headerRowStyle: [Function, Object],
    headerCellStyle: [Function, Object],
    uploadSized: Function,
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    permission: {
      type: [Function, Object],
      default: () => {
        return {};
      },
    },
    modelValue: {
      type: Object,
      default: () => {
        return {};
      },
    },
    search: {
      type: Object,
      default() {
        return {};
      },
    },
    page: {
      type: Object,
      default() {
        return {};
      },
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    width: {
      type: [Number, String],
      default: null,
    },
    height: {
      type: [Number, String],
      default: null,
    },
  },
  methods: {
    initVirtualizeFun() {
      if (!this.virtualize) return;
      this.initTableMethods([
        "scrollTo",
        "scrollToTop",
        "scrollToLeft",
        "scrollRow",
      ]);
    },
    initFun() {
      this.initTableMethods([
        "scrollTo",
        "setScrollTop",
        "setScrollLeft",
        "columns",
        "doLayout",
        "updateKeyChildren",
        "toggleAllSelection",
        "toggleRowSelection",
        "toggleRowExpansion",
        "setCurrentRow",
        "clearFilter",
        "clearSort",
      ]);
    },
    initTableMethods(methods) {
      methods.forEach((ele) => {
        this[ele] = (...args) => {
          const tableRef = this.$refs.table;
          if (tableRef && typeof tableRef[ele] === "function") {
            return tableRef[ele](...args);
          }
        };
      });
    },
    handleGridShow() {
      this.gridShow = !this.gridShow;
      this.$emit("grid-status-change", this.gridShow);
    },
    handleValidate(prop, valid, msg) {
      if (!this.listError[prop])
        this.listError[prop] = { valid: false, msg: "" };

      this.listError[prop].valid = !valid;
      this.listError[prop].msg = msg;
    },
    getPermission(key, row, index) {
      if (typeof this.permission === "function") {
        return this.permission(key, row, index);
      } else if (!this.validatenull(this.permission[key])) {
        return this.permission[key];
      } else {
        return true;
      }
    },
    getTableHeight() {
      this.$nextTick(() => {
        if (this.isAutoHeight) {
          const clientHeight = document.documentElement.clientHeight;
          const calcHeight = this.calcHeight || 0;
          const tableRef = this.$refs.table;
          const tablePageRef = this.$refs.tablePage;
          let tableHeight = clientHeight - calcHeight;
          if (tableRef && tableRef.$el) {
            const height = tableRef.$el.offsetTop || 0;
            tableHeight -= height;
          }
          if (tablePageRef && tablePageRef.$el) {
            const height = tablePageRef.$el.offsetHeight || 0;
            tableHeight -= height;
          }
          this.tableHeight = tableHeight;
        } else {
          this.tableHeight = this.tableOption.height;
        }
        this.doLayout();
      });
    },
    refreshTable(callback) {
      this.reload = Math.random();
      this.tableSelect = [];
      this.$nextTick(() => {
        callback && callback();
      });
    },
    treeLoad(tree, treeNode, resolve) {
      this.$emit("tree-load", tree, treeNode, (data) => {
        tree.children = data;
        resolve(data);
      });
    },
    menuIcon(value) {
      return this.validData(
        this.tableOption[value + "Text"],
        this.t("crud." + value)
      );
    },
    getBtnIcon(value) {
      const name = value + "Icon";
      return this.tableOption[name]
        ? this.tableOption[name].trim()
        : config[name];
    },
    validateField(val, fn) {
      return this.$refs.dialogForm.$refs.tableForm.validateField(val, fn);
    },
    clearSelection() {
      this.$emit("selection-clear", this.deepClone(this.tableSelect));
      this.$refs.table.clearSelection();
    },
    dataInit() {
      this.list = this.data;
      this.list.forEach((ele, index) => {
        if (ele.$cellEdit && !this.cascaderFormList[index]) {
          this.cascaderFormList[index] = this.deepClone(ele);
        }
        ele.$cellEdit = ele.$cellEdit || false;
        ele.$index = index;
      });
    },
    handleResizeColumn(w, col) {
      this.$emit("resize-column", w, col);
    },
    handleChange(pagination, filters, sorter, extra) {
      if (extra.action === "filter") {
        this.$emit("filter-change", filters);
      } else if (extra.action === "sort") {
        this.$emit("sort-change", {
          prop: sorter.field,
          order: sorter.order,
          column: sorter,
        });
      }
    },
    expandedRowsChange(expandedRows) {
      this.$emit("expanded-rows-change", expandedRows);
    },
    expandChange(expanded, record) {
      this.$emit("expand-change", record, expanded);
    },
    currentRowChange(row) {
      this.$emit("current-row-change", row);
    },
    refreshChange() {
      this.$emit("refresh-change");
    },
    toggleSelection(rows, checked) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.table.toggleRowSelection(row, checked);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    selectionChange(selectedRowKeys, selectedRows) {
      this.tableSelect = selectedRows;
      this.$emit("selection-change", this.tableSelect);
    },
    select(record, selected, selectedRows) {
      this.$emit("select", selectedRows, record);
    },
    selectAll(selected, selectedRows, changeRows) {
      this.$emit("select-all", selectedRows);
    },
    rowDblclick(record, event) {
      this.$emit("row-dblclick", record, event);
    },
    rowClick(record, event) {
      this.$emit("row-click", record, event);
    },
    cellMouseEnter(record, column, cell, event) {
      this.$emit("cell-mouse-enter", record, column, cell, event);
    },
    cellMouseLeave(record, column, cell, event) {
      this.$emit("cell-mouse-leave", record, column, cell, event);
    },
    cellClick(record, column, cell, event) {
      this.$emit("cell-click", record, column, cell, event);
    },
    headerClick(column, event) {
      this.$emit("header-click", column, event);
    },
    rowContextmenu(record, event) {
      this.$emit("row-contextmenu", record, event);
    },
    headerContextmenu(column, event) {
      this.$emit("header-contextmenu", column, event);
    },
    cellDblclick(record, column, cell, event) {
      this.$emit("cell-dblclick", record, column, cell, event);
    },
    rowCellAdd(row = {}) {
      let len = this.list.length;
      let formDefault = formInitVal(this.propOption);
      row = this.deepClone(
        Object.assign(
          {
            $cellEdit: true,
            $index: len,
          },
          formDefault,
          row
        )
      );
      this.list.push(row);
    },
    rowCancel(row, index) {
      if (this.validatenull(row[this.rowKey])) {
        this.list.splice(index, 1);
        delete this.cascaderDIC[index];
      } else {
        this.cascaderFormList[index].$cellEdit = false;
        this.cascaderDIC[index] = this.cascaderDicList[index];
        this.list[index] = this.cascaderFormList[index];
      }
      delete this.cascaderDicList[index];
      delete this.cascaderFormList[index];
      this.cascaderIndexList.splice(this.cascaderIndexList.indexOf(index), 1);
    },
    rowCell(row, index) {
      if (row.$cellEdit) {
        this.rowCellUpdate(row, index);
      } else {
        this.rowCellEdit(row, index);
      }
    },
    rowCellUpdate(row, index) {
      const done = (newRow) => {
        row = newRow || row;
        this.btnDisabledList[index] = false;
        this.btnDisabled = false;
        row.$cellEdit = false;
        this.list[index] = row;
        this.cascaderIndexList.splice(this.cascaderIndexList.indexOf(index), 1);
        delete this.cascaderFormList[index];
      };
      const loading = () => {
        this.btnDisabledList[index] = false;
        this.btnDisabled = false;
      };
      this.validateCellField(index).then(() => {
        this.btnDisabledList[index] = true;
        this.btnDisabled = true;
        if (this.validatenull(row[this.rowKey])) {
          this.$emit("row-save", row, done, loading);
        } else {
          this.$emit("row-update", row, index, done, loading);
        }
      });
    },
    rowCellEdit(row, index) {
      row.$cellEdit = true;
      this.cascaderFormList[index] = this.deepClone(row);
      this.cascaderDicList[index] = this.deepClone(this.cascaderDIC[index]);
    },
    validateCellForm(cb) {
      return new Promise((resolve) => {
        this.$refs.cellForm.validate((valid, msg) => {
          resolve(msg);
        });
      });
    },
    validateCellField(index) {
      return new Promise((resolve, reject) => {
        this.$refs.cellForm.validate((valid, msg = {}) => {
          let result = true;
          let list = [];
          Object.keys(msg).forEach((ele) => {
            if (ele.indexOf(`list.${index}.`) !== -1) {
              result = false;
            } else {
              list.push(ele);
            }
          });
          if (!this.validatenull(list)) this.$refs.cellForm.clearValidate(list);
          if (result) resolve();
        });
      });
    },
    clearValidate(list) {
      this.$refs.cellForm.clearValidate(list);
    },
    rowAdd() {
      this.$refs.dialogForm.show("add");
    },
    rowSave() {
      return this.$refs.dialogForm.$refs.tableForm.submit();
    },
    rowUpdate() {
      return this.$refs.dialogForm.$refs.tableForm.submit();
    },
    closeDialog() {
      return this.$refs.dialogForm.closeDialog();
    },
    getPropRef(prop) {
      return this.$refs.dialogForm.$refs.tableForm.getPropRef(prop);
    },
    setVal() {
      this.$emit("update:modelValue", this.tableForm);
      this.$emit("change", this.tableForm);
    },
    rowEdit(row, index) {
      this.tableForm = this.deepClone(row);
      this.tableIndex = index;
      this.setVal();
      this.$refs.dialogForm.show("edit");
    },
    rowCopy(row) {
      this.tableForm = this.deepClone(row);
      delete this.tableForm[this.rowKey];
      this.tableIndex = -1;
      this.setVal();
      this.$refs.dialogForm.show("add");
    },
    rowView(row, index) {
      this.tableForm = this.deepClone(row);
      this.tableIndex = index;
      this.setVal();
      this.$refs.dialogForm.show("view");
    },
    rowDel(row, index) {
      this.$emit("row-del", row, index, () => {
        let { parentList, index } = this.findData(row[this.rowKey]);
        if (parentList) parentList.splice(index, 1);
      });
    },
    tableSpanMethod(param) {
      if (typeof this.spanMethod === "function") return this.spanMethod(param);
    },
    tableSummaryMethod(param) {
      let sumsList = {};
      let sums = [];
      const { columns, data } = param;
      if (typeof this.summaryMethod === "function") {
        sums = this.summaryMethod(param);
        columns.forEach((column, index) => {
          sumsList[column.dataIndex || column.key] = sums[index];
        });
        this.sumsList = sumsList;
      } else {
        columns.forEach((column, index) => {
          let currItem = this.sumColumnList.find(
            (item) => item.name === (column.dataIndex || column.key)
          );
          if (currItem) {
            let decimals = currItem.decimals !== void 0 ? currItem.decimals : 2;
            let label = currItem.label || "";
            switch (currItem.type) {
              case "count":
                sums[index] = label + data.length;
                break;
              case "avg":
                let avgValues = data.map((item) =>
                  Number(item[column.dataIndex || column.key])
                );
                let nowindex = 1;
                sums[index] = avgValues.reduce((perv, curr) => {
                  let value = Number(curr);
                  if (!isNaN(value)) {
                    return (perv * (nowindex - 1) + curr) / nowindex++;
                  } else {
                    return perv;
                  }
                }, 0);
                sums[index] = label + sums[index].toFixed(decimals);
                break;
              case "sum":
                let values = data.map((item) =>
                  Number(item[column.dataIndex || column.key])
                );
                sums[index] = values.reduce((perv, curr) => {
                  let value = Number(curr);
                  if (!isNaN(value)) {
                    return perv + curr;
                  } else {
                    return perv;
                  }
                }, 0);
                sums[index] = label + sums[index].toFixed(decimals);
                break;
            }
            sumsList[column.dataIndex || column.key] = sums[index];
          } else {
            sums[index] = "";
          }
        });
      }
      this.sumsList = sumsList;
      return sums;
    },
    tableDrop(type, el, callback) {
      if (this.isSortable !== true) {
        if (type == "row" && !this.isRowSort) {
          return;
        } else if (type == "column" && !this.isColumnSort) {
          return;
        }
      } else if (!el) return;
      if (!window.Sortable) {
        packages.logs("Sortable");
        return;
      }
      return window.Sortable.create(el, {
        ghostClass: config.ghostClass,
        chosenClass: config.ghostClass,
        animation: 100,
        delay: 100,
        onEnd: (evt) => callback(evt),
        filter: ".ant-table-fixed-right",
      });
    },
    findData(id) {
      let result = {};
      const callback = (parentList, parent) => {
        parentList.forEach((ele, index) => {
          if (ele[this.rowKey] == id) {
            result = {
              item: ele,
              index: index,
              parentList: parentList,
              parent: parent,
            };
          }
          if (ele[this.childrenKey]) {
            callback(ele[this.childrenKey], ele);
          }
        });
      };
      callback(this.list);
      return result;
    },
  },
});
</script>
