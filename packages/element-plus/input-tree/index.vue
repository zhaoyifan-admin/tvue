<template>
  <el-tree-select ref="tree"
                  :class="b()"
                  :cache-data="cacheData"
                  v-model="text"
                  :loading="loading"
                  :lazy="lazy"
                  :load="handleLoad"
                  :size="size"
                  @check="checkChange"
                  :filter-node-method="filterNodeMethod"
                  :render-after-expand="false"
                  :loading-text="loadingText"
                  :collapse-tags="tags"
                  :clearable="clearableVal"
                  :placeholder="placeholder"
                  :popper-class="popperClass"
                  :popper-append-to-body="popperAppendToBody"
                  :multiple="multiple"
                  :node-key="valueKey"
                  :show-checkbox="multiple"
                  :filterable="filterable"
                  :check-strictly="checkStrictly"
                  :disabled="disabled"
                  :accordion="accordion"
                  :icon-class="iconClass"
                  :indent="indent"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  :check-on-click-leaf="checkOnClickLeaf"
                  :default-checked-keys="keysList"
                  :default-expanded-keys="defaultExpandedKeys?defaultExpandedKeys:keysList"
                  :default-expand-all="defaultExpandAll"
                  :check-on-click-node="checkOnClickNode"
                  :expand-on-click-node="expandOnClickNode"
                  @node-click.self="handleNodeClick"
                  :props="treeProps"
                  :data="netDic">
    <template #="{data,node}">
      <slot v-if="$slots.default"
            :label="labelKey"
            :value="valueKey"
            :node="node"
            :item="data"></slot>
      <span v-else
            style="margin-left:8px;">
        <span>{{getLabelText(data)}}</span>
        <span :class="b('desc')"
              v-if="data[descKey]">{{ data[descKey] }}</span>
      </span>
    </template>
  </el-tree-select>
</template>

<script>
import create from "core/create";
import props from "common/common/props";
import event from "common/common/event";
import { DIC_PROPS } from 'global/variable';
import { cloneModel } from 'core/model';
import { findNode } from 'utils/util';
export default create({
  name: "input-tree",
  mixins: [props(), event()],
  data () {
    return {
      netDic: [],
      loading: false,
      lazyRevision: 0,
      lazyUnmounted: false,
    };
  },
  props: {
    cacheData: [Object, Array],
    indent: Number,
    filterNodeMethod: Function,
    nodeClick: Function,
    treeLoad: Function,
    checked: Function,
    modelValue: {},
    loadingText: {
      type: String,
    },
    lazy: {
      type: Boolean,
      default: false
    },
    leafOnly: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 0
    },
    checkOnClickLeaf: Boolean,
    filterable: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: (props) => props.multiple ? false : true
    },
    accordion: {
      type: Boolean,
      default: false
    },
    parent: {
      type: Boolean,
      default: true
    },
    iconClass: {
      type: String,
    },
    defaultExpandedKeys: Array,
    checkOnClickNode: Boolean,
    expandOnClickNode: Boolean,
    defaultExpandAll: Boolean,
    popperAppendToBody: Boolean,
  },
  watch: {
    dic: {
      handler (val) {
        this.lazyRevision++;
        this.netDic = cloneModel(Array.isArray(val) ? val : []);
      },
      immediate: true,
      deep: true
    },
  },
  computed: {
    keysList () {
      return this.multiple ? this.text : [this.text ?? '']
    },
    treeProps () {
      const disabled = this.props.disabled || DIC_PROPS.disabled;
      return Object.assign(this.deepClone(DIC_PROPS), this.props, {
        isLeaf: this.leafKey,
        disabled: (data, node) => {
          const original = typeof disabled === 'function' ? disabled(data, node) : data[disabled];
          const children = data[this.childrenKey];
          const isParent = (Array.isArray(children) && children.length > 0) ||
            data[this.leafKey] === false || (node && node.isLeaf === false);
          return Boolean(original || (!this.parent && isParent));
        }
      })
    }
  },
  beforeUnmount () {
    this.lazyUnmounted = true;
    this.lazyRevision++;
  },
  methods: {
    getDicData () {
      return this.netDic;
    },
    getHalfList () {
      let list = this.$refs.tree.getCheckedNodes(false, true)
      list = list.map(ele => ele[this.valueKey])
      return list;
    },
    checkChange (checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      if (typeof this.checked === "function") this.checked(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys);
    },
    handleNodeClick (data, node, nodeComp) {
      if (typeof this.nodeClick === "function") this.nodeClick(data, node, nodeComp);
    },
    handleLoad (node, resolve) {
      const revision = this.lazyRevision;
      let settled = false;
      const callback = (list) => {
        if (settled) return;
        settled = true;
        const children = cloneModel(Array.isArray(list) ? list : []);
        this.$nextTick(() => {
          if (this.lazyUnmounted || revision !== this.lazyRevision) return;
          if (node.level === 0) {
            this.netDic = children;
          } else {
            const target = findNode(this.netDic, this.props, node.key);
            if (target) target[this.childrenKey] = children;
          }
          resolve(children);
        });
      }
      this.treeLoad && this.treeLoad(node, callback)
    }
  }
});
</script>
