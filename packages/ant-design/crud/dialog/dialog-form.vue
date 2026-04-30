<template>
  <component
    v-if="boxVisible"
    :is="dialogType"
    :class="[
      'tvue-dialog',
      b('dialog'),
      this.crud.tableOption.dialogCustomClass,
    ]"
    :get-container="validData(crud.tableOption.dialogAppendToBody, true) ? 'body' : false"
    :wrap-class-name="crud.tableOption.headerClass"
    :body-style="{}"
    :closable="crud.tableOption.dialogCloseBtn"
    :mask-closable="validData(crud.tableOption.dialogClickModal, false)"
    :keyboard="crud.tableOption.dialogEscape"
    :open="boxVisible"
    @cancel="hide"
  >
    <template #title>
      <div :class="b('dialog__header')">
        <span>{{ dialogTitle }}</span>
        <div :class="b('dialog__menu')">
          <a @click="handleFullScreen" style="cursor: pointer;">
            <component
              :is="fullscreen ? CopyOutlined : FullscreenOutlined"
            />
          </a>
        </div>
      </div>
    </template>
    <tvue-ant-form
      v-model="crud.tableForm"
      v-model:status="disabled"
      ref="tableForm"
      @change="handleChange"
      @submit="handleSubmit"
      @reset-change="hide"
      @tab-click="handleTabClick"
      @error="handleError"
      v-bind="$uploadFun(null, crud)"
      v-loading="loading"
      :element-loading-text="crud.tableOption.loadingText"
      :element-loading-spinner="crud.tableOption.loadingSpinner"
      :element-loading-svg="crud.tableOption.loadingSvg"
      :element-loading-background="crud.tableOption.loadingBackground"
      :option="option"
    >
      <template v-for="item in crud.formSlot" #[getSlotName(item)]="scope">
        <slot
          :name="item"
          v-bind="Object.assign(scope, { type: boxType })"
        ></slot>
      </template>
    </tvue-ant-form>
    <template #footer>
      <span
        class="tvue-dialog__footer"
        :class="'tvue-dialog__footer--' + dialogMenuPosition"
      >
        <slot name="menu-form-before" v-bind="menuParams()"></slot>
        <a-button
          type="primary"
          @click="($refs.tableForm || {}).handleMock"
          :loading="disabled || loading"
          :size="crud.size"
          v-if="validData(option.mockBtn, false) && !isView"
        >
          {{ option.mockText }}
        </a-button>
        <a-button
          v-if="validData(option.submitBtn, true) && !isView"
          @click="submit"
          :loading="disabled || loading"
          :size="crud.size"
          type="primary"
        >{{ option.submitText }}</a-button
        >
        <a-button
          v-if="validData(option.emptyBtn, true) && !isView"
          @click="reset"
          :disabled="disabled || loading"
          :size="crud.size"
        >{{ option.emptyText }}</a-button
        >
        <slot name="menu-form" v-bind="menuParams()"></slot>
      </span>
    </template>
  </component>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import config from "../config";
import { filterParams } from "utils/util";
import { FullscreenOutlined, CopyOutlined } from '@ant-design/icons-vue';

