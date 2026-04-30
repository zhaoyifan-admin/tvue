<template>
  <!-- 折叠面板  -->
  <component :is="crud.tableColumnName"
             v-if="crud.tableOption.expand"
             type="expand"
             :class-name="crud.tableOption.expandClassName"
             :width="crud.tableOption.expandWidth || config.expandWidth"
             :fixed="validData(crud.tableOption.expandFixed,config.expandFixed)">
    <template #default="{record}">
      <slot :row="record"
            :index="record.$index"
            name="expand"></slot>
    </template>
  </component>

  <!-- 选择框 -->
  <component :is="crud.tableColumnName"
             v-if="crud.tableOption.selection"
             type="checkbox"
             :class-name="crud.tableOption.selectionClassName"
             :width="crud.tableOption.selectionWidth || config.selectionWidth"
             :fixed="validData(crud.tableOption.selectionFixed,config.selectionFixed)"
             @change="handleSelectionChange"></component>

  <!-- 序号 -->
  <component :is="crud.tableColumnName"
             v-if="validData(crud.tableOption.index)"
             :title="crud.tableOption.indexLabel || config.indexLabel"
             :class-name="crud.tableOption.indexClassName"
             :width="crud.tableOption.indexWidth || config.indexWidth"
             :custom-render="({ index }) => indexMethod(index)"
             :fixed="validData(crud.tableOption.indexFixed,config.indexFixed)">
  </component>
</template>

<script>

import create from "core/create";
import locale from "core/locale";
import config from "../config";
import tableItemCard from '../grid/item'
export default create({
  name: "crud",
  data () {
    return {
      config: config,
      rowSortable: null,
      columnSortable: null,
    }
  },
  components: {
    tableItemCard
  },
  mixins: [locale],
  inject: ["crud"],
  watch: {
    'crud.isSortable' (val) {
      this.rowDrop(val)
      this.columnDrop(val)
    },
    'crud.isRowSort' (val) {
      this.rowDrop(val)
    },
    'crud.isColumnSort' (val) {
      this.columnDrop(val)
    }
  },
  mounted () {
    this.rowDrop()
    this.columnDrop()
  },
  methods: {
    handleSelectionChange(selected, record, selectedRows) {
      if (selected) {
        this.crud.$refs.table.toggleRowSelection(record, true);
      }
    },
    indexMethod (index) {
      return (
        index +
        1 +
        ((this.crud.page.currentPage || 1) - 1) *
        (this.crud.page.pageSize || 10)
      );
    },
    rowDrop (flag) {
      this.$nextTick(() => {
        if (flag == false) {
          this.rowSortable && this.rowSortable.destroy();
          return
        }
        const tableRef = this.crud.$refs.table
        if (!tableRef || !tableRef.$el) return
        const el = tableRef.$el.querySelectorAll(this.config.dropRowClass)[0]
        if (!el) return
        this.rowSortable = this.crud.tableDrop('row', el, evt => {
          const oldIndex = evt.oldIndex;
          const newIndex = evt.newIndex;
          this.crud.$emit('sortable-change', oldIndex, newIndex)
        })
      })
    },
    columnDrop (flag) {
      this.$nextTick(() => {
        if (flag == false) {
          this.columnSortable && this.columnSortable.destroy();
          return
        }
        const tableRef = this.crud.$refs.table
        if (!tableRef || !tableRef.$el) return
        const el = tableRef.$el.querySelector(this.config.dropColClass);
        if (!el) return
        let noIndexCount = 0;
        ['selection', 'index', 'expand'].forEach(ele => {
          if (this.crud.tableOption[ele]) { noIndexCount += 1 }
        })
        this.columnSortable = this.crud.tableDrop('column', el, evt => {
          const newIndex = evt.newIndex - noIndexCount
          const oldIndex = evt.oldIndex - noIndexCount
          this.crud.headerSort(oldIndex, newIndex)
          this.crud.$emit('column-sortable-change', oldIndex, newIndex)
        })
      })
    },

  }
})
</script>
