<template>
  <a-drawer v-if="columnBox"
            :get-container="false"
            :class="['tvue-dialog',b('column')].join(' ')"
            :title="t('crud.showTitle')"
            :width="crud.isMobile?'100%':'40%'"
            :open="columnBox"
            @close="columnBox = false">
    <a-table :data-source="data"
             ref="table"
             :scroll="{ y: '100%' }"
             :size="crud.size"
             :bordered="true"
             :pagination="false"
             row-key="prop">
      <a-table-column align="center"
                      width="100"
                      data-index="label"
                      key="label"
                      :title="t('crud.column.name')">
      </a-table-column>
      <template v-for="(item,index) in defaultColumn"
                :key="item.prop">
        <a-table-column :title="item.label"
                        v-if="item.hide!==true"
                        :data-index="item.prop"
                        align="center">
          <template #default="{record}">
            <a-checkbox @change="handleChange(item.prop)"
                        v-model:checked="crud.objectOption[record.prop][item.prop]"></a-checkbox>
          </template>
        </a-table-column>
      </template>

    </a-table>

  </a-drawer>
</template>
<script>
import create from "core/create";
import locale from "core/locale";
import packages from "core/packages";
import config from "../config";
export default create({
  name: 'crud',
  mixins: [locale],
  inject: ["crud"],
  data () {
    return {
      data: [],
      columnBox: false
    };
  },
  computed: {
    defaultColumn () {
      return [{
        label: this.t('crud.column.hide'),
        prop: 'hide'
      }, {
        label: this.t('crud.column.fixed'),
        prop: 'fixed'
      }, {
        label: this.t('crud.column.filters'),
        prop: 'filters'
      }, {
        label: this.t('crud.column.sortable'),
        prop: 'sortable'
      }, {
        label: this.t('crud.column.width'),
        prop: 'width',
        hide: true
      }]
    }
  },
  methods: {
    handleShow () {
      this.data = []
      this.crud.propOption.forEach(column => {
        if (column.showColumn != false) this.data.push(column)
      })
      this.columnBox = true
      this.$nextTick(() => this.rowDrop())
    },
    handleChange (prop) {
      if (prop === 'hide') {
        this.crud.gridShow ? this.crud.refreshTable() : this.crud.doLayout()
      } else if (prop === 'filters') {
        this.crud.refreshTable()
      }
    },
    rowDrop () {
      const el = this.$refs.table.$el.querySelectorAll(config.dropRowClass)[0]
      this.crud.tableDrop('column', el, evt => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;
        this.crud.headerSort(oldIndex, newIndex)
      })
    },
  }
});
</script>
