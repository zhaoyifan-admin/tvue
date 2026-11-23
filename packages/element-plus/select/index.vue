<template>
  <component
    :is="componentName"
    ref="main"
    :class="b()"
    v-model="text"
    :size="size"
    :options="netDic"
    :props="props"
    :loading="loading"
    :loading-text="loadingText"
    :value-on-clear="valueOnClear"
    :multiple="multiple"
    :filterable="remote ? true : filterable"
    :remote="remote"
    :readonly="readonly"
    :no-match-text="noMatchText"
    :no-data-text="noDataText"
    :remote-method="remote ? handleRemoteMethod : undefined"
    :popper-class="popperClass"
    :popper-append-to-body="popperAppendToBody"
    :collapse-tags="tags || collapseTags"
    :collapse-tags-tooltip="collapseTagsTooltip"
    :max-collapse-tags="maxCollapseTags"
    :clearable="clearableVal"
    :placeholder="placeholder"
    @focus="handleFocus"
    @blur="handleBlur"
    @click="handleClick"
    @remove-tag="handleremoveTag"
    @end-reached="handleEndReached"
    :multiple-limit="limit"
    :allow-create="allowCreate"
    :default-first-option="defaultFirstOption"
    :disabled="disabled"
  >
    <template #="scope">
      <template v-if="virtualize">
        <slot
          :label="labelKey"
          :value="valueKey"
          :item="scope.item"
          v-if="$slots.default"
        >
        </slot>
        <template v-else>
          <span>{{ getLabelText(scope.item) }}</span>
          <span v-if="scope.item[descKey]" :class="b('desc')">{{
              scope.item[descKey]
            }}</span>
        </template>
      </template>
      <template v-else>
        <div :class="b('check')" v-if="all && multiple">
          <el-checkbox v-model="checked" :disabled="disabled" :indeterminate="indeterminate" @change="checkChange">
            {{ t('check.checkAll') }}
          </el-checkbox>
        </div>
        <template v-if="isGroup">
          <el-option-group
            v-for="(item, index) in netDic"
            :key="index"
            :label="getLabelText(item)"
            :disabled="item[disabledKey]"
          >
            <el-option
              v-for="citem in item[groupsKey]"
              :key="citem[valueKey]"
              :class="citem[classNameKey]"
              :disabled="citem[disabledKey]"
              :label="getLabelText(citem)"
              :value="citem[valueKey]"
            >
              <template #>
                <slot
                  :label="labelKey"
                  :value="valueKey"
                  :item="citem"
                  v-if="$slots.default"
                >
                </slot>
                <template v-else>
                  <span>{{ getLabelText(citem) }}</span>
                  <span v-if="citem[descKey]" :class="b('desc')">{{
                      citem[descKey]
                    }}</span>
                </template>
              </template>
            </el-option>
          </el-option-group>
        </template>
        <template v-else>
          <el-option
            v-for="item in netDic"
            :key="item[valueKey]"
            :class="item[classNameKey]"
            :disabled="item[disabledKey]"
            :label="getLabelText(item)"
            :value="item[valueKey]"
          >
            <template #>
              <slot
                :label="labelKey"
                :value="valueKey"
                :item="item"
                v-if="$slots.default"
              >
              </slot>
              <template v-else>
                <span>{{ getLabelText(item) }}</span>
                <span v-if="item[descKey]" :class="b('desc')">{{
                    item[descKey]
                  }}</span>
              </template>
            </template>
          </el-option>
        </template>
      </template>
    </template>
  </component>
</template>

