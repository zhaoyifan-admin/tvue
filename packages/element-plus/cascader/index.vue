<template>
  <el-cascader
    ref="cascader"
    :options="netDic"
    :class="b()"
    @click="handleClick"
    v-model="text"
    :placeholder="placeholder"
    :props="allProps"
    :size="size"
    :effect="effect"
    :virtual-scroll="virtualScroll"
    :fit-input-width="fitInputWidth"
    :height="height"
    :item-size="itemSize"
    :clearable="clearableVal"
    :show-all-levels="showAllLevels"
    :filterable="filterable"
    :popper-class="popperClass"
    :separator="separator"
    :disabled="disabled"
    :show-checked-strategy="showCheckedStrategy"
    :collapse-tags="tags || collapseTags"
    :collapse-tags-tooltip="collapseTagsTooltip"
    :max-collapse-tags="maxCollapseTags"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <template #="{ data, node }">
      <slot v-if="$slots.default" :data="data" :node="node"></slot>
      <span v-else>{{ data[labelKey] }}</span>
    </template>
  </el-cascader>
</template>

<script>
import create from "core/create";
import props from "common/common/props";
import event from "common/common/event";
import { cloneModel } from "core/model";
import { findNode } from "utils/util";
export default create({
  name: "cascader",
  mixins: [props(), event()],
  data() {
    return { netDic: [], lazyRevision: 0, lazyUnmounted: false };
  },
  props: {
    clearValidate: Function,
    effect: {
      type: String,
      default: "light",
    },
    virtualScroll: {
      type: Boolean,
      default: undefined,
    },
    fitInputWidth: {
      type: Boolean,
      default: undefined,
    },
    height: Number,
    itemSize: Number,
    showCheckedStrategy: String,
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    emitPath: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: Boolean,
      default: false,
    },
    collapseTags: Boolean,
    collapseTagsTooltip: Boolean,
    maxCollapseTags: Number,
    expandTrigger: {
      type: String,
      default: "hover",
    },
    showAllLevels: {
      type: Boolean,
      default: true,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    lazyLoad: Function,
    filterable: {
      type: Boolean,
      default: false,
    },
    separator: {
      type: String,
    },
  },
  watch: {
    dic: {
      handler(value) {
        this.lazyRevision++;
        this.netDic = cloneModel(Array.isArray(value) ? value : []);
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    allProps() {
      return {
        label: this.labelKey,
        value: this.valueKey,
        disabled: this.disabledKey,
        children: this.childrenKey,
        checkStrictly: this.checkStrictly,
        multiple: this.multiple,
        emitPath: this.emitPath,
        hoverThreshold: this.props.hoverThreshold,
        leaf: this.leafKey,
        lazy: this.lazy,
        lazyLoad: (node, resolve) => {
          const revision = this.lazyRevision;
          let settled = false;
          const callback = (list) => {
            if (settled) return;
            settled = true;
            const children = cloneModel(Array.isArray(list) ? list : []);
            this.$nextTick(() => {
              if (this.lazyUnmounted || revision !== this.lazyRevision) return;
              if (node.root || node.level === 0) {
                this.netDic = children;
              } else {
                const target = findNode(this.netDic, this.props, node.value);
                if (target) target[this.childrenKey] = children;
              }
              resolve(children);
            });
          };
          this.lazyLoad && this.lazyLoad(node, callback);
        },
        expandTrigger: this.expandTrigger,
      };
    },
  },
  created() {},
  mounted() {},
  beforeUnmount() {
    this.lazyUnmounted = true;
    this.lazyRevision++;
  },
  methods: {
    getDicData() {
      return this.netDic;
    },
    getCheckedNodes(leafOnly = false) {
      return this.$refs.cascader.getCheckedNodes(leafOnly);
    },
  },
});
</script>
