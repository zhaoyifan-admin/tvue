<template>
  <component
    :is="crud.tableColumnName"
    v-if="getColumnProp(columnOption, 'hide')"
    :data-index="columnOption.prop"
    :title="columnOption.label"
    :class-name="columnOption.className"
    :filters="getColumnProp(columnOption, 'filters')"
    :filter-search="columnOption.filterSearch"
    :filtered="getColumnProp(columnOption, 'filtered')"
    :on-filter="
      columnOption.filters
        ? (value, record) =>
            getColumnProp(columnOption, 'filterMethod', {
              value,
              row: record,
              column: columnOption,
            })
        : undefined
    "
    :filter-multiple="validData(columnOption.filterMultiple, true)"
    :ellipsis="columnOption.showOverflowTooltip || columnOption.overHidden ? { showTitle: true } : false"
    :min-width="columnOption.minWidth"
    :sorter="getColumnProp(columnOption, 'sortable')"
    :align="columnOption.align || crud.tableOption.align"
    :width="getColumnProp(columnOption, 'width')"
    :fixed="getColumnProp(columnOption, 'fixed')"
  >
    <template #header>
      <slot
        :name="crud.getSlotName(columnOption, 'H')"
        v-if="crud.getSlotName(columnOption, 'H', crud.$slots)"
        v-bind="{ column: columnOption, $index: 0 }"
      ></slot>
      <span v-else>{{ columnOption.label }}</span>
    </template>
    <template v-for="column in columnOption.children">
      <column-dynamic
        v-if="column.children && column.children.length > 0"
        :key="column.label"
        :columnOption="column"
      >
        <template v-for="item in crud.mainSlot" #[item]="scope">
          <slot v-bind="scope" :name="item"></slot>
        </template>
      </column-dynamic>
      <column-slot
        v-else
        :key="column.prop"
        :column="column"
        :column-option="columnOption.children"
      >
        <template v-for="item in crud.mainSlot" #[item]="scope">
          <slot v-bind="scope" :name="item"></slot>
        </template>
      </column-slot>
    </template>
  </component>
</template>

<script>
import columnSlot from "./column-slot";
import tableItemCard from "../grid/item";
export default {
  name: "column-dynamic",
  components: {
    columnSlot,
    tableItemCard,
  },
  inject: ["dynamic", "crud"],
  props: {
    columnOption: Object,
  },
  created() {
    const list = ["getColumnProp"];
    list.forEach((ele) => {
      if (this.dynamic) this[ele] = this.dynamic[ele];
    });
  },
};
</script>
