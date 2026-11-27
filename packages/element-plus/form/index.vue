<template>
  <div
    :class="[b(), { 'tvue--detail': isDetail }]"
    :style="{ width: setPx(tableOption.formWidth, '100%') }"
  >
    <el-form
      ref="form"
      :status-icon="tableOption.statusIcon"
      @submit.prevent
      :model="form"
      :scroll-to-error="tableOption.scrollToError"
      :hide-required-asterisk="tableOption.hideRequiredAsterisk"
      :require-asterisk-position="tableOption.requireAsteriskPosition"
      :scroll-into-view-options="tableOption.scrollIntoViewOptions"
      :label-suffix="labelSuffix"
      :size="size"
      :label-position="tableOption.labelPosition"
      :label-width="setPx(tableOption.labelWidth, config.labelWidth)"
    >
      <el-row
        :span="24"
        :gutter="tableOption.gutter"
        :class="{ 'tvue-form__tabs': isTabs }"
      >
        <tvue-group
          v-for="(item, index) in columnOption"
          @change="handleGroupClick"
          :key="item.prop"
          :tabs="isTabs"
          :arrow="item.arrow"
          :collapse="item.collapse"
          :display="vaildDisplay(item)"
          :icon="item.icon"
          :index="index"
          :header="!isTabs"
          :active="activeName"
          :label="item.label"
        >
          <template #tabs>
            <el-tabs
              v-model="activeName"
              @tab-click="handleTabClick"
              :class="b('tabs')"
              :type="tabsType"
              v-if="isTabs && index == 1"
            >
              <template v-for="(tabs, index) in columnOption">
                <el-tab-pane
                  v-if="vaildDisplay(tabs) && index != 0"
                  :key="index"
                  :name="index + ''"
                >
                  <template #label>
                    <span>
                      <slot
                        :name="getSlotName(tabs, 'H')"
                        :column="tabs"
                        v-if="getSlotName(tabs, 'H', $slots)"
                      ></slot>
                      <template v-else>
                        <icon-temp
                          v-if="tabs.icon"
                          :text="tabs.icon"
                          :size="14"
                          :icon-style="{
                            fontSize: '14px',
                            width: '14px',
                            height: '14px',
                          }"
                        ></icon-temp>&nbsp;
                        {{ tabs.label }}
                      </template>
                    </span>
                  </template>
                </el-tab-pane>
              </template>
            </el-tabs>
          </template>
          <template #header v-if="getSlotName(item, 'H', $slots)">
            <slot :name="getSlotName(item, 'H')" :column="item"></slot>
          </template>
          <div
            :class="b('group', { flex: validData(item.flex, true) })"
            v-if="isGroupShow(item, index, isVerifyAll)"
            v-show="isGroupShow(item, index)"
          >
            <template v-for="(column, cindex) in item.column">
              <el-col
                v-if="vaildDisplay(column)"
                :key="cindex"
                :span="getItemParams(column, item, 'span')"
                :md="getItemParams(column, item, 'span')"
                :sm="getItemParams(column, item, 'span')"
                :xs="getItemParams(column, item, 'xsSpan')"
                :offset="getItemParams(column, item, 'offset')"
                :push="getItemParams(column, item, 'push')"
                :pull="getItemParams(column, item, 'pull')"
                :class="[
                  b('row'),
                  { 'tvue--detail tvue--detail__column': vaildDetail(column) },
                  column.className,
                ]"
              >
                <el-form-item
                  :prop="column.prop"
                  :label="column.label"
                  :rules="column.rules"
                  :class="
                    b(
                      'item--' +
                        (column.labelPosition ||
                          item.labelPosition ||
                          tableOption.labelPosition ||
                          '')
                    )
                  "
                  :label-position="
                    column.labelPosition ||
                    item.labelPosition ||
                    tableOption.labelPosition
                  "
                  :label-width="getItemParams(column, item, 'labelWidth', true)"
                >
                  <template #label v-if="getSlotName(column, 'L', $slots)">
                    <slot
                      :name="getSlotName(column, 'L')"
                      :column="column"
                      :value="form[column.prop]"
                      :readonly="column.readonly || readonly"
                      :disabled="getDisabled(column)"
                      :size="column.size || size"
                      :dic="DIC[column.prop]"
                    ></slot>
                  </template>
                  <template #label v-else-if="column.labelTip">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :placement="column.labelTipPlacement || 'top-start'"
                    >
                      <template #content>
                        <div v-html="column.labelTip"></div>
                      </template>
                      <el-icon>
                        <el-icon-info-filled />
                      </el-icon>
                    </el-tooltip>
                    <span> {{ column.label }}{{ labelSuffix }}</span>
                  </template>
                  <template #error="scope" v-if="getSlotName(column, 'E')">
                    <slot
                      :name="getSlotName(column, 'E')"
                      v-bind="
                        Object.assign(scope, {
                          column,
                          value: form[column.prop],
                          readonly: column.readonly || readonly,
                          disabled: getDisabled(column),
                          size: column.size || size,
                          dic: DIC[column.prop],
                        })
                      "
                    ></slot>
                  </template>
                  <component
                    :is="validTip(column) ? 'div' : 'elTooltip'"
                    :disabled="validTip(column)"
                    :content="validData(column.tip, getPlaceholder(column))"
                    :placement="column.tipPlacement"
                    :trigger-keys="
                      validTip(column) ? undefined : ['Enter', 'NumpadEnter']
                    "
                  >
                    <div>
                      <slot
                        :value="form[column.prop]"
                        :column="column"
                        :label="form['$' + column.prop]"
                        :size="column.size || size"
                        :readonly="column.readonly || readonly"
                        :disabled="getDisabled(column)"
                        :dic="DIC[column.prop]"
                        :name="column.prop"
                        v-if="$slots[column.prop]"
                      ></slot>
                      <form-temp
                        :column="column"
                        v-else
                        :box-type="boxType"
                        :ref="column.prop"
                        :dic="DIC[column.prop]"
                        :props="tableOption.props"
                        :propsHttp="tableOption.propsHttp"
                        :render="column.render"
                        :row="form"
                        :clearValidate="clearValidate"
                        :table-data="tableData"
                        :readonly="column.readonly || readonly"
                        v-bind="$uploadFun(column)"
                        :disabled="getDisabled(column)"
                        :enter="tableOption.enter"
                        :size="size"
                        :model-value="form[column.prop]"
                        @update:model-value="setFieldValue(column, $event)"
                        @enter="submit"
                        :column-slot="columnSlot"
                        @change="propChange(item.column, column)"
                      >
                        <template
                          #="scope"
                          v-if="getSlotName(column, 'T', $slots)"
                        >
                          <slot
                            :name="getSlotName(column, 'T')"
                            v-bind="scope"
                          ></slot>
                        </template>
                        <template v-for="item in columnSlot" #[item]="scope">
                          <slot v-bind="scope" :name="item"></slot>
                        </template>
                      </form-temp>
                    </div>
                  </component>
                </el-form-item>
              </el-col>
              <div
                :class="b('line')"
                v-if="shouldShowDivider(column)"
                :key="`line${cindex}`"
                :style="{ width: (column.count / 24) * 100 + '%' }"
              ></div>
            </template>
            <form-menu v-if="!isMenu">
              <template #menu-form-before="scope">
                <slot name="menu-form-before" v-bind="scope"></slot>
              </template>
              <template #menu-form="scope">
                <slot name="menu-form" v-bind="scope"></slot>
              </template>
            </form-menu>
          </div>
        </tvue-group>
        <form-menu v-if="isMenu">
          <template #menu-form="scope">
            <slot name="menu-form" v-bind="scope"></slot>
          </template>
        </form-menu>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { cloneModel, isModelEqual, syncModel } from "core/model";
