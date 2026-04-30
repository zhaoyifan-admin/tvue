<template>
  <component
    :is="crud.tableColumnName"
    v-if="getColumnProp(column, 'hide')"
    :key="column.prop"
    :data-index="column.prop"
    :grid-row="column.gridRow"
    :title="column.label"
    :class-name="column.className"
    :filters="getColumnProp(column, 'filters')"
    :filter-search="column.filterSearch"
    :filtered="column.filteredValue"
    :on-filter="
      column.filters
        ? (value, record) =>
            getColumnProp(columnOption, 'filterMethod', { value, row: record, column })
        : undefined
    "
    :filter-multiple="validData(column.filterMultiple, true)"
    :ellipsis="column.showOverflowTooltip || column.overHidden ? { showTitle: true } : false"
    :min-width="column.minWidth"
    :sorter="getColumnProp(column, 'sortable')"
    :custom-sorter="column.sortMethod"
    :resizable="column.resizable"
    :align="column.align || crud.tableOption.align"
    :width="getColumnProp(column, 'width')"
    :fixed="getColumnProp(column, 'fixed')"
  >
    <template #header>
      <slot
        :name="crud.getSlotName(column, 'H')"
        v-if="crud.getSlotName(column, 'H', crud.$slots)"
        v-bind="{ column, $index: 0 }"
      ></slot>
      <span v-else>{{ column.label }}</span>
    </template>
    <template #default="slotProps">
      <template v-if="slotProps && slotProps.record">
        <a-form-item
          :name="crud.isTree ? '' : ['list', slotProps.index, column.prop]"
          v-if="slotProps.record.$cellEdit && column.cell"
          :rules="column.rules"
        >
          <a-tooltip
            :title="(crud.listError[`list.${slotProps.index}.${column.prop}`] || {}).msg"
            :open="
              (crud.listError[`list.${slotProps.index}.${column.prop}`] || {}).valid
            "
            placement="top"
          >
            <div>
              <slot
                v-bind="{
                  row: slotProps.record,
                  tableColumn: slotProps.column,
                  column: column,
                  dic: crud.DIC[column.prop],
                  size: crud.size,
                  index: slotProps.index,
                  disabled: crud.btnDisabledList[slotProps.index],
                  label: handleDetail(slotProps.record, column),
                  $cell: slotProps.record.$cellEdit,
                }"
                :name="crud.getSlotName(column, 'F')"
                v-if="crud.getSlotName(column, 'F', crud.$slots)"
              ></slot>
              <form-temp
                v-else
                :column="column"
                :size="crud.size"
                :index="slotProps.index"
                :row="slotProps.record"
                :prop="`list.${slotProps.index}.${column.prop}`"
                :clearValidate="crud.clearValidate"
                :render="column.renderForm"
                :table-data="{
                  index: slotProps.index,
                  row: slotProps.record,
                  label: handleDetail(slotProps.record, column),
                }"
                :dic="
                  (crud.cascaderDIC[slotProps.index] || {})[column.prop] ||
                  crud.DIC[column.prop]
                "
                :props="column.props || crud.tableOption.props"
                :readonly="column.readonly"
                :disabled="
                  crud.disabled ||
                  crud.tableOption.disabled ||
                  column.disabled ||
                  crud.btnDisabledList[slotProps.index]
                "
                :clearable="validData(column.clearable, false)"
                v-bind="$uploadFun(column, crud)"
                v-model="slotProps.record[column.prop]"
                :column-slot="crud.mainSlot"
                @change="columnChange(slotProps.record, column, slotProps.index)"
              >
                <template v-for="item in crud.mainSlot" #[item]="scope">
                  <slot v-bind="scope" :name="item"></slot>
                </template>
              </form-temp>
            </div>
          </a-tooltip>
        </a-form-item>
        <custom
          v-else-if="column.render"
          :column="column"
          :row="slotProps.record"
          :index="slotProps.index"
          :render="column.render"
          :event="column.event"
          :params="column.params"
        ></custom>
        <slot
          :row="slotProps.record"
          :tableColumn="slotProps.column"
          :column="column"
          :index="slotProps.index"
          :dic="crud.DIC[column.prop]"
          :size="crud.size"
          :label="handleDetail(slotProps.record, column)"
          :name="column.prop"
          v-else-if="crud.$slots[column.prop]"
        ></slot>
        <template v-else>
          <span
            v-if="['img', 'upload'].includes(column.type)"
            class="tvue-crud__img"
          >
            <template
              v-for="(item, index) in getImgList(slotProps.record, column)"
              :key="index"
            >
              <component
                :src="item"
                v-if="isMediaType(item, column.fileType)"
                :is="isMediaType(item, column.fileType)"
                @click.stop="openImg(slotProps.record, column, index)"
              ></component>
              <FileOutlined v-else @click.stop="openImg(slotProps.record, column, index)" />
            </template>
          </span>
          <a
            v-else-if="'url' === column.type"
            v-for="(item, index) in corArray(slotProps.record, column)"
            :key="index"
            :href="item"
            :target="column.target || '_blank'"
          >{{ item }}</a
          >
          <tvue-ant-rate
            disabled
            v-else-if="'rate' === column.type"
            v-model:value="slotProps.record[column.prop]"
          ></tvue-ant-rate>
          <i
            v-else-if="'color' === column.type"
            class="tvue-crud__color"
            :style="{ backgroundColor: slotProps.record[column.prop] }"
          ></i>
          <icon-temp
            v-else-if="'icon' === column.type"
            :text="slotProps.record[column.prop]"
          ></icon-temp>
          <span v-else-if="column.html" v-html="handleDetail(slotProps.record, column)"></span>
          <span
            v-else
            :class="{ 'tvue-crud__ellipsis': column.ellipsis }"
            :title="column.ellipsis ? handleDetail(slotProps.record, column) : ''"
            v-text="handleDetail(slotProps.record, column)"
          ></span>
        </template>
      </template>
    </template>
  </component>