<script>
import packages from "core/packages";
import create from "core/create";
import props from "common/common/props";
import event from "common/common/event";
import locale from "core/locale";
import { sendDic } from "core/dic";
import { DIC_SPLIT } from "global/variable";
import { cloneModel, isModelEqual } from "core/model";
export default create({
  name: "select",
  mixins: [props(), event(), locale],
  emits: ["update:modelValue", "click", "focus", "blur", "change", "end-reached", "dic-error"],
  data() {
    return {
      checked: false,
      indeterminate: false,
      create: false,
      netDic: [],
      loading: false,
      sortable: null,
      remoteRequestId: 0,
      remoteUnmounted: false,
    };
  },
  props: {
    virtualize: Boolean,
    valueOnClear: {
      type: [String, Number, Boolean, Function],
      default: undefined,
    },
    loadingText: {
      type: String,
    },
    noMatchText: {
      type: String,
    },
    noDataText: {
      type: String,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Boolean,
      default: false,
    },
    removeTag: Function,
    endReached: Function,
    collapseTags: Boolean,
    collapseTagsTooltip: Boolean,
    maxCollapseTags: Number,
    limit: {
      type: Number,
      default: 0,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    defaultFirstOption: {
      type: Boolean,
      default: false,
    },
    all: {
      type: Boolean,
      default: false,
    },
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    dic: {
      handler(val) {
        this.netDic = val;
      },
      immediate: true,
    },
    text: {
      handler() { this.updateCheckState(); },
      deep: true,
    },
    netDic: {
      handler() { this.updateCheckState(); },
      deep: true,
    },
    valueKey() { this.updateCheckState(); },
    disabledKey() { this.updateCheckState(); },
    groupsKey() { this.updateCheckState(); },
    multiple() { this.updateCheckState(); },
  },
  computed: {
    isGroup() {
      return this.netDic.some(item => Array.isArray(item[this.groupsKey]));
    },
    checkableOptions() {
      const options = this.isGroup
        ? this.netDic.reduce((list, group) => group[this.disabledKey] ? list : list.concat(group[this.groupsKey] || []), [])
        : this.netDic;
      return options.filter(item => !item[this.disabledKey]);
    },
    classNameKey() {
      return this.props.className || "className";
    },
    componentName() {
      return "elSelect" + (this.virtualize ? "V2" : "");
    },
  },
  mounted() {
    if (this.drag) {
      this.setSort();
    }
  },
  beforeUnmount() {
    this.remoteUnmounted = true;
    this.remoteRequestId++;
    if (this.sortable && typeof this.sortable.destroy === "function") {
      this.sortable.destroy();
    }
    this.sortable = null;
  },
  methods: {
    handleModelValue() {
      if (!this.validatenull(this.text)) {
        if (this.remote && !this.created) {
          this.created = true;
          this.handleRemoteMethod(
            this.multiple ? this.text.join(DIC_SPLIT) : this.text
          );
        }
      }
      this.updateCheckState();
    },
    updateCheckState() {
      if (!this.multiple) return;
      const selected = Array.isArray(this.text) ? this.text : [];
      const available = this.checkableOptions;
      const count = available.filter(item => selected.some(value => isModelEqual(value, item[this.valueKey]))).length;
      this.checked = available.length > 0 && count === available.length;
      this.indeterminate = count > 0 && count < available.length;
    },
    setSort() {
      if (!window.Sortable) {
        packages.logs("Sortable");
        return;
      }
      const el = this.$refs.main.$el.querySelectorAll(
        ".el-select__selection"
      )[0];
      this.sortable = window.Sortable.create(el, {
        animation: 100,
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt || {};
          if (
            !Array.isArray(this.text) ||
            !Number.isInteger(oldIndex) ||
            !Number.isInteger(newIndex) ||
            oldIndex < 0 || newIndex < 0 ||
            oldIndex >= this.text.length || newIndex >= this.text.length ||
            oldIndex === newIndex
          ) return;
          const values = [...this.text];
          const [targetRow] = values.splice(oldIndex, 1);
          values.splice(newIndex, 0, targetRow);
          this.text = values;
        },
      });
    },
    handleRemoteMethod(query) {
      const requestId = ++this.remoteRequestId;
      this.loading = true;
      sendDic(
        {
          column: this.column,
          value: query,
        },
        this
      )
        .then((res) => {
          if (this.remoteUnmounted || requestId !== this.remoteRequestId) return;
          this.netDic = res;
        })
        .catch((error) => {
          if (this.remoteUnmounted || requestId !== this.remoteRequestId) return;
          this.$emit("dic-error", {
            type: "select-remote",
            error,
          });
        })
        .finally(() => {
          if (!this.remoteUnmounted && requestId === this.remoteRequestId) {
            this.loading = false;
          }
        });
    },
    checkChange(val) {
      const selected = Array.isArray(this.text) ? cloneModel(this.text) : [];
      const values = this.checkableOptions.map(item => item[this.valueKey]);
      if (val) {
        values.forEach(value => {
          if (!selected.some(item => isModelEqual(item, value))) selected.push(cloneModel(value));
        });
        this.text = selected;
      } else {
        this.text = selected.filter(value => !values.some(item => isModelEqual(item, value)));
      }
      this.updateCheckState();
    },
    handleremoveTag(tagValue) {
      if (this.removeTag && typeof this.removeTag === 'function') {
        this.removeTag(tagValue);
      }
    },
    handleEndReached(...args) {
      if (this.endReached && typeof this.endReached === "function") {
        this.endReached({
          value: this.modelValue,
          column: this.column,
          dic: this.dic,
        });
      }
      this.$emit("end-reached", ...args);
    },
  },
});
</script>