import get from "lodash/get";
import has from "lodash/has";
import toPath from "lodash/toPath";
import { detail } from "core/detail";
import { normalizeDicData } from "core/dic";
import create from "core/create";
import init from "common/common/init";
import formTemp from "common/components/form/index";
import iconTemp from "common/components/icon/index";
import formMenu from "./menu";
import { DIC_PROPS } from "global/variable";
import {
  getComponent,
  getPlaceholder,
  formInitVal,
  calcCount,
  calcCascader,
} from "core/dataformat";
import {
  getColumn,
  filterParams,
  clearVal,
  blankVal,
  setAsVal,
} from "utils/util";
import mock from "utils/mock";
import config from "./config";
export default create({
  name: "form",
  mixins: [init("form")],
  emits: [
    "update:modelValue",
    "update:status",
    "reset-change",
    "mock-change",
    "tab-click",
    "submit",
    "error",
    "control-error",
  ],
  components: {
    formTemp,
    formMenu,
    iconTemp,
  },
  data() {
    return {
      config,
      activeName: "",
      allDisabled: false,
      tableOption: {},
      form: {},
      formCreate: false,
      formSnapshot: undefined,
      formOptionSource: null,
      formUnmounted: false,
      formCascaderValues: {},
      formBind: {},
    };
  },
  provide() {
    return {
      formSafe: this,
    };
  },
  watch: {
    tableOption(value) {
      if (!this.formCreate || value === this.formOptionSource) return;
      const defaults = formInitVal(this.propOption);
      Object.keys(defaults).forEach((prop) => {
        if (!Object.prototype.hasOwnProperty.call(this.form, prop)) {
          this.form[prop] = cloneModel(defaults[prop]);
        }
      });
      this.setControl();
      this.setLabel();
    },
    modelValue: {
      handler(val) {
        if (this.formCreate) {
          this.setForm(val);
        }
      },
      deep: true,
    },
    form: {
      handler() {
        if (this.formCreate) {
          this.setLabel();
          this.setVal();
        }
      },
      deep: true,
      flush: "post",
    },
    tabsActive: {
      handler(val) {
        this.activeName = this.tabsActive;
      },
      immediate: true,
    },
    DIC: {
      handler() {
        this.setLabel();
      },
      deep: true,
      immediate: true,
    },
    allDisabled: {
      handler(val) {
        this.$emit("update:status", val);
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    size() {
      return this.tableOption.size || this.$TVUE.formSize || this.$TVUE.size;
    },
    columnSlot() {
      return Object.keys(this.$slots).filter(
        (item) => !this.propOption.map((ele) => ele.prop).includes(item)
      );
    },
    labelSuffix() {
      return this.tableOption.labelSuffix || ":";
    },
    isMenu() {
      return this.columnOption.length != 1;
    },
    isDetail() {
      return this.detail === true;
    },
    isAdd() {
      return ["parentAdd", "add"].includes(this.boxType);
    },
    isTabs() {
      return this.tableOption.tabs === true;
    },
    isEdit() {
      return this.boxType === "edit";
    },
    isView() {
      return this.boxType === "view";
    },
    detail() {
      return this.tableOption.detail;
    },
    disabled() {
      return this.tableOption.disabled;
    },
    readonly() {
      return this.tableOption.readonly;
    },
    tabsType() {
      return this.tableOption.tabsType;
    },
    columnLen() {
      return this.columnOption.length;
    },
    dynamicOption() {
      let list = [];
      this.columnOption.forEach((group, index) => {
        if (!this.vaildDisplay(group) || !this.isGroupShow(group, index, this.isVerifyAll)) return;
        group.column.forEach((ele) => {
          if (ele.type == "dynamic" && this.vaildDisplay(ele)) list.push(ele);
        });
      });
      return list;
    },
    propOption() {
      let list = [];
      this.columnOption.forEach((option) => {
        if (option.display !== false) {
          option.column.forEach((column) => list.push(column));
        }
      });
      return list;
    },
    columnOption() {
      const processColumnDetails = (list) => {
        list.forEach((groupItem, groupIndex) => {
          groupItem.column = getColumn(groupItem.column) || [];

          groupItem.column.forEach((column, columnIndex) => {
            if (column.display !== false && !this.isMobile) {
              column = calcCount(
                column,
                this.tableOption.span || this.config.span,
                columnIndex === 0
              );
            }
          });

          groupItem.column = calcCascader(groupItem.column);

          groupItem.column = groupItem.column.sort(
            (a, b) => (a.order || 0) - (b.order || 0)
          );
        });
      };

      const { tableOption } = this;

      const mainColumn = getColumn(tableOption.column);

      // 处理分组配置
      const processedGroups = (tableOption.group || []).map((groupItem) => ({
        ...groupItem,
        column: getColumn(groupItem.column),
      }));

      const footerColumns = tableOption.footer || [];

      // 添加主列组
      const mainGroup = [
        {
          header: false,
          column: mainColumn,
        },
      ];

      const footerGroup =
        footerColumns.length > 0
          ? [
            {
              header: false,
              column: footerColumns,
            },
          ]
          : [];

      // 处理所有组的详细信息
      processColumnDetails(mainGroup);
      processColumnDetails(processedGroups);
      if (footerColumns.length > 0) {
        processColumnDetails(footerGroup);
      }
      return [...mainGroup, ...processedGroups, ...footerGroup];
    },
    menuPosition: function () {
      if (this.tableOption.menuPosition) {
        return this.tableOption.menuPosition;
      } else {
        return "center";
      }
    },
    boxType: function () {
      return this.tableOption.boxType;
    },
    isPrint() {
      return this.validData(this.tableOption.printBtn, false);
    },
    tabsActive() {
      return this.validData(this.tableOption.tabsActive + "", "1");
    },
    isMock() {
      return this.validData(this.tableOption.mockBtn, false);
    },
    isVerifyAll() {
      return this.validData(this.tableOption.tabsVerifyAll, true);
    },
    menuSpan() {
      return this.tableOption.menuSpan || 24;
    },
  },
  props: {
    uploadSized: Function,
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    status: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },
  mounted() {
    this.initFun();
    this.dataFormat();
  },
  methods: {
    getComponent,
    getPlaceholder,
    initFun() {
      this.initFormMethods([
        "validateField",
        "scrollToField",
        "clearValidate",
        "resetFields",
        "getField",
        "fields",
      ]);
    },
    initFormMethods(methods) {
      methods.forEach((ele) => {
        this[ele] = (...args) => {
          const formRef = this.$refs.form;
          if (formRef && typeof formRef[ele] === "function") {
            return formRef[ele](...args);
          }
        };
      });
    },
    getDisabled(column) {
      return (
        this.vaildDetail(column) ||
        this.isDetail ||
        this.vaildDisabled(column) ||
        this.allDisabled
      );
    },
    isGroupShow(item, index, verifyAll) {
      if (verifyAll) return true;
      else if (this.isTabs) {
        return index == this.activeName || index == 0;
      } else {
        return true;
      }
    },

    dataFormat() {
      this.formCreate = false;
      this.clearFormWatchers();
      this.form = cloneModel({
        ...formInitVal(this.propOption),
        ...(this.modelValue || {}),
      });
      this.formCascaderValues = {};
      this.setLabel();
      this.setControl();
      this.formCreate = true;
      this.setVal();
      this.$nextTick(() => {
        if (!this.formUnmounted) this.clearValidate();
      });
    },
    clearFormWatchers() {
      Object.values(this.formBind).forEach((watchers) => {
        watchers.forEach((stop) => stop());
      });
      this.formBind = {};
    },
    setControl() {
      this.clearFormWatchers();
      this.formOptionSource = this.tableOption;
      this.objectOption = Object.fromEntries(this.propOption.map((column) => [column.prop, column]));
      const register = (prop, stop) => {
        (this.formBind[prop] || (this.formBind[prop] = [])).push(stop);
      };
      // Resolve bound values before a control callback reads the whole form.
      this.propOption.forEach((column) => {
        const { prop, bind } = column;
        if (bind) {
          const bound = get(this.form, bind);
          if (bound === undefined && !has(this.modelValue || {}, toPath(bind))) {
            setAsVal(this.form, bind, cloneModel(this.form[prop]));
          } else {
            this.form[prop] = cloneModel(bound);
          }
          register(prop, this.$watch(() => this.form[prop], (value) => {
            if (!isModelEqual(get(this.form, bind), value)) {
              setAsVal(this.form, bind, cloneModel(value));
            }
          }, { deep: true }));
          register(prop, this.$watch(() => get(this.form, bind), (value) => {
            if (!isModelEqual(this.form[prop], value)) {
              this.form[prop] = cloneModel(value);
            }
          }, { deep: true }));
        }
      });
      this.propOption.forEach((column) => {
        const { prop, control } = column;
        if (control) {
          let active = true;
          let sequence = 0;
          let hasValue = false;
          let previousValue;
          register(prop, () => { active = false; });
          const callback = () => {
            if (!active || this.formUnmounted) return;
            if (hasValue && isModelEqual(previousValue, this.form[prop])) return;
            const value = cloneModel(this.form[prop]);
            previousValue = value;
            hasValue = true;
            const requestId = ++sequence;
            const isCurrent = () => active && !this.formUnmounted && requestId === sequence &&
              isModelEqual(value, this.form[prop]);
            const controlResolve = (list) => {
              if (!isCurrent()) return;
              Object.keys(list || {}).forEach((item) => {
                const target = this.objectOption[item];
                if (!target || !list[item]) return;
                syncModel(target, list[item]);
                if (Object.prototype.hasOwnProperty.call(list[item], "dicData")) {
                  this.invalidateDicRequest(`update:${item}`, item);
                  this.DIC[item] = normalizeDicData(
                    list[item].dicData || [], target.props, target.dataType,
                  );
                }
              });
            };
            const controlReject = (error) => {
              if (isCurrent()) this.$emit("control-error", { prop, error });
            };
            try {
              // Control callbacks may write through the parent's v-model. Publish
              // the current edit first so that write cannot restore an older source.
              if (this.formCreate) {
                this.setLabel();
                this.setVal();
              }
              const result = this.form["$" + prop] ?? this.form[prop];
              const list = control(this.form[prop], this.form, result, column);
              if (list && typeof list.then === "function") {
                Promise.resolve(list).then(controlResolve).catch(controlReject);
              } else {
                controlResolve(list);
              }
            } catch (error) {
              controlReject(error);
            }
          };
          // Publish the edited model before callbacks that use the parent's v-model.
          register(prop, this.$watch(() => this.form[prop], callback, { deep: true, flush: "post" }));
          callback();
        }
        if (column.cascader && column.cascader.length) {
          this.formCascaderValues[prop] = cloneModel(this.form[prop]);
          register(prop, this.$watch(() => this.form[prop], (value) => {
            if (isModelEqual(value, this.formCascaderValues[prop])) return;
            this.formCascaderValues[prop] = cloneModel(value);
            this.handleChange(this.propOption, column);
          }, { deep: true }));
          this.handleChange(this.propOption, column, false);
        }
      });
    },
    setForm(value = this.modelValue) {
      // A queued parent echo must not overwrite edits made after that emission.
      if (isModelEqual(value, this.formSnapshot)) return;
      // Compare both ends before merging. A parent can edit the alias while
      // carrying an unchanged bound value in the same v-model object.
      const bindings = this.propOption.map((column) => {
        const hasAlias = Object.prototype.hasOwnProperty.call(value || {}, column.prop);
        const hasBound = column.bind &&
          Object.prototype.hasOwnProperty.call(value || {}, toPath(column.bind)[0]);
        const boundChanged = hasBound &&
          !isModelEqual(get(this.form, column.bind), get(value, column.bind));
        const useAlias = column.bind && hasAlias && !boundChanged &&
          !isModelEqual(this.form[column.prop], value[column.prop]);
        return { column, hasAlias, hasBound, useAlias };
      });
      if (!syncModel(this.form, value)) return;
      const preserved = new Set();
      bindings.forEach(({ column, hasAlias, hasBound, useAlias }) => {
        if (hasBound || hasAlias) {
          preserved.add(column.prop);
        }
        if (useAlias) {
          setAsVal(this.form, column.bind, cloneModel(this.form[column.prop]));
        } else if (hasBound) {
          const bound = get(this.form, column.bind);
          if (!isModelEqual(this.form[column.prop], bound)) {
            this.form[column.prop] = cloneModel(bound);
          }
        }
      });
      const changed = this.propOption.filter((column) =>
        column.cascader && column.cascader.length &&
        !isModelEqual(this.form[column.prop], this.formCascaderValues[column.prop]));
      const affected = new Set();
      // Detail responses retain explicit child values; partial parent patches
      // clear omitted descendants before any new dictionary captures the form.
      changed.forEach((column) => {
        const visited = new Set([column.prop]);
        this.clearCascader(this.propOption, column, visited, preserved);
        visited.forEach((prop) => affected.add(prop));
      });
      this.propOption.forEach((column) => {
        if (!affected.has(column.prop) || !column.cascader || !column.cascader.length) return;
        this.formCascaderValues[column.prop] = cloneModel(this.form[column.prop]);
        this.handleChange(this.propOption, column, false, preserved);
      });
    },
    setFieldValue(column, value) {
      if (!isModelEqual(this.form[column.prop], value)) {
        this.form[column.prop] = cloneModel(value);
      }
    },
    setVal() {
      if (this.formUnmounted) return;
      const snapshot = cloneModel(this.form);
      if (this.tableOption.filterNull === true) filterParams(snapshot, [""], false);
      if (isModelEqual(this.formSnapshot, snapshot)) return;
      this.formSnapshot = snapshot;
      this.$emit("update:modelValue", cloneModel(snapshot));
      this.$emit("change", cloneModel(snapshot));
    },
    setLabel() {
      if (this.tableOption.filterDic == true) {
        this.form = filterParams(this.form, ["$"], false);
      } else {
        this.propOption.forEach((column) => {
          let result;
          let DIC = this.DIC[column.prop];
          if (!Object.prototype.hasOwnProperty.call(this.DIC, column.prop)) return;
          if (this.validatenull(DIC)) {
            delete this.form[`$${column.prop}`];
            return;
          }
          result = detail(this.form, column, this.tableOption, DIC);
          if (!this.validatenull(result)) {
            this.form[`$${column.prop}`] = result;
          } else {
            delete this.form[`$${column.prop}`];
          }
        });
      }
    },
    handleGroupClick(activeNames) {
      this.$emit("tab-click", activeNames);
    },
    handleTabClick(tab, event) {
      this.$emit("tab-click", tab, event);
    },
    getItemParams(column, item, type, isPx) {
      let result;
      if (!this.validatenull(column[type])) {
        result = column[type];
      } else if (!this.validatenull(item[type])) {
        result = item[type];
      } else {
        result = this.tableOption[type];
      }
      result = this.validData(result, this.config[type]);
      return isPx ? this.setPx(result) : result;
    },
    validTip(column) {
      return !column.tip || column.type === "upload";
    },
    getPropRef(prop) {
      return this.$refs[prop][0];
    },
    clearCascader(list, column, visited = new Set(), preserved = new Set()) {
      (column.cascader || []).forEach((prop) => {
        if (visited.has(prop)) return;
        visited.add(prop);
        this.invalidateDicRequest(`form-cascader:${prop}`, prop);
        const child = this.findObject(list, prop);
        if (!preserved.has(prop)) {
          const value = blankVal(this.form[prop]);
          this.formCascaderValues[prop] = cloneModel(value);
          if (!isModelEqual(this.form[prop], value)) this.form[prop] = value;
          if (child && child.bind) setAsVal(this.form, child.bind, cloneModel(value));
        }
        this.DIC[prop] = [];
        if (child) this.clearCascader(list, child, visited, preserved);
      });
    },
    handleChange(list, column, clear = true, preserved = new Set()) {
      if (this.formUnmounted) return;
      if (clear) this.clearCascader(list, column, new Set([column.prop]), preserved);
      const value = cloneModel(this.form[column.prop]);
      (column.cascader || []).forEach((prop) => {
        const child = this.findObject(list, prop);
        if (!child || prop === column.prop) return;
        this.invalidateDicRequest(`form-cascader:${prop}`, prop);
        this.DIC[prop] = [];
        if (this.validatenull(value)) return;
        this.requestDic({
          column: child,
          value,
          form: this.form,
        }, `form-cascader:${prop}`).then((dic) => {
          if (!dic || this.formUnmounted) return;
          this.DIC[prop] = dic;
          const selected = dic[child.cascaderIndex];
          if (selected && !preserved.has(prop) && this.validatenull(this.form[prop])) {
            this.form[prop] = cloneModel(
              selected[(child.props || {}).value || DIC_PROPS.value],
            );
            if (child.bind) setAsVal(this.form, child.bind, cloneModel(this.form[prop]));
            if (preserved.size && child.cascader && child.cascader.length) {
              this.formCascaderValues[prop] = cloneModel(this.form[prop]);
              this.handleChange(list, child, false, preserved);
            }
          }
        });
      });
    },
    handlePrint() {
      this.$Print(this.$el);
    },
    propChange(_option, column) {
      let key = column.prop;
      if (column.type === "cascader" || column.type === "upload") {
        this.$nextTick(() => {
          if (this.formUnmounted) return;
          const validation = this.validateField(key);
          if (validation && typeof validation.catch === "function") {
            validation.catch(() => {});
          }
        });
      }
    },
    handleMock() {
      if (!this.isMock) return;
      this.columnOption.forEach((column) => {
        const form = mock(column.column, this.DIC, this.form, this.isMock);
        if (!this.validatenull(form)) {
          Object.keys(form).forEach((ele) => {
            this.form[ele] = form[ele];
          });
        }
      });
      // 保存定时器ID，用于清理
      this.$nextTick(() => {
        this.clearValidate();
        this.$emit("mock-change", this.form);
      });
    },
    vaildDetail(column) {
      let key;
      if (this.detail) return false;
      if (!this.validatenull(column.detail)) {
        key = "detail";
      } else if (this.isAdd) {
        key = "addDetail";
      } else if (this.isEdit) {
        key = "editDetail";
      } else if (this.isView) {
        return false;
      }
      return this.validData(column[key], false);
    },
    // 验证表单是否禁止
    vaildDisabled(column) {
      let key;
      if (this.disabled) return true;
      if (!this.validatenull(column.disabled)) {
        key = "disabled";
      } else if (this.isAdd) {
        key = "addDisabled";
      } else if (this.isEdit) {
        key = "editDisabled";
      } else if (this.isView) {
        return true;
      }
      return this.validData(column[key], false);
    },
    // 验证表单是否显隐
    vaildDisplay(column) {
      let key;
      if (!this.validatenull(column.display)) {
        key = "display";
      } else if (this.isAdd) {
        key = "addDisplay";
      } else if (this.isEdit) {
        key = "editDisplay";
      } else if (this.isView) {
        key = "viewDisplay";
      } else {
        return true;
      }
      return this.validData(column[key], true);
    },
    validateCellForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid, msg) => {
          resolve(msg);
        });
      });
    },
    async validate(callback) {
      // Tab switches and v-if updates must finish before collecting child refs.
      await this.$nextTick();
      if (this.formUnmounted) return;
      const active = this.activeName;
      const current = () => !this.formUnmounted && (this.isVerifyAll || this.activeName === active);
      const failure = (error) => {
        if (error && error.fields) return cloneModel(error.fields);
        if (error && typeof error === "object" && !(error instanceof Error) && !error.message) return cloneModel(error);
        return { _error: [{ message: String(error?.message || error || "Validation failed") }] };
      };
      const parent = await new Promise((resolve) => {
        const done = (valid, errors) => resolve({ valid, errors: errors || {} });
        try {
          const pending = this.$refs.form.validate(done);
          if (pending && typeof pending.catch === "function") pending.catch(error => done(false, failure(error)));
        } catch (error) {
          done(false, failure(error));
        }
      });
      if (!current()) return;
      const tasks = [];
      const enqueue = (prop, child, rowIndex) => {
        tasks.push(Promise.resolve().then(() => {
          if (!child || typeof child.validateCellForm !== "function") throw new Error(`Dynamic form "${prop}" is unavailable`);
          return child.validateCellForm();
        }).catch(failure).then(errors => ({ prop, rowIndex, errors })));
      };
      this.dynamicOption.forEach((column) => {
        if (this.$slots[column.prop]) return;
        const wrapper = this.$refs[column.prop];
        const field = Array.isArray(wrapper) ? wrapper[0] : wrapper;
        const main = field?.$refs.temp?.$refs.main;
        if (column.children?.type === "form") {
          const rows = Array.isArray(main) ? main : main ? [main] : [];
          rows.forEach((child, index) => {
            const rowIndex = Number.isInteger(child.tableData?.index) ? child.tableData.index : index;
            enqueue(column.prop, child, rowIndex);
          });
          if (!rows.length && this.form[column.prop]?.length) enqueue(column.prop);
        } else enqueue(column.prop, main);
      });
      const results = await Promise.all(tasks);
      if (!current()) return;
      const result = cloneModel(parent.errors);
      results.forEach(({ prop, rowIndex, errors }) => {
        if (this.validatenull(errors)) return;
        let fields = cloneModel(errors);
        if (rowIndex !== undefined) {
          fields = {};
          Object.keys(errors).forEach((key) => {
            const path = `${rowIndex}.${key}`;
            const issues = Array.isArray(errors[key]) ? errors[key] : [errors[key]];
            fields[path] = issues.map(issue => ({
              ...(issue && typeof issue === "object" ? cloneModel(issue) : { message: String(issue) }),
              field: `${prop}.${path}`, rowIndex,
            }));
          });
        }
        const previous = result[prop];
        result[prop] = { ...(Array.isArray(previous) ? { _self: previous } : previous), ...fields };
      });
      const valid = parent.valid && this.validatenull(result);
      if (valid) this.show();
      callback && callback(valid, this.hide, result);
      return valid;
    },
    resetForm(reset = true) {
      if (reset) {
        let propList = this.propOption.map((ele) => ele.prop);
        this.form = clearVal(
          this.form,
          propList,
          (this.tableOption.filterParams || []).concat([this.rowKey])
        );
      }
      this.$nextTick(() => {
        this.clearValidate();
        this.$emit("reset-change");
      });
    },
    show() {
      this.allDisabled = true;
    },
    hide() {
      this.allDisabled = false;
    },
    submit() {
      this.validate((valid, hide, msg) => {
        if (valid) {
          const filters = this.tableOption.filterNull === true ? ["", "$"] : ["$"];
          this.$emit("submit", filterParams(this.form, filters), this.hide);
        } else {
          this.$emit("error", msg);
        }
      });
    },
    shouldShowDivider(column) {
      return (
        this.vaildDisplay(column) && // 列是否显示
        column.row && // 是否需要换行
        column.span !== 24 && // 不是全宽
        column.count // 有剩余空间需要填充
      );
    },
  },
  beforeUnmount() {
    this.formUnmounted = true;
    this.clearFormWatchers();
  },
});
</script>
