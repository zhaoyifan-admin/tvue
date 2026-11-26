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
    <el-card :shadow="isCard" :class="b('body')">
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
        :class="b('tip')"
        v-if="validData(tableOption.tip, config.tip) && tableOption.selection"
        role="status"
        aria-live="polite"
      >
        <div :class="b('tip-content')">
          <el-icon-circle-check-filled :class="b('tip-icon')" aria-hidden="true" />
          <span :class="b('tip-name')">{{ t("crud.tipStartTitle") }}</span>
          <span :class="b('tip-count')">{{ selectLen }}</span>
          <span :class="b('tip-suffix')">{{ t("crud.tipEndTitle") }}</span>
        </div>
        <div :class="b('tip-actions')">
          <slot name="tip" :selection="tableSelect" :count="selectLen"></slot>
          <el-button
            v-if="selectLen > 0"
            text
            type="primary"
            :icon="getBtnIcon('emptyBtn')"
            :class="b('tip-button')"
            :size="size"
            @click="clearSelection"
          >{{ t("crud.emptyBtn") }}</el-button>
        </div>
      </div>
      <slot name="body"></slot>
      <el-form :model="cellForm" @validate="handleValidate" ref="cellForm">
        <component
          :is="tableName"
          :key="reload"
          :data="cellForm.list"
          :fixed="tableOption.fixed"
          :columns="columnVirtualizeOption"
          :row-key="rowKey"
          :class="{
            'tvue-crud--indeterminate': validData(
              tableOption.indeterminate,
              false,
            ),
          }"
          :size="size"
          :append-filter-panel-to="tableOption.appendFilterPanelTo"
          :allow-drag-last-column="tableOption.allowDragLastColumn"
          :lazy="validData(tableOption.lazy, false)"
          :load="treeLoad"
          :tree-props="treeProps"
          :scrollbar-always-on="tableOption.scrollbarAlwaysOn"
          :flexible="tableOption.flexible"
          :table-layout="tableOption.tableLayout"
          :expand-row-keys="tableOption.expandRowKeys"
          :default-expand-all="tableOption.defaultExpandAll"
          :highlight-current-row="tableOption.highlightCurrentRow"
          :tooltip-effect="tableOption.tooltipEffect"
          :tooltip-options="tableOption.tooltipOptions"
          :show-overflow-tooltip="
            tableOption.showOverflowTooltip || tableOption.overHidden
          "
          :tooltip-formatter="tableOption.tooltipFormatter"
          @current-change="currentRowChange"
          @expand-change="expandChange"
          @header-dragend="headerDragend"
          :show-summary="tableOption.showSummary"
          :summary-method="tableSummaryMethod"
          :span-method="tableSpanMethod"
          :stripe="tableOption.stripe"
          :show-header="tableOption.showHeader"
          :default-sort="tableOption.defaultSort"
          :expand-column-key="tableOption.expandColumnKey"
          @scroll="scroll"
          @row-click="rowClick"
          @row-dblclick="rowDblclick"
          @cell-mouse-enter="cellMouseEnter"
          @cell-mouse-leave="cellMouseLeave"
          @cell-click="cellClick"
          @header-click="headerClick"
          @row-contextmenu="rowContextmenu"
          @header-contextmenu="headerContextmenu"
          @cell-dblclick="cellDblclick"
          :row-class-name="rowClassName"
          :cell-class-name="cellClassName"
          :row-style="rowStyle"
          :cell-style="cellStyle"
          :fit="tableOption.fit"
          :header-cell-class-name="headerCellClassName"
          :header-row-class-name="headerRowClassName"
          :header-row-style="headerRowStyle"
          :header-cell-style="headerCellStyle"
          :max-height="isAutoHeight ? tableHeight : tableOption.maxHeight"
          :height="virtualTableHeight"
          ref="table"
          :width="virtualTableWidth"
          :border="tableOption.border"
          v-loading.lock="tableLoading"
          :element-loading-text="tableOption.loadingText"
          :element-loading-spinner="tableOption.loadingSpinner"
          :element-loading-svg="tableOption.loadingSvg"
          :element-loading-background="tableOption.loadingBackground"
          @filter-change="filterChange"
          @selection-change="selectionChange"
          @select="select"
          @select-all="selectAll"
          @sort-change="sortChange"
        >
          <template #empty>
            <div :class="b('empty')">
              <slot name="empty" v-if="$slots.empty"></slot>
              <el-empty
                :image-size="100"
                v-else
                :description="tableOption.emptyText || t('crud.emptyText')"
              ></el-empty>
            </div>
          </template>
          <column v-if="!virtualize" :columnOption="columnOption">
            <template #header>
              <column-default ref="columnDefault">
                <template #expand="{ row, index }">
                  <slot :row="row" :index="index" name="expand"></slot>
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
      </el-form>
      <slot name="footer"></slot>
    </el-card>
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
    <dialog-import v-if="tableOption.importBtn" ref="dialogImport"></dialog-import>
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
import dialogImport from "./dialog/dialog-import";
import queryView from "packages/element-plus/crud/query-view";
import column from "./column/column";
import columnMenu from "./column/column-menu";
import columnDefault from "./column/column-default";
import config from "./config";
import {
  applyColumnState,
  createColumnState,
  loadColumnState,
  removeColumnState,
  saveColumnState,
} from "core/column-state";
import { calcCascader, formInitVal } from "core/dataformat";
import { cloneModel, isModelEqual } from "core/model";
import { detail } from "core/detail";
import { DIC_PROPS } from "global/variable";
import { CommonProps } from "element-plus";
import { h, resolveComponent } from "vue";
import { getColumn } from "utils/util";
export default create({
  name: "crud",
  mixins: [init("crud"), locale, queryView],
  emits: [
    "update:modelValue",
    "tree-load",
    "selection-clear",
    "header-dragend",
    "expand-change",
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
    "column-state-change",
    "column-state-reset",
    "import-submit",
    "import-success",
    "query-view-change",
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
    columnDefault, //其它列,
    columnMenu, //操作栏，
    tablePage, //分页
    headerSearch, //搜索
    headerMenu, //菜单头部
    dialogColumn, //显隐列
    dialogFilter, //过滤器
    dialogForm, //分页
    dialogExcel, //导出
    dialogImport,
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
      tableFormSnapshot: null,
      tableHeight: undefined,
      virtualWidth: 0,
      resizeTimer: null,
      tableIndex: -1,
      tableSelect: [],
      sumsList: {},
      cascaderIndexList: [],
      cascaderDicList: {},
      cascaderFormList: {},
      btnDisabledList: {},
      btnDisabled: false,
      default: {},
      searchShow: true,
      gridShow: false,
      columnStateSource: null,
    };
  },
  mounted() {
    this.dataInit();
    this.getTableHeight();
    this.$nextTick(() => {
      this.virtualWidth = this.$el && this.$el.clientWidth ? this.$el.clientWidth : 800;
    });
    window.addEventListener("resize", this.handleResize);
    this.initFun();
  },
  beforeUnmount() {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    dataToolsEnabled() {
      return this.validData(this.tableOption.dataToolsBtn, config.dataToolsBtn);
    },
    queryViewEnabled() {
      return this.dataToolsEnabled && this.validData(this.tableOption.queryViewBtn, config.queryViewBtn);
    },
    columnVirtualizeOption() {
      const columns = this.columnOption.map((ele) => {
        return {
          ...ele,
          key: ele.prop,
          title: ele.label,
          dataKey: ele.prop,
          width: Number(ele.width) || 150,
          cellRenderer: (params) => this.renderVirtualCell(ele, params),
        };
      });
      if (
        this.virtualize &&
        this.validData(this.tableOption.menu, config.menu)
      ) {
        columns.push({
          key: "menu",
          dataKey: "menu",
          title: this.tableOption.menuTitle || this.t("crud.menu"),
          width: Number(this.tableOption.menuWidth) || config.menuWidth,
          fixed: this.validData(this.tableOption.menuFixed, config.menuFixed),
          align: this.validData(this.tableOption.menuAlign, config.menuAlign),
          cellRenderer: (params) => this.renderVirtualMenu(params),
        });
      }
      return columns;
    },
    //虚拟表格必须显式高度，未配置时用默认值，保证数据行可渲染
    virtualTableHeight() {
      const value = this.height || this.tableHeight;
      if (this.virtualize && !value) return 400;
      return value;
    },
    //el-table-v2 的 width 必须是数字，虚拟表格下不传百分比字符串，交由组件自适应容器
    virtualTableWidth() {
      if (!this.virtualize) {
        return this.width ? this.width : this.setPx(this.tableOption.width, config.width);
      }
      const value = this.width || this.tableOption.width;
      const num = Number(value);
      if (Number.isFinite(num) && num > 0) return num;
      return this.virtualWidth || 800;
    },
    tableName() {
      if (this.virtualize) {
        return "elTableV2";
      }
      return this.gridShow ? "tableCard" : "elTable";
    },
    tableColumnName() {
      return this.gridShow ? "tableItemCard" : "elTableColumn";
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
        this.propOption,
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
        this.propOption,
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
    columnStateKey() {
      return (
        this.tableOption.columnStateKey ||
        this.tableOption.columnPersistKey ||
        this.tableOption.tableId
      );
    },
    columnStateStorage() {
      return this.tableOption.columnStateStorage || "localStorage";
    },
    columnStateEnabled() {
      return (
        this.validData(this.tableOption.columnState, true) !== false &&
        !this.validatenull(this.columnStateKey)
      );
    },
    sumColumnList() {
      return this.tableOption.sumColumnList || [];
    },
    selectLen() {
      return this.tableSelect ? this.tableSelect.length : 0;
    },
  },
  watch: {
    modelValue: {
      handler(val) {
        // The parent may echo an emitted snapshot after another local edit.
        // That acknowledgment must not replace the newer editable values.
        if (this.tableFormSnapshot !== null && isModelEqual(val, this.tableFormSnapshot)) return;
        if (!isModelEqual(val, this.tableForm)) {
          this.tableForm = cloneModel(val);
          this.tableFormSnapshot = null;
        }
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
    initFun() {
      this.initTableMethods([
        "scrollTo",
        "setScrollTop",
        "setScrollLeft",
        "columns",
        "doLayout",
        "updateKeyChildren",
        "getHalfSelectionRows",
        "toggleAllSelection",
        "toggleRowSelection",
        "toggleRowExpansion",
        "setCurrentRow",
        "clearFilter",
        "clearSort",
        "sort",
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
    restoreColumnState() {
      if (!this.columnStateEnabled) return;
      this.columnStateSource = this.deepClone(this.tableOption.column);
      const columns = this.deepClone(this.columnStateSource);
      const loader = this.tableOption.columnStateLoad;
      const state =
        typeof loader === "function"
          ? loader(this.columnStateKey, this.tableOption)
          : loadColumnState(this.columnStateKey, this.columnStateStorage);
      this.tableOption.column = state
        ? applyColumnState(columns, state)
        : columns;
    },
    saveColumnState(reason = "change") {
      if (!this.columnStateEnabled) return;
      if (this.validData(this.tableOption.columnStateAutoSave, true) === false) {
        return;
      }
      const state = createColumnState(this.columnOption);
      const saver = this.tableOption.columnStateSave;
      if (typeof saver === "function") {
        saver(state, this.columnStateKey, reason, this.tableOption);
      } else {
        saveColumnState(this.columnStateKey, state, this.columnStateStorage);
      }
      this.$emit("column-state-change", state, reason);
    },
    resetColumnState(callback) {
      if (!this.columnStateEnabled) return;
      const remover = this.tableOption.columnStateRemove;
      if (typeof remover === "function") {
        remover(this.columnStateKey, this.tableOption);
      } else {
        removeColumnState(this.columnStateKey, this.columnStateStorage);
      }
      if (this.columnStateSource) {
        this.tableOption.column = this.deepClone(this.columnStateSource);
      }
      this.refreshTable(() => {
        this.doLayout();
        callback && callback();
        this.$emit("column-state-reset", this.columnStateKey);
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
    //窗口尺寸变化时防抖重算表格高度，同时更新虚拟表格宽度
    handleResize() {
      if (this.resizeTimer) clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.getTableHeight();
        this.virtualWidth = this.$el && this.$el.clientWidth ? this.$el.clientWidth : 800;
      }, 100);
    },
    getTableHeight() {
      this.$nextTick(() => {
        if (this.isAutoHeight) {
          const clientHeight = document.documentElement.clientHeight;
          const calcHeight = this.calcHeight || 0;
          const tableRef = this.$refs.table;
          const tablePageRef = this.$refs.tablePage;
          // body 默认下外边距不计入 clientHeight，auto 高度需扣除，否则页面出现滚动条
          const bodyGap = parseFloat(getComputedStyle(document.body).marginBottom) || 0;
          let tableHeight = clientHeight - calcHeight - bodyGap;
          if (tableRef) {
            const height = tableRef.$el.offsetTop || 0;
            tableHeight -= height;
          }
          if (tablePageRef) {
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
    //树懒加载
    treeLoad(tree, treeNode, resolve) {
      this.$emit("tree-load", tree, treeNode, (data) => {
        tree.children = data;
        resolve(data);
      });
    },
    menuIcon(value) {
      return this.validData(
        this.tableOption[value + "Text"],
        this.t("crud." + value),
      );
    },
    getBtnIcon(value) {
      const name = value + "Icon";
      return this.tableOption[name]
        ? this.tableOption[name].trim()
        : config[name];
    },
    //虚拟表格单元格渲染：兼容列插槽、render 与字典格式化
    renderVirtualCell(column, params) {
      const { rowData, rowIndex } = params || {};
      const row = rowData || {};
      const scope = {
        row,
        column,
        index: rowIndex,
        dic: this.getRowDic(row, column),
      };
      const slotName = this.getSlotName(column, "F");
      const slot = this.$slots[column.prop] || this.$slots[slotName];
      if (slot) return h("span", slot(scope));
      if (typeof column.render === "function") {
        return h("span", column.render(scope));
      }
      const value = detail(row, column, this.tableOption, scope.dic);
      if (column.html) return h("span", { innerHTML: value });
      return h("span", String(value == null ? "" : value));
    },
    //虚拟表格操作列渲染：普通模式下由 column-menu 提供
    renderVirtualMenu(params) {
      const { rowData, rowIndex } = params || {};
      const row = rowData || {};
      const buttons = [];
      const addButton = (key, visible, handler) => {
        if (!visible || !this.getPermission(key, row, rowIndex)) return;
        buttons.push(
          h(
            resolveComponent("el-button"),
            {
              key,
              text: true,
              type: "primary",
              size: this.size,
              icon: this.getBtnIcon(key),
              disabled: this.btnDisabled,
              onClick: (event) => {
                event.stopPropagation();
                handler();
              },
            },
            () => this.menuIcon(key),
          ),
        );
      };
      addButton(
        "viewBtn",
        this.validData(this.tableOption.viewBtn, config.viewBtn),
        () => this.rowView(row, rowIndex),
      );
      addButton(
        "copyBtn",
        this.validData(this.tableOption.copyBtn, config.copyBtn),
        () => this.rowCopy(row),
      );
      addButton(
        "editBtn",
        this.validData(this.tableOption.editBtn, config.editBtn) &&
          !row.$cellEdit,
        () => this.rowEdit(row, rowIndex),
      );
      addButton(
        "delBtn",
        this.validData(this.tableOption.delBtn, config.delBtn) &&
          !row.$cellEdit,
        () => this.rowDel(row, rowIndex),
      );
      return h("div", buttons);
    },
    //对部分表单字段进行校验的方法
    validateField(val, fn) {
      return this.$refs.dialogForm.$refs.tableForm.validateField(val, fn);
    },
    clearSelection() {
      this.$emit("selection-clear", this.deepClone(this.tableSelect));
      this.$refs.table.clearSelection();
    },
    dataInit() {
      this.list = this.data;
      //初始化序列的参数
      this.list.forEach((ele, index) => {
        if (ele.$cellEdit && !this.cascaderFormList[index]) {
          this.cascaderFormList[index] = this.deepClone(ele);
        }
        ele.$cellEdit = ele.$cellEdit || false;
        ele.$index = index;
      });
    },
    //拖动表头事件
    headerDragend(newWidth, oldWidth, column, event) {
      const prop = column.property || column.prop;
      if (prop && this.objectOption[prop]) {
        this.objectOption[prop].width = newWidth;
        this.saveColumnState("width");
      }
      this.$emit("header-dragend", newWidth, oldWidth, column, event);
    },
    headerSort(oldIndex, newIndex) {
      const visibleColumns = this.columnOption.filter(
        (col) => col.hide !== true,
      );
      const oldProp = visibleColumns[oldIndex].prop;
      const newProp = visibleColumns[newIndex].prop;
      const allColumns = this.columnOption;
      const realOldIndex = allColumns.findIndex((col) => col.prop === oldProp);
      const realNewIndex = allColumns.findIndex((col) => col.prop === newProp);
      const targetRow = allColumns.splice(realOldIndex, 1)[0];
      allColumns.splice(realNewIndex, 0, targetRow);
      this.doLayout();
      this.saveColumnState("sort");
      this.$emit("column-sortable-change", {
        oldIndex,
        newIndex,
        column: targetRow,
      });
    },
    scroll(params) {
      this.$emit("scroll", params);
    },
    //展开或则关闭
    expandChange(row, expand) {
      this.$emit("expand-change", row, expand);
    },
    //设置单选
    currentRowChange(row) {
      this.$emit("current-row-change", row);
    },
    //刷新事件
    refreshChange() {
      this.$emit("refresh-change");
    },
    // 选中实例
    toggleSelection(rows, checked) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.table.toggleRowSelection(row, checked);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    // 选择回调
    selectionChange(val) {
      this.tableSelect = val;
      this.$emit("selection-change", this.tableSelect);
    },
    // 单个选择回调
    select(selection, row) {
      this.$emit("select", selection, row);
    },
    // 点击勾选全选 Checkbox
    selectAll(selection) {
      this.$emit("select-all", selection);
    },
    //筛选回调用
    filterChange(filters) {
      this.captureQueryFilters(filters);
      if (this.queryViewApplying) return;
      this.$emit("filter-change", filters);
    },
    // 排序回调
    sortChange(val) {
      this.captureQuerySort(val);
      if (this.queryViewApplying) return;
      this.$emit("sort-change", val);
    },
    // 行双击
    rowDblclick(row, event) {
      this.$emit("row-dblclick", row, event);
    },
    // 行单机
    rowClick(row, event, column) {
      this.$emit("row-click", row, event, column);
    },
    //当单元格 hover 进入时会触发该事件
    cellMouseEnter(row, column, cell, event) {
      this.$emit("cell-mouse-enter", row, column, cell, event);
    },
    //当单元格 hover 退出时会触发该事件
    cellMouseLeave(row, column, cell, event) {
      this.$emit("cell-mouse-leave", row, column, cell, event);
    },
    //当某个单元格被点击时会触发该事件
    cellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
    //	当某一列的表头被点击时会触发该事件
    headerClick(column, event) {
      this.$emit("header-click", column, event);
    },
    //当某一行被鼠标右键点击时会触发该事件
    rowContextmenu(row, column, event) {
      this.$emit("row-contextmenu", row, column, event);
    },
    //当某一列的表头被鼠标右键点击时触发该事件
    headerContextmenu(column, event) {
      this.$emit("header-contextmenu", column, event);
    },
    //当某个单元格被双击击时会触发该事件
    cellDblclick(row, column, cell, event) {
      this.$emit("cell-dblclick", row, column, cell, event);
    },
    //单元格新增
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
          row,
        ),
      );
      this.list.push(row);
    },
    //行取消
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
      this.removeCascaderIndex(index);
    },
    removeCascaderIndex(index) {
      const position = this.cascaderIndexList.indexOf(index);
      if (position > -1) this.cascaderIndexList.splice(position, 1);
    },
    //行编辑点击
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
        this.removeCascaderIndex(index);
        delete this.cascaderFormList[index];
      };
      const loading = () => {
        this.btnDisabledList[index] = false;
        this.btnDisabled = false;
      };
      this.validateCellField(index).then((valid) => {
        if (!valid) return;
        this.btnDisabledList[index] = true;
        this.btnDisabled = true;
        if (this.validatenull(row[this.rowKey])) {
          this.$emit("row-save", row, done, loading);
        } else {
          this.$emit("row-update", row, index, done, loading);
        }
      });
    },
    // 单元格编辑
    rowCellEdit(row, index) {
      row.$cellEdit = true;
      //缓冲行数据
      this.cascaderFormList[index] = this.deepClone(row);
      //缓冲级联字典
      this.cascaderDicList[index] = this.deepClone(this.cascaderDIC[index]);
    },
    // 对部分表单字段进行校验
    validateCellForm(cb) {
      return new Promise((resolve) => {
        this.$refs.cellForm.validate((valid, msg) => {
          resolve(msg);
        });
      });
    },
    validateCellField(index) {
      return new Promise((resolve) => {
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
          resolve(result);
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
    rowImport() {
      return this.$refs.dialogImport?.handleShow();
    },
    handleFormModelValue(value) {
      if (!isModelEqual(value, this.tableForm)) {
        this.tableForm = cloneModel(value);
      }
      this.setVal();
    },
    setVal(force = false) {
      if (!force && isModelEqual(this.tableForm, this.tableFormSnapshot)) return;
      const snapshot = cloneModel(this.tableForm);
      this.tableFormSnapshot = snapshot;
      this.$emit("update:modelValue", cloneModel(snapshot));
      this.$emit("change", cloneModel(snapshot));
    },
    // 编辑
    rowEdit(row, index) {
      this.tableForm = cloneModel(row);
      this.tableIndex = index;
      this.setVal(true);
      this.$refs.dialogForm.show("edit");
    },
    //复制
    rowCopy(row) {
      this.tableForm = cloneModel(row);
      delete this.tableForm[this.rowKey];
      this.tableIndex = -1;
      this.setVal(true);
      this.$refs.dialogForm.show("add");
    },
    //查看
    rowView(row, index) {
      this.tableForm = cloneModel(row);
      this.tableIndex = index;
      this.setVal(true);
      this.$refs.dialogForm.show("view");
    },
    // 删除
    rowDel(row, index) {
      this.$emit("row-del", row, index, () => {
        let { parentList, index } = this.findData(row[this.rowKey]);
        if (parentList) parentList.splice(index, 1);
      });
    },
    //合并行
    tableSpanMethod(param) {
      if (typeof this.spanMethod === "function") return this.spanMethod(param);
    },
    //合集统计逻辑
    tableSummaryMethod(param) {
      let sumsList = {};
      let sums = [];
      const { columns, data } = param;
      //如果自己写逻辑则调用summaryMethod方法
      if (typeof this.summaryMethod === "function") {
        sums = this.summaryMethod(param);
        columns.forEach((column, index) => {
          sumsList[column.property] = sums[index];
        });
        this.sumsList = sumsList;
      } else {
        columns.forEach((column, index) => {
          let currItem = this.sumColumnList.find(
            (item) => item.name === column.property,
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
                  Number(item[column.property]),
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
                let values = data.map((item) => Number(item[column.property]));
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
            sumsList[column.property] = sums[index];
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
        filter: (evt) => {
          // Let Element Plus own the entire column resize interaction.
          if (type === "column" && document.body.style.cursor === "col-resize") {
            return true;
          }
          return !!evt.target.closest(".el-table-fixed-column--right");
        },
        preventOnFilter: type !== "column",
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
