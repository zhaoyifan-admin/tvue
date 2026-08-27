<template>
  <el-popover v-if="triggerRef" v-model:visible="columnBox" :virtual-ref="triggerRef" :width="crud.isMobile ? 320 : 320"
              placement="bottom-end" popper-class="tvue-crud__column-popper" virtual-triggering @hide="handleHide">
    <div class="tvue-crud__column-panel">
      <div class="tvue-crud__column-panel__header">
        <el-checkbox :model-value="isAllVisible" :indeterminate="isIndeterminate" @change="handleCheckAll">
          {{ t("crud.column.all") }}
        </el-checkbox>
      </div>
      <div ref="list" class="tvue-crud__column-panel__list">
        <div v-for="column in data" :key="column.prop" class="tvue-crud__column-panel__item">
          <el-checkbox :model-value="isVisible(column)" :aria-label="column.label"
                       @change="handleVisibleChange(column, $event)"/>
          <span class="tvue-crud__column-panel__drag" aria-hidden="true">⠿</span>
          <span class="tvue-crud__column-panel__label">{{ column.label }}</span>
          <div class="tvue-crud__column-panel__actions">
            <el-tooltip :content="t('crud.column.fixedLeft')" placement="top">
              <el-button text circle icon="el-icon-d-arrow-left" :class="{ 'is-active': isFixed(column, 'left') }"
                         :aria-label="t('crud.column.fixedLeft')" @click="handleFixedChange(column, 'left')"/>
            </el-tooltip>
            <el-tooltip :content="t('crud.column.fixedRight')" placement="top">
              <el-button text circle icon="el-icon-d-arrow-right" :class="{ 'is-active': isFixed(column, 'right') }"
                         :aria-label="t('crud.column.fixedRight')" @click="handleFixedChange(column, 'right')"/>
            </el-tooltip>
            <el-tooltip :content="t('crud.column.filters')" placement="top">
              <el-button text circle icon="el-icon-filter" :class="{ 'is-active': isLegacyEnabled(column, 'filters') }"
                         :aria-label="t('crud.column.filters')" @click="handleLegacyChange(column, 'filters')"/>
            </el-tooltip>
            <el-tooltip :content="t('crud.column.sortable')" placement="top">
              <el-button text circle icon="el-icon-sort" :class="{ 'is-active': isLegacyEnabled(column, 'sortable') }"
                         :aria-label="t('crud.column.sortable')" @click="handleLegacyChange(column, 'sortable')"/>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="tvue-crud__column-panel__footer">
        <el-button text :disabled="!crud.columnStateEnabled" @click="handleReset">
          {{ t("crud.column.restore") }}
        </el-button>
        <span class="tvue-crud__column-panel__footer-actions">
          <el-button text @click="handleCancel">{{ t("crud.column.cancel") }}</el-button>
          <el-button text type="primary" @click="handleConfirm">{{ t("crud.column.confirm") }}</el-button>
        </span>
      </div>
    </div>
  </el-popover>
</template>

<script>
import create from "core/create";
import locale from "core/locale";

