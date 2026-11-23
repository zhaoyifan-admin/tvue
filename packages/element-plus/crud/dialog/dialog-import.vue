<template>
  <el-dialog
    v-if="visible"
    v-model="visible"
    :title="t('crud.import.title')"
    :width="crud.isMobile ? '96%' : '80%'"
    :append-to-body="$TVUE.appendToBody"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <div class="tvue-crud-import">
      <div v-if="crud.isMobile" class="tvue-crud-import__step" role="status">
        {{ step + 1 }}/3 · {{ t(['crud.import.upload', 'crud.import.mapping', 'crud.import.preview'][step]) }}
      </div>
      <el-steps v-else :active="step" simple>
        <el-step :title="t('crud.import.upload')" />
        <el-step :title="t('crud.import.mapping')" />
        <el-step :title="t('crud.import.preview')" />
      </el-steps>
      <el-alert v-if="error" :title="error" type="error" :closable="false" show-icon />
      <el-alert v-if="!columns.length" :title="t('crud.import.noColumns')" type="warning" :closable="false" />

      <div v-if="step === 0" class="tvue-crud-import__upload">
        <el-upload
          action="#"
          accept=".xlsx,.xls,.csv"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleFileChange"
          :disabled="!columns.length || submitting"
        >
          <el-button type="primary" :loading="parsing">{{ t('crud.import.chooseFile') }}</el-button>
          <template #tip><div>{{ t('crud.import.fileHint') }}</div></template>
        </el-upload>
        <p v-if="filename">{{ t('crud.import.filename') }}: {{ filename }}</p>
        <p v-if="sheet">{{ t('crud.import.worksheet') }}: {{ sheet.sheetName }}</p>
      </div>

      <el-table v-else-if="step === 1 && sheet" :data="mappingRows" row-key="index" max-height="420">
        <el-table-column prop="source" :label="t('crud.import.source')" min-width="150" />
        <el-table-column :label="t('crud.import.sample')" min-width="150">
          <template #default="scope">{{ displayValue(scope.row.sample) }}</template>
        </el-table-column>
        <el-table-column :label="t('crud.import.target')" min-width="220">
          <template #default="scope">
            <el-select v-model="mapping[scope.row.index]" clearable filterable :placeholder="t('crud.import.skip')" :disabled="validating" @change="clearPreview">
              <el-option
                v-for="column in columns"
                :key="column.prop"
                :label="column.label || column.prop"
                :value="column.prop"
                :disabled="isMappedElsewhere(column.prop, scope.row.index)"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>

      <div v-else-if="step === 2">
        <el-alert :title="summary" :type="invalidCount ? 'warning' : 'success'" :closable="false" />
        <el-checkbox v-if="invalidCount" v-model="excludeInvalid" :disabled="submitting">
          {{ t('crud.import.excludeInvalid') }}
        </el-checkbox>
        <el-table :data="previewPage" row-key="rowNumber" max-height="420">
          <el-table-column prop="rowNumber" :label="t('crud.import.rowNumber')" width="110" />
          <el-table-column v-for="column in previewColumns" :key="column.prop" :label="column.label || column.prop" min-width="150">
            <template #default="scope">{{ displayValue(scope.row.row[column.prop]) }}</template>
          </el-table-column>
          <el-table-column :label="t('crud.import.status')" min-width="240">
            <template #default="scope">
              <el-tag v-if="!scope.row.errors.length" type="success">{{ t('crud.import.valid') }}</el-tag>
              <div v-for="(issue, index) in scope.row.errors" :key="`${issue.prop}:${index}`" class="tvue-crud-import__issue">
                {{ issueText(issue) }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="page" :page-size="pageSize" :total="preview.length" layout="prev, pager, next, total" />
      </div>
    </div>
    <template #footer>
      <el-button @click="handleClose()">{{ t('crud.import.cancel') }}</el-button>
      <el-button v-if="step > 0" :disabled="busy" @click="previous">{{ t('crud.import.previous') }}</el-button>
      <el-button v-if="step === 0" type="primary" :disabled="!sheet || busy" @click="step = 1">{{ t('crud.import.next') }}</el-button>
      <el-button v-else-if="step === 1" type="primary" :loading="validating" :disabled="busy || !mapping.some(Boolean)" @click="validateRows">{{ t('crud.import.validate') }}</el-button>
      <el-button v-else type="primary" :loading="submitting" :disabled="!canSubmit" @click="submitImport">{{ t('crud.import.submit') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import locale from "core/locale";
import { cloneModel, isModelEqual } from "core/model";
import { getCrudDataColumns } from "core/crud-validation";
import {
  CrudImportError,
  normalizeCrudImport,
  validateCrudImportFileSize,
  autoMapCrudImport,
  previewCrudImport,
} from "core/crud-import";

export default {
  name: "tvue-crud-import",
  mixins: [locale],
  inject: ["crud"],
  data() {
    return {
      visible: false,
      step: 0,
      filename: "",
      sheet: null,
      sheetOptions: null,
      mapping: [],
      preview: [],
      error: "",
      page: 1,
      pageSize: 10,
      excludeInvalid: false,
      parsing: false,
      validating: false,
      submitting: false,
      operation: 0,
      importUnmounted: false,
      validationContext: null,
      previewContext: null,
      columns: [],
    };
  },
  computed: {
    importOptions() {
      return this.crud.tableOption.importOptions || {};
    },
    readOptions() {
      const { headerRow, sheetName, sheetIndex, maxRows, maxFileSize } = this.importOptions;
      return { headerRow, sheetName, sheetIndex, maxRows, maxFileSize };
    },
    busy() {
      return this.parsing || this.validating || this.submitting;
    },
    mappingRows() {
      return this.sheet ? this.sheet.headers.map((source, index) => ({
        index, source, sample: this.sheet.rows[0].values[source],
      })) : [];
    },
    previewColumns() {
      return this.columns.filter(column => this.mapping.includes(column.prop));
    },
    previewPage() {
      return this.preview.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
    },
    invalidCount() {
      return this.preview.filter(item => item.errors.length).length;
    },
    summary() {
      return this.t("crud.import.summary", {
        total: this.preview.length,
        valid: this.preview.length - this.invalidCount,
        invalid: this.invalidCount,
      });
    },
    canSubmit() {
      return !this.busy && this.preview.length > this.invalidCount &&
        (!this.invalidCount || this.excludeInvalid) && this.contextMatches(this.previewContext);
    },
    schemaInputs() {
      return {
        columns: this.getColumnSource(), dictionaries: this.crud.DIC, options: this.importOptions,
        props: this.crud.tableOption.props, mapping: this.mapping,
      };
    },
  },
  watch: {
    readOptions: {
      deep: true,
      handler(value) {
        if (this.visible && this.sheet && !this.submitting && !isModelEqual(value, this.sheetOptions)) this.invalidateFile();
      },
    },
    schemaInputs: {
      deep: true,
      immediate: true,
      handler() {
        this.columns = getCrudDataColumns(this.getColumnSource(), "import");
        if (!this.visible || this.submitting) return;
        if ((this.validationContext && !this.contextMatches(this.validationContext)) ||
            (this.previewContext && !this.contextMatches(this.previewContext))) this.invalidatePreview();
      },
    },
  },
  methods: {
    getColumnSource() {
      return this.crud.tableOption.column === undefined ? this.crud.propOption : (this.crud.tableOption.column || []);
    },
    getValidationInputs() {
      const dictionaries = {};
      this.mapping.forEach(prop => {
        if (prop && Object.prototype.hasOwnProperty.call(this.crud.DIC || {}, prop)) dictionaries[prop] = this.crud.DIC[prop];
      });
      return {
        columnSource: this.getColumnSource(),
        columns: getCrudDataColumns(this.getColumnSource(), "import"), dictionaries,
        options: this.crud.tableOption.importOptions || {},
        props: this.crud.tableOption.props, mapping: this.mapping,
      };
    },
    invalidateFile() {
      this.invalidate();
      this.sheet = null;
      this.sheetOptions = null;
      this.mapping = [];
      this.clearPreview();
      this.step = 0;
      this.error = this.t("crud.import.fileOptionsChanged");
    },
    contextMatches(context) {
      return !!context && isModelEqual(context, this.getValidationInputs());
    },
    invalidatePreview() {
      this.invalidate();
      this.clearPreview();
      if (this.sheet) this.step = 1;
      this.error = this.t("crud.import.contextChanged");
    },
    invalidate() {
      this.operation += 1;
      this.parsing = false;
      this.validating = false;
      this.submitting = false;
    },
    isCurrent(operation) {
      return !this.importUnmounted && this.visible && operation === this.operation;
    },
    handleShow() {
      this.invalidate();
      this.step = 0;
      this.filename = "";
      this.sheet = null;
      this.sheetOptions = null;
      this.mapping = [];
      this.clearPreview();
      this.visible = true;
    },
    handleClose(done) {
      this.invalidate();
      this.visible = false;
      if (typeof done === "function") done();
    },
    clearPreview() {
      this.preview = [];
      this.excludeInvalid = false;
      this.page = 1;
      this.error = "";
      this.validationContext = null;
      this.previewContext = null;
    },
    previous() {
      this.step -= 1;
      this.error = "";
    },
    displayValue(value) {
      if (value === null || value === undefined) return "";
      return typeof value === "object" ? JSON.stringify(value) : String(value);
    },
    issueText(issue) {
      const column = this.columns.find(item => item.prop === issue.prop);
      const label = column ? (column.label || column.prop) + ": " : "";
      return label + (issue.message || this.t("crud.import." + (issue.code || "invalidValue"), issue.params));
    },
    errorText(error, fallback) {
      if (error instanceof CrudImportError) return this.t("crud.import." + error.code, error.params);
      const detail = error && error.message ? error.message : (typeof error === "string" ? error : "");
      if (fallback === "parseFailed" && /xlsx|filereader/i.test(detail)) return this.t("crud.import.readerUnavailable");
      return this.t("crud.import." + fallback) + (detail ? " " + detail : "");
    },
    isMappedElsewhere(prop, index) {
      return this.mapping.some((value, position) => position !== index && value === prop);
    },
    async handleFileChange(upload) {
      const file = (upload && upload.raw) || upload || {};
      this.invalidate();
      const operation = this.operation;
      this.step = 0;
      this.sheet = null;
      this.sheetOptions = null;
      this.mapping = [];
      this.filename = file.name || "";
      this.clearPreview();
      this.parsing = true;
      const readOptions = cloneModel(this.readOptions);
      try {
        validateCrudImportFileSize(file, readOptions);
        if (!this.$Export || typeof this.$Export.xlsx !== "function") throw new CrudImportError("readerUnavailable");
        const parsed = await this.$Export.xlsx(file, {
          ...readOptions, raw: true, defval: "",
        });
        if (!this.isCurrent(operation)) return;
        if (!isModelEqual(readOptions, this.readOptions)) throw new CrudImportError("fileOptionsChanged");
        this.sheet = normalizeCrudImport(parsed, readOptions);
        this.sheetOptions = readOptions;
        this.mapping = autoMapCrudImport(this.sheet.headers, this.columns);
      } catch (error) {
        if (this.isCurrent(operation)) this.error = this.errorText(error, "parseFailed");
      } finally {
        if (this.isCurrent(operation)) this.parsing = false;
      }
    },
    async validateRows() {
      if (!this.sheet || this.busy) return;
      if (!isModelEqual(this.sheetOptions, this.readOptions)) {
        this.invalidateFile();
        return;
      }
      const operation = ++this.operation;
      this.clearPreview();
      const context = cloneModel(this.getValidationInputs());
      this.validationContext = context;
      this.validating = true;
      try {
        const preview = await previewCrudImport(this.sheet, cloneModel(this.mapping), context.columns, context.dictionaries, {
          ...context.options, filename: this.filename, props: context.props,
          requiredMessage: column => this.t("crud.import.required", { field: column.label || column.prop }),
          isCurrent: () => this.isCurrent(operation) && this.contextMatches(context),
        });
        if (!this.isCurrent(operation)) return;
        if (!this.contextMatches(context)) {
          this.invalidatePreview();
          return;
        }
        this.preview = preview;
        this.previewContext = context;
        this.validationContext = null;
        this.step = 2;
      } catch (error) {
        if (this.isCurrent(operation)) {
          if (!this.contextMatches(context)) this.invalidatePreview();
          else this.error = this.errorText(error, "validationFailed");
        }
      } finally {
        if (this.isCurrent(operation)) this.validating = false;
      }
    },
    submitImport() {
      if (this.submitting) return;
      if (this.sheet && !isModelEqual(this.sheetOptions, this.readOptions)) {
        this.invalidateFile();
        return;
      }
      if (this.previewContext && !this.contextMatches(this.previewContext)) {
        this.invalidatePreview();
        return;
      }
      if (!this.canSubmit) return;
      const operation = ++this.operation;
      this.submitting = true;
      this.error = "";
      const rows = this.preview.filter(item => !item.errors.length).map(item => cloneModel(item.row));
      const context = {
        filename: this.filename,
        sheetName: this.sheet.sheetName,
        mapping: this.sheet.headers.map((source, index) => ({ source, target: this.mapping[index] || "" })).filter(item => item.target),
      };
      let settled = false;
      const done = result => {
        if (settled) return;
        settled = true;
        if (!this.isCurrent(operation)) return;
        this.handleClose();
        this.crud.$emit("import-success", cloneModel(rows), result, cloneModel(context));
      };
      const fail = error => {
        if (settled) return;
        settled = true;
        if (!this.isCurrent(operation)) return;
        this.submitting = false;
        this.error = this.errorText(error, "submitFailed");
      };
      try {
        const method = this.crud.tableOption.importMethod;
        if (typeof method === "function") {
          Promise.resolve().then(() => {
            if (!this.isCurrent(operation)) return;
            if (!this.contextMatches(this.previewContext)) {
              fail(new CrudImportError("contextChanged"));
              return;
            }
            return method(cloneModel(rows), cloneModel(context));
          }).then(done).catch(fail);
        } else {
          const listener = this.crud.$.vnode.props && this.crud.$.vnode.props.onImportSubmit;
          if (!(typeof listener === "function" || (Array.isArray(listener) && listener.some(item => typeof item === "function")))) {
            fail(new CrudImportError("noHandler"));
            return;
          }
          this.crud.$emit("import-submit", cloneModel(rows), done, fail, cloneModel(context));
        }
      } catch (error) {
        fail(error);
      }
    },
  },
  beforeUnmount() {
    this.importUnmounted = true;
    this.invalidate();
  },
};
</script>
