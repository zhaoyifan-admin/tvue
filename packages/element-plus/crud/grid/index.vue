<template>
  <div :class="b()"
       :style="styleName">
    <div :class="b('hide')">
      <slot></slot>
    </div>
    <el-checkbox-group v-if="data.length!==0"
                       v-model="checkList"
                       @change="checkListChange">
      <el-row>
        <el-col v-for="(row,index) in data"
                @click.stop="handleRowClick(row,index)"
                @dblclick.stop="handleRowDblClick(row,index)"
                :span="crud.tableOption.gridSpan || span"
                :md="crud.tableOption.gridSpan|| span"
                :sm="crud.tableOption.gridSpan|| span"
                :xs="crud.tableOption.gridXsSpan|| xsSpan"
                :class="getRowClass(row,index)"
                :key="index">
          <div :class="b('content')"
               :style="[getGradientColor(row,index),getRowStyle(row,index)]">
            <div v-for="(item,columnIndex) in column"
                 :class="[b('item'),(item.type || item.prop),getClass(row,index,item)]"
                 :style="getCellStyle(row,index,item,columnIndex)"
                 @click.stop="handleCellClick(row,item)"
                 @dblclick.stop="handleCellDblClick(row,item)"
                 :key="columnIndex">
              <span v-if="item.type=='selection'">
                <el-checkbox :value="index"
                             :disabled="isDisabled(row, index)"
                             @click.stop>&nbsp;</el-checkbox>
              </span>
              <template v-else>
                <template v-for="(comp,compIndex) in item.header && item.header({row:row,$index:index,column:item})"
                          :key="compIndex">
                  <component :class="[b('label'),item.labelClassName]"
                             :is="comp"></component>
                </template>
                <template v-for="(comp,compIndex) in item.default &&item.default({row:row,$index:index,column:item})"
                          :key="compIndex">
                  <component placement="top"
                             :is="(item.overHidden||item.showOverflowTooltip)?'elTooltip':'div'"
                             :class="[b('value'),item.className]"
                             :content="row[item.prop]">
                    <component :is="comp"></component>
                  </component>
                </template>
              </template>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-checkbox-group>
    <template v-else>
      <slot name="empty"
            v-if="$slots.empty"></slot>
      <el-empty v-else
                :image-size="100"
                :description="crud.tableOption.emptyText || t('crud.emptyText')"></el-empty>
    </template>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
export default create({
  name: 'crud__grid',
  inject: ["crud"],
  mixins: [locale],
  props: {
    rowStyle: Function,
    cellStyle: Function,
    cellClassName: Function,
    rowClassName: Function,
    height: [String, Number],
    data: Array
  },
  data () {
    return {
      checkList: [],
      span: 8,
      xsSpan: 12,
      id: 'crud-grid',
      column: []
    }
  },
  computed: {
    styleName () {
      return {
        height: this.crud.tableHeight + 'px'
      }
    }
  },
  methods: {
    doLayout () {

    },
    isDisabled(row, index) {
      return typeof this.crud.tableOption.selectable === 'function'
        ? !this.crud.tableOption.selectable(row, index)
        : false
    },
    clearSelection () {
      this.checkList = []
      this.checkListChange(this.checkList)
    },
    toggleAllSelection () {
      if (this.checkList.length === this.crud.data.length) {
        this.checkList = []
      } else {
        this.checkList = this.crud.data.map((ele, index) => index)
      }
      this.checkListChange(this.checkList)
    },
    toggleRowSelection (data, selected) {
      let index = this.crud.data.findIndex(ele => JSON.stringify(ele) == JSON.stringify(data))
      if (selected && index != -1) {
        this.checkList.push(index)
      } else {
        let checkIndex = this.checkList.findIndex(ele => ele == index);
        this.checkList.splice(checkIndex, 1)
      }
      this.checkListChange(this.checkList)
    },
    checkListChange (val) {
      let result = [];
      const data = this.crud.data
      val.forEach(ele => {
        result.push(data[ele])
      });
      this.$emit('selection-change', result)
    },
    handleRowDblClick (row, index) {
      this.$emit('row-dblclick', row, index)
    },
    handleRowClick (row, index) {
      this.$emit('row-click', row, index)
    },
    handleCellDblClick (row, column) {
      this.$emit('cell-dblclick', row, column)
    },
    handleCellClick (row, column) {
      this.$emit('cell-click', row, column)
    },
    getGradientColor (row, index) {
      let styles = {}
      if (typeof this.crud.tableOption.gridBackground == 'function') {
        styles.background = this.crud.tableOption.gridBackground(row, index)
      } else if (this.crud.tableOption.gridBackgroundImage) {
        styles.backgroundImage = `url(${this.crud.tableOption.gridBackgroundImage})`
      } else {
        styles.background = this.crud.tableOption.gridBackground || 'linear-gradient(to bottom, rgba(88, 159, 248, 0.1), white)'
      }
      return styles
    },
    getCellStyle (row, index, column, columnIndex) {
      if (this.cellStyle) return this.cellStyle({ row, rowIndex: index, column, columnIndex })
    },
    getRowStyle (row, index) {
      if (this.rowStyle) return this.rowStyle({ row, rowIndex: index })
    },
    getRowClass (row, index) {
      if (this.rowClassName) return this.rowClassName({ row, rowIndex: index });
    },
    getClass (row, index, column) {
      let list = []
      let firstIndex = this.crud.columnOption.findIndex(item => item.hide !== true)
      const columnOption = this.crud.columnOption || []
      if (this.cellClassName) list.push(this.cellClassName({ row, rowIndex: index, column }))
      if (column.prop == (columnOption[firstIndex || 0] || {}).prop) list.push('title')
      if (column.row) list.push('row')
      if (column.showOverflowTooltip) list.push('overHidden')
      return list;
    }
  }
})
</script>
