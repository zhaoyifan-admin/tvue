<template></template>

<script>
export default {
  props: {
    className: String,
    labelClassName: String,
    showOverflowTooltip: Boolean,
    gridRow: Boolean,
    prop: String,
    type: String,
    label: String,
  },
  computed: {
    parent() {
      let parent = this.$parent;
      while (parent.$parent && !parent.id) {
        parent = parent.$parent;
      }
      return parent;
    },
  },
  mounted() {
    this.parent.column.push({
      className: this.className,
      labelClassName: this.labelClassName,
      showOverflowTooltip: this.showOverflowTooltip,
      row: this.gridRow,
      label: this.label,
      prop: this.prop,
      type: this.type,
      header: this.$slots.header,
      default: this.$slots.default,
    });
  },
};
</script>

<style></style>