export default create({
  name: "crud",
  mixins: [locale],
  emits: ["update:modelValue", "change"],
  inject: ["crud"],
  components: {
    FullscreenOutlined,
    CopyOutlined
  },
  data() {
    return {
      loading: false,
      disabled: false,
      config: config,
      boxType: "",
      fullscreen: false,
      boxVisible: false,
    };
  },
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    isView() {
      return this.boxType === "view";
    },
    isAdd() {
      return this.boxType === "add";
    },
    isEdit() {
      return this.boxType === "edit";
    },
    width() {
      let dialogWidth = this.crud.tableOption.dialogWidth + "";
      let defaultWidth = this.crud.isMobile ? "100%" : config.dialogWidth;
      let result = this.validData(dialogWidth, defaultWidth);
      return this.setPx(result);
    },
    dialogType() {
      return this.isDrawer ? "aDrawer" : "aModal";
    },
    dialogTop() {
      return !this.isDrawer && !this.fullscreen
        ? this.crud.tableOption.dialogTop
        : "0";
    },
    isDrawer() {
      return this.crud.tableOption.dialogType === "drawer";
    },
    params() {
      let result = this.isDrawer
        ? {
          width: this.fullscreen ? "100%" : this.width,
          placement: this.crud.tableOption.dialogDirection || 'right',
        }
        : {
          width: this.width,
        };
      return Object.assign(result, this.$uploadFun({}, this.crud));
    },
    option() {
      let option = this.deepClone(this.crud.tableOption);
      option.boxType = this.boxType;
      option.column = this.deepClone(this.crud.propOption);
      option.column.forEach((ele) => {
        delete ele.render;
        if (ele.renderForm) ele.render = ele.renderForm;
      });
      option.menuBtn = false;
      if (this.isAdd) {
        option.submitBtn = option.saveBtn;
        option.submitText = this.crud.menuIcon("saveBtn");
        option.submitIcon = this.crud.getBtnIcon("saveBtn");
      } else if (this.isEdit) {
        option.submitBtn = option.updateBtn;
        option.submitText = this.crud.menuIcon("updateBtn");
        option.submitIcon = this.crud.getBtnIcon("updateBtn");
      } else if (this.isView) {
        option.detail = true;
      }
      option.mockIcon = this.crud.getBtnIcon("mockBtn");
      option.mockText = this.crud.menuIcon("mockBtn");

      option.emptyBtn = option.cancelBtn;
      option.emptyIcon = this.crud.getBtnIcon("cancelBtn");
      option.emptyText = this.crud.menuIcon("cancelBtn");
      if (!this.crud.isGroup) {
        option.dicFlag = false;
        option.dicData = this.crud.DIC;
      }
      if (!this.validatenull(option.dicFlag)) {
        option.column.forEach((ele) => {
          ele.boxType = this.boxType;
          ele.dicFlag = ele.dicFlag || option.dicFlag;
        });
      }
      return option;
    },
    dialogTitle() {
      const key = `${this.boxType}`;
      if (!this.validatenull(this.boxType)) {
        return (
          this.crud.tableOption[key + "Title"] || this.t(`crud.${key}Title`)
        );
      }
    },
    dialogMenuPosition() {
      return this.crud.tableOption.dialogMenuPosition || "right";
    },
  },
  methods: {
    menuParams() {
      return {
        disabled: this.disabled,
        size: this.crud.size,
        type: this.boxType,
      };
    },
    submit() {
      this.$refs.tableForm.submit();
    },
    reset() {
      this.$refs.tableForm.resetForm(false);
    },
    getSlotName(item) {
      return item.replace("-form", "");
    },
    handleChange() {
      this.crud.setVal();
    },
    handleTabClick(tab, event) {
      this.crud.$emit("tab-click", tab, event);
    },
    handleFullScreen() {
      if (this.fullscreen) {
        this.fullscreen = false;
      } else {
        this.fullscreen = true;
      }
    },
    handleError(error) {
      this.crud.$emit("error", error);
    },
    handleSubmit(form, hide) {
      if (this.isAdd) {
        this.rowSave(hide);
      } else if (this.isEdit) {
        this.rowUpdate(hide);
      }
    },
    initFun() {
      ["clearValidate", "validate", "resetForm", "validateField"].forEach(
        (ele) => {
          this.crud[ele] = this.$refs.tableForm[ele];
        }
      );
    },
    rowSave(hide) {
      this.crud.$emit(
        "row-save",
        filterParams(this.crud.tableForm, ["$"]),
        this.closeDialog,
        hide
      );
    },
    rowUpdate(hide) {
      this.crud.$emit(
        "row-update",
        filterParams(this.crud.tableForm, ["$"]),
        this.crud.tableIndex,
        this.closeDialog,
        hide
      );
    },
    closeDialog(row, index) {
      row = this.deepClone(row);
      const callback = () => {
        if (this.isEdit) {
          let { parentList, index } = this.crud.findData(row[this.crud.rowKey]);
          if (parentList) {
            const oldRow = parentList.splice(index, 1)[0];
            row[this.crud.childrenKey] = oldRow[this.crud.childrenKey];
            parentList.splice(index, 0, row);
          }
        } else if (this.isAdd) {
          let { item } = this.crud.findData(row[this.crud.rowParentKey]);
          if (item) {
            if (!item[this.crud.childrenKey]) {
              item[this.crud.childrenKey] = [];
            }
            if (this.crud.tableOption.lazy) {
              item[this.crud.hasChildrenKey] = true;
            }
            item[this.crud.childrenKey].push(row);
          } else {
            this.crud.list.push(row);
          }
        }
      };
      if (row) callback();
      this.hide();
    },
    hide(done) {
      const callback = () => {
        done && done();
        this.crud.tableIndex = -1;
        this.crud.tableForm = {};
        this.crud.setVal();
        this.boxVisible = false;
      };
      if (typeof this.crud.beforeClose === "function") {
        this.crud.beforeClose(callback, this.boxType);
      } else {
        callback();
      }
    },
    show(type) {
      this.boxType = type;
      const callback = (fn) => {
        this.fullscreen = this.crud.tableOption.dialogFullscreen;
        this.boxVisible = true;
        this.loading = false;
        this.$nextTick(() => {
          this.initFun();
          fn && fn();
        });
      };
      const loading = () => {
        callback(() => {
          this.loading = true;
        });
      };
      if (typeof this.crud.beforeOpen === "function") {
        this.crud.beforeOpen(callback, this.boxType, loading);
      } else {
        callback();
      }
    },
  },
});
</script>