export default create({
  name: "crud",
  mixins: [locale],
  inject: ["crud"],
  data() {
    return {
      data: [],
      columnBox: false,
      triggerRef: null,
      columnDraft: null,
      columnSortable: null,
    };
  },
  computed: {
    isAllVisible() {
      return (
        this.data.length > 0 &&
        this.data.every((column) => this.isVisible(column))
      );
    },
    isIndeterminate() {
      const visibleCount = this.data.filter((column) =>
        this.isVisible(column),
      ).length;
      return visibleCount > 0 && visibleCount < this.data.length;
    },
  },
  beforeUnmount() {
    this.destroySortable();
  },
  methods: {
    handleShow(triggerRef) {
      if (triggerRef) this.triggerRef = triggerRef;
      if (!this.triggerRef) return;
      this.destroySortable();
      this.data = this.crud.propOption.filter(
        (column) => column.showColumn !== false,
      );
      this.buildDraft();
      this.columnBox = true;
      this.$nextTick(() => this.rowDrop());
    },
    // 构建草稿：仅在此副本上操作，确认前不触碰真实元数据
    buildDraft() {
      const draft = {};
      this.data.forEach((column) => {
        const obj = this.crud.objectOption[column.prop] || {};
        draft[column.prop] = {
          hide: obj.hide,
          fixed: obj.fixed,
          filters: obj.filters,
          sortable: obj.sortable,
        };
      });
      this.columnDraft = draft;
    },
    // 优先读取草稿，草稿不存在时回退到真实元数据
    getDraft(prop) {
      if (this.columnDraft && Object.prototype.hasOwnProperty.call(this.columnDraft, prop)) {
        return this.columnDraft[prop];
      }
      const obj = this.crud.objectOption[prop] || {};
      return {
        hide: obj.hide,
        fixed: obj.fixed,
        filters: obj.filters,
        sortable: obj.sortable,
      };
    },
    isVisible(column) {
      return this.getDraft(column.prop).hide !== true;
    },
    isFixed(column, position) {
      const fixed = this.getDraft(column.prop).fixed;
      return position === "left"
        ? fixed === true || fixed === "left"
        : fixed === "right";
    },
    isLegacyEnabled(column, prop) {
      return this.getDraft(column.prop)[prop] === true;
    },
    handleCheckAll(visible) {
      this.data.forEach((column) => {
        this.columnDraft[column.prop].hide = !visible;
      });
    },
    // 只修改草稿，不写入元数据
    handleVisibleChange(column, visible) {
      this.columnDraft[column.prop].hide = !visible;
    },
    handleFixedChange(column, position) {
      const draft = this.columnDraft[column.prop];
      const current = draft.fixed;
      const isCurrent = position === "left"
        ? current === true || current === "left"
        : current === "right";
      draft.fixed = isCurrent ? false : position;
    },
    handleLegacyChange(column, prop) {
      const draft = this.columnDraft[column.prop];
      draft[prop] = !draft[prop];
    },
    // 确认时才把草稿写入真实元数据，并统一刷新与持久化一次
    handleConfirm() {
      this.applyDraft();
      this.columnBox = false;
    },
    // 取消：丢弃草稿，不修改元数据
    handleCancel() {
      this.columnDraft = null;
      this.columnBox = false;
    },
    // 面板关闭（含点击外部/ESC/确认后）：丢弃未确认的草稿
    handleHide() {
      this.columnDraft = null;
      this.destroySortable();
      this.data = [];
      this.triggerRef = null;
    },
    applyDraft() {
      if (!this.columnDraft) return;
      const props = Object.keys(this.columnDraft);
      let changed = false;
      let needRefresh = false;
      props.forEach((prop) => {
        const target = this.crud.objectOption[prop];
        if (!target) return;
        const d = this.columnDraft[prop];
        if (d.hide !== undefined && d.hide !== target.hide) {
          target.hide = d.hide;
          changed = true;
        }
        if (d.fixed !== undefined && d.fixed !== target.fixed) {
          target.fixed = d.fixed;
          changed = true;
        }
        if (d.filters !== undefined && d.filters !== target.filters) {
          target.filters = d.filters;
          changed = true;
          if (d.filters === true) needRefresh = true;
        }
        if (d.sortable !== undefined && d.sortable !== target.sortable) {
          target.sortable = d.sortable;
          changed = true;
        }
      });
      const orderChanged = this.applyOrder();
      if (orderChanged) changed = true;
      if (changed) {
        if (this.crud.gridShow || needRefresh || orderChanged) {
          this.crud.refreshTable(() => this.crud.doLayout());
        } else {
          this.crud.doLayout();
        }
        this.crud.saveColumnState("confirm");
      }
      this.columnDraft = null;
    },
    // 将面板中的拖拽顺序应用到真实列顺序（仅确认时执行）
    applyOrder() {
      if (!this.data || this.data.length === 0) return false;
      const dataProps = this.data.map((c) => c.prop);
      const allColumns = this.crud.tableOption.column || [];
      const byProp = {};
      allColumns.forEach((c) => {
        byProp[c.prop] = c;
      });
      const dataSet = new Set(dataProps);
      const ordered = dataProps.map((p) => byProp[p]).filter(Boolean);
      const rest = allColumns.filter((c) => !dataSet.has(c.prop));
      const newOrder = [...ordered, ...rest];
      let changed = false;
      for (let i = 0; i < newOrder.length; i++) {
        if (newOrder[i] !== allColumns[i]) {
          changed = true;
          break;
        }
      }
      if (changed) {
        this.crud.tableOption.column = newOrder;
      }
      return changed;
    },
    handleReset() {
      if (!this.crud.columnStateEnabled) return;
      this.crud.resetColumnState(() => {
        this.data = this.crud.propOption.filter(
          (column) => column.showColumn !== false,
        );
        // 重置后基于最新元数据重建草稿，避免确认时把旧改动覆盖回去
        this.buildDraft();
        this.$nextTick(() => this.rowDrop());
      });
    },
    destroySortable() {
      if (this.columnSortable) this.columnSortable.destroy();
      this.columnSortable = null;
    },
    rowDrop() {
      if (!this.$refs.list) return;
      this.destroySortable();
      this.columnSortable = this.crud.tableDrop(
        "column",
        this.$refs.list,
        (evt) => {
          const oldIndex = evt.oldIndex;
          const newIndex = evt.newIndex;
          if (oldIndex === newIndex) return;
          const column = this.data.splice(oldIndex, 1)[0];
          this.data.splice(newIndex, 0, column);
          // 拖拽顺序仅在确认时通过 applyOrder 写入真实元数据
        },
      );
    },
  },
});
</script>
