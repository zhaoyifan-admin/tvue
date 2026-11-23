<template>
  <div :class="b()">
    <el-input
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :size="size"
      :model-value="labelShow"
      :clearable="disabled ? false : clearable"
      :placeholder="placeholder"
      ref="main"
      @clear="handleClear"
      @focus="handleShow"
      @click="handleClick"
      :disabled="disabled"
    >
    </el-input>
    <el-dialog
      class="tvue-dialog"
      :class="b()"
      :width="dialogWidth"
      :before-close="handelBeforeClose"
      :append-to-body="$TVUE.appendToBody"
      lock-scroll
      destroy-on-close
      :title="placeholder"
      v-model="box"
    >
      <tvue-crud
        :class="b('crud')"
        ref="crud"
        :option="option"
        :data="data"
        :table-loading="loading"
        @on-load="onList"
        @search-change="handleSearchChange"
        @search-reset="handleSearchChange"
        @select-all="handleSelectionAllChange"
        @select="handleSelectionChange"
        :rowClassName="handleRowClassName"
        @current-row-change="handleCurrentChange"
        v-model:search="search"
        v-model:page="page"
      ></tvue-crud>
      <span class="tvue-dialog__footer">
        <el-button
          type="primary"
          :size="size"
          icon="el-icon-check"
          @click="handleSubmit()"
        >{{ t("common.submitBtn") }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props";
import event from "common/common/event";
import locale from "core/locale";
import { cloneModel, isModelEqual } from "core/model";
export default create({
  name: "input-table",
  mixins: [props(), event(), locale],
  emits: ["load-error"],
  data() {
    return {
      object: [],
      active: [],
      search: {},
      page: {},
      loading: false,
      box: false,
      created: false,
      data: [],
      listRequestId: 0,
      valueRequestId: 0,
      loadUnmounted: false,
    };
  },
  watch: {
    box(value) {
      if (!value) this.cancelListLoad();
    },
  },
  props: {
    beforeClose: Function,
    prefixIcon: {
      type: String,
    },
    suffixIcon: {
      type: String,
    },
    formatter: Function,
    onLoad: Function,
    children: {
      type: Object,
      default: () => {
        return {};
      },
    },
    dialogWidth: {
      type: String,
      default: "80%",
    },
  },
  computed: {
    isMultiple() {
      return this.multiple;
    },
    title() {
      return this.disabled || this.readonly ? this.t('common.view') : this.t('common.select');
    },
    labelShow() {
      if (typeof this.formatter == "function") {
        return this.formatter(
          this.isMultiple ? this.object : this.object[0] || {}
        );
      }
      return this.object.map((ele) => ele[this.labelKey]).join(",");
    },
    option() {
      return Object.assign(
        {
          menu: false,
          header: false,
          size: this.size,
          tip: false,
          headerAlign: "center",
          align: "center",
          highlightCurrentRow: !this.isMultiple,
          reserveSelection: this.isMultiple,
          selection: this.isMultiple,
          selectable: (row, index) => {
            return !row.disabled;
          },
        },
        this.children
      );
    },
  },
  methods: {
    cancelListLoad() {
      this.listRequestId++;
      this.loading = false;
    },
    loadData(type, params, resolve, onError) {
      if (this.loadUnmounted || typeof this.onLoad !== "function") return;
      const field = type === "list" ? "listRequestId" : "valueRequestId";
      const requestId = ++this[field];
      const value = type === "value" ? cloneModel(params.value) : undefined;
      let failed = false;
      const isCurrent = () => !failed && !this.loadUnmounted && this[field] === requestId &&
        (type !== "list" || this.box) &&
        (type !== "value" || isModelEqual(value, this.text));
      const reject = (error) => {
        if (!isCurrent()) return;
        failed = true;
        if (type === "list") this.loading = false;
        if (onError) onError();
        this.$emit("load-error", { type, error });
      };
      try {
        const result = this.onLoad(cloneModel(params), (data) => {
          if (!isCurrent()) return;
          try {
            resolve(data, isCurrent);
          } catch (error) {
            reject(error);
          }
        });
        if (result && typeof result.then === "function") {
          Promise.resolve(result).catch(reject);
        }
      } catch (error) {
        reject(error);
      }
    },
    handelBeforeClose(done) {
      const callback = () => {
        this.cancelListLoad();
        this.active = [];
        done();
      };
      if (typeof this.beforeClose === "function") {
        this.beforeClose(callback);
      } else {
        callback();
      }
    },
    handleSelectionAllChange(val) {
      let ids = this.data.map((ele) => ele[this.valueKey]);
      let list = val.filter((ele) => ids.includes(ele[this.valueKey]));
      this.data.forEach((row) => {
        let index = this.active.findIndex(
          (ele) => ele[this.valueKey] == row[this.valueKey]
        );
        if (list.length == 0) {
          if (index != -1) this.active.splice(index, 1);
        } else {
          if (index == -1) this.active.push(row);
        }
      });
    },
    handleSelectionChange(val, row) {
      let checkbox = val.find(
        (ele) => ele[this.valueKey] == row[this.valueKey]
      );
      if (checkbox) {
        this.active.push(row);
      } else {
        let index = this.active.findIndex(
          (ele) => ele[this.valueKey] == row[this.valueKey]
        );
        if (index != -1) this.active.splice(index, 1);
      }
    },
    handleModelValue(val) {
      if (this.validatenull(val)) {
        this.valueRequestId++;
        this.active = [];
        this.object = [];
      }
    },
    handleTextValue(val) {
      if (this.validatenull(val)) {
        this.valueRequestId++;
        this.active = [];
        this.object = [];
        return;
      }
      const value = cloneModel(val);
      this.loadData("value", { value }, (data) => {
        const result = (Array.isArray(data) ? data : [data]).filter(Boolean);
        const valArray = Array.isArray(value) ? value : [value];
        const activeObjArray = result.filter((item) =>
          valArray.some((val) => val === item[this.valueKey])
        );
        this.active = cloneModel(activeObjArray);

        const activeObjArray2 = valArray.map((item) => {
          const selected = result.find((row) => item === row[this.valueKey]);
          return selected || { [this.labelKey]: item, [this.valueKey]: item };
        });
        this.object = cloneModel(activeObjArray2);
      });
    },
    handleClear() {
      this.setVal([]);
      this.box = false;
    },
    handleShow() {
      this.$refs.main.blur();
      if (this.disabled || this.readonly) return;
      this.cancelListLoad();
      this.search = {};
      this.page = {
        currentPage: 1,
        total: 0,
      };
      this.data = [];
      this.box = true;
    },
    handleSubmit() {
      const callback = () => {
        this.setVal();
      };
      if (typeof this.beforeClose === "function") {
        this.beforeClose(callback);
      } else {
        callback();
      }
    },
    setVal(value) {
      this.valueRequestId++;
      this.object = this.deepClone(value || this.active);
      this.text = this.object.map((ele) => ele[this.valueKey]);
      this.box = false;
    },
    handleRowClassName({ row, rowIndex }) {
      if (row[this.disabledKey]) return "disabled";
    },
    handleCurrentChange(val) {
      if (!val) return;
      if (this.isMultiple) {
        this.$refs.crud.setCurrentRow(null);
      } else {
        if (val[this.disabledKey]) {
          this.$refs.crud.setCurrentRow(this.active[0]);
        } else {
          this.active = [val];
        }
      }
    },
    handleSearchChange(form, done) {
      if (this.loadUnmounted) return;
      this.page.currentPage = 1;
      this.onList({}, () => {
        done && done();
      });
    },
    onList(params, callback) {
      if (this.loadUnmounted) return;
      if (!this.box) {
        this.loading = false;
        callback && callback();
        return;
      }
      this.loading = true;
      if (typeof this.onLoad !== "function") {
        this.loading = false;
        callback && callback();
        return;
      }
      this.loadData("list", { page: this.page, data: this.search }, (result, isCurrent) => {
        this.page.total = result?.total ?? 0;
        this.data = cloneModel(Array.isArray(result?.data) ? result.data : []);
        this.loading = false;
        callback && callback();
        this.$nextTick(() => {
          const crud = this.$refs.crud;
          if (!isCurrent() || !crud) return;
          if (this.isMultiple) {
            const ids = this.object.map((ele) => ele[this.valueKey]);
            const selected = this.data.filter((ele) => ids.includes(ele[this.valueKey]));
            crud.toggleSelection(selected, true);
          } else {
            crud.setCurrentRow(this.data.find((ele) => ele[this.valueKey] == this.text));
          }
        });
      }, () => { callback && callback(); });
    },
  },
  beforeUnmount() {
    this.loadUnmounted = true;
    this.cancelListLoad();
    this.valueRequestId++;
  },
});
</script>