</template>

<script>
let count = {};
import { detail } from "core/detail";
import { DIC_PROPS, DIC_SHOW_SPLIT, DIC_SPLIT } from "global/variable";
import { sendDic } from "core/dic";
import { isMediaType, blankVal } from "utils/util";
import custom from "common/components/form/custom";
import formTemp from "common/components/form/index";
import iconTemp from "common/components/icon/index";
import tableItemCard from "../grid/item";
import { FileOutlined } from '@ant-design/icons-vue';

export default {
  name: "column-slot",
  inject: ["dynamic", "crud"],
  components: {
    custom,
    tableItemCard,
    formTemp,
    iconTemp,
    FileOutlined
  },
  props: {
    column: Object,
    columnOption: Array,
  },
  created() {
    const list = ["getColumnProp"];
    list.forEach((ele) => {
      if (this.dynamic) this[ele] = this.dynamic[ele];
    });
  },
  methods: {
    isMediaType(item, fileType) {
      return isMediaType(item, fileType);
    },
    validLabel(column, row, val) {
      if (column.rules && row.$cellEdit) {
        return val;
      }
    },
    columnChange(row, column, index) {
      let key = `${index}-${column.prop}`;
      if (!count[key]) {
        this.handleChange(column, row);
        if (typeof column.change === "function" && column.cell == true) {
          column.change({ row, column, index, value: row[column.prop] });
        }
      }
      count[key] = true;
      this.$nextTick(() => (count[key] = false));
    },
    handleChange(column, row) {
      if (!column.cascader) return;
      this.$nextTick(() => {
        const columnOption = [...this.crud.propOption];
        const cascader = column.cascader;
        const str = cascader.join(",");
        cascader.forEach((item) => {
          const columnNextProp = item;
          const value = row[column.prop];
          const rowIndex = row.$index;
          const columnNext = this.findObject(this.columnOption, columnNextProp);
          if (this.validatenull(columnNext)) return;
          if (this.validatenull(this.crud.cascaderDIC[rowIndex])) {
            this.crud.cascaderDIC[rowIndex] = {};
          }
          if (this.crud.cascaderIndexList.includes(rowIndex)) {
            cascader.forEach((ele) => {
              this.crud.cascaderDIC[rowIndex][ele] = [];
              cascader.forEach((ele) => {
                row[ele] = blankVal(row[ele]);
              });
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
              form: row,
            },
            this
          ).then((res) => {
            const dic = res || [];
            if (!this.crud.cascaderIndexList.includes(rowIndex)) {
              this.crud.cascaderIndexList.push(rowIndex);
            }
            if (!this.crud.cascaderDicList[rowIndex]) {
              this.crud.cascaderDicList[rowIndex] = {};
            }
            if (!this.crud.cascaderDicList[rowIndex][columnNextProp]) {
              this.crud.cascaderDicList[rowIndex][columnNextProp] = dic;
            }
            this.crud.cascaderDIC[rowIndex][columnNextProp] = dic;

            if (
              !this.validatenull(dic[columnNext.cascaderIndex]) &&
              !this.validatenull(dic) &&
              !this.validatenull(columnNext.cascaderIndex)
            ) {
              row[columnNextProp] =
                dic[columnNext.cascaderIndex][
                (columnNext.props || {}).value || DIC_PROPS.value
                  ];
            }
          });
        });
      });
    },
    handleDetail(row, column) {
      let result;
      let DIC = column.parentProp
        ? (this.crud.cascaderDIC[row.$index] || {})[column.prop]
        : this.crud.DIC[column.prop];
      result = detail(row, column, this.crud.tableOption, DIC);
      if (!this.validatenull(DIC) && this.crud.tableOption.filterDic != true) {
        row["$" + column.prop] = result;
      }
      return result;
    },
    corArray(row, column) {
      let list = this.handleDetail(row, column);
      if (!Array.isArray(list)) {
        list = this.validatenull(list) ? [] : list.split(DIC_SHOW_SPLIT);
      }
      return this.deepClone(list);
    },
    openImg(row, column, index) {
      let list = this.getImgList(row, column);
      list = list.map((ele) => {
        return { thumbUrl: ele, url: ele, type: column.fileType };
      });
      this.$ImagePreview(list, index);
    },
    getImgList(row, column) {
      let url = column.propsHttp?.home || "";
      let value = column.props?.value || DIC_PROPS.value;
      let list = this.corArray(row, column);
      list.forEach((ele, index) => {
        list[index] = url + (ele[value] ? ele[value] : ele);
      });
      return list;
    },
  },
};
</script>

<style></style>
