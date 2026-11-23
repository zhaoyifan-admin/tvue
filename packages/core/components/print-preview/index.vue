<template>
  <el-dialog
    class="tvue-print-preview"
    :model-value="true"
    :title="t('title')"
    width="min(1200px, 96vw)"
    top="4vh"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="!printing"
    :show-close="!printing"
    @update:model-value="handleVisible"
    @opened="onOpened"
  >
    <div class="tvue-print-preview__body">
      <aside class="tvue-print-preview__settings" :aria-label="t('title')">
        <el-form label-position="top" size="default" :disabled="printing">
          <el-form-item :label="t('paper')">
            <el-select :model-value="layout.paperSize" @update:model-value="change('paperSize', $event)">
              <el-option v-for="paper in papers" :key="paper" :label="paper" :value="paper" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('orientation')">
            <el-radio-group :model-value="layout.orientation" @update:model-value="change('orientation', $event)">
              <el-radio-button label="portrait">{{ t('portrait') }}</el-radio-button>
              <el-radio-button label="landscape">{{ t('landscape') }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <div class="tvue-print-preview__pair">
            <el-form-item :label="t('margin')">
              <el-input-number :model-value="layout.margin" :min="0" :max="40" controls-position="right" @update:model-value="change('margin', $event)" />
            </el-form-item>
            <el-form-item :label="t('fontSize')">
              <el-input-number :model-value="layout.fontSize" :min="8" :max="24" controls-position="right" @update:model-value="change('fontSize', $event)" />
            </el-form-item>
          </div>
          <el-form-item :label="t('documentTitle')">
            <el-input :model-value="layout.title" :disabled="!layout.showTitle" maxlength="200" clearable @update:model-value="change('title', $event)" />
          </el-form-item>
          <el-form-item class="tvue-print-preview__title-toggle">
            <el-checkbox :model-value="layout.showTitle" @update:model-value="change('showTitle', $event)">{{ t('showTitle') }}</el-checkbox>
          </el-form-item>
          <el-form-item v-if="columns.length" :label="t('columns')" class="tvue-print-preview__column-item">
            <el-checkbox-group :model-value="layout.columnIndexes" class="tvue-print-preview__columns" @update:model-value="change('columnIndexes', $event)">
              <el-checkbox
                v-for="column in columns"
                :key="column.index"
                :label="column.index"
                :disabled="layout.columnIndexes.length === 1 && layout.columnIndexes.includes(column.index)"
              >{{ column.label }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <p class="tvue-print-preview__hint">{{ t('hint') }}</p>
      </aside>
      <section class="tvue-print-preview__workspace">
        <div class="tvue-print-preview__toolbar">
          <span class="tvue-print-preview__paper-label">{{ layout.paperSize }} · {{ t(layout.orientation) }}</span>
          <div class="tvue-print-preview__zoom">
            <span>{{ t('zoom') }}</span>
            <el-select v-model="zoom" size="small" :aria-label="t('zoom')" :disabled="printing" @change="updateScale">
              <el-option :label="t('fit')" value="fit" />
              <el-option v-for="value in zoomLevels" :key="value" :label="`${value}%`" :value="value" />
            </el-select>
          </div>
        </div>
        <div ref="viewport" class="tvue-print-preview__viewport" :aria-busy="state.status === 'loading'">
          <div class="tvue-print-preview__sheet" :style="sheetStyle">
            <div ref="frameHost" class="tvue-print-preview__frame-host" :style="frameStyle"></div>
          </div>
          <div v-if="state.status === 'loading' || state.status === 'error'" class="tvue-print-preview__status" :class="{ 'tvue-print-preview__status--error': state.status === 'error' }" role="status">
            <template v-if="state.status === 'error'">
              <p>{{ state.error }}</p>
              <el-button type="primary" plain @click="$emit('retry')">{{ t('retry') }}</el-button>
            </template>
            <template v-else>
              <span class="tvue-print-preview__spinner" aria-hidden="true"></span>
              <p>{{ t('loading') }}</p>
            </template>
          </div>
        </div>
      </section>
    </div>
    <template #footer>
      <div class="tvue-print-preview__footer">
        <span class="tvue-print-preview__footer-hint">{{ t('confirm') }}</span>
        <div class="tvue-print-preview__actions">
          <el-button :disabled="printing" @click="$emit('close')">{{ t('close') }}</el-button>
          <el-button type="primary" :loading="printing" :disabled="state.status !== 'ready'" @click="$emit('print')">{{ t('print') }}</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { ElButton, ElCheckbox, ElCheckboxGroup, ElDialog, ElForm, ElFormItem, ElInput, ElInputNumber, ElOption, ElRadioButton, ElRadioGroup, ElSelect } from 'element-plus';
import locale from 'src/locale';
import { getPrintPageSize } from 'utils/print';

export default defineComponent({
  name: 'tvue-print-preview',
  components: { ElButton, ElCheckbox, ElCheckboxGroup, ElDialog, ElForm, ElFormItem, ElInput, ElInputNumber, ElOption, ElRadioButton, ElRadioGroup, ElSelect },
  props: {
    layout: { type: Object, required: true },
    columns: { type: Array, default: () => [] },
    state: { type: Object, required: true }
  },
  emits: ['change', 'print', 'close', 'retry'],
  data() {
    return {
      papers: ['A4', 'A3', 'Letter'], zoomLevels: [50, 75, 100, 125],
      zoom: 'fit', scale: 1, frameHeight: 1123,
      frame: null,
      viewportObserver: null,
      contentObserver: null,
      destroyed: false
    };
  },
  computed: {
    printing() { return this.state.status === 'printing'; },
    pagePixels() {
      const size = getPrintPageSize(this.layout);
      return { width: size.width / 25.4 * 96, height: size.height / 25.4 * 96 };
    },
    sheetStyle() {
      return { width: `${this.pagePixels.width * this.scale}px`, height: `${this.frameHeight * this.scale}px` };
    },
    frameStyle() {
      return { width: `${this.pagePixels.width}px`, height: `${this.frameHeight}px`, transform: `scale(${this.scale})` };
    }
  },
  watch: {
    'state.status'(value) {
      if (value === 'ready') this.$nextTick(() => { this.observeContent(); this.measureFrame(); });
    },
    layout: { deep: true, handler() { this.$nextTick(this.measureFrame); } }
  },
  mounted() {
    this.$nextTick(this.onOpened);
    window.addEventListener('resize', this.updateScale);
  },
  beforeUnmount() {
    this.destroyed = true;
    this.viewportObserver?.disconnect();
    this.contentObserver?.disconnect();
    window.removeEventListener('resize', this.updateScale);
    this.frame = null;
  },
  methods: {
    t(key) { return locale.t(`printPreview.${key}`); },
    change(key, value) {
      if (this.printing || value === undefined) return;
      if (key === 'columnIndexes' && !value.length) return;
      this.$emit('change', { ...this.layout, [key]: value });
    },
    handleVisible(visible) { if (!visible && !this.printing) this.$emit('close'); },
    onOpened() {
      if (this.destroyed) return;
      const viewport = this.$refs.viewport;
      if (viewport && !this.viewportObserver && typeof ResizeObserver !== 'undefined') {
        this.viewportObserver = new ResizeObserver(() => this.updateScale());
        this.viewportObserver.observe(viewport);
      }
      if (this.frame) this.attachFrame(this.frame);
      this.updateScale();
    },
    attachFrame(frame) {
      if (this.destroyed) return;
      this.contentObserver?.disconnect();
      this.contentObserver = null;
      this.frame = frame;
      this.$nextTick(() => {
        if (this.destroyed || this.frame !== frame) return;
        const host = this.$refs.frameHost;
        if (!host) return;
        if (frame.parentElement !== host) host.replaceChildren(frame);
        frame.removeAttribute('aria-hidden');
        frame.setAttribute('title', String(this.t('title')));
        frame.scrolling = 'no';
        Object.assign(frame.style, {
          display: 'block', position: 'static', opacity: '1', pointerEvents: 'none',
          border: '0', background: '#fff'
        });
        this.observeContent();
        this.measureFrame();
      });
    },
    observeContent() {
      this.contentObserver?.disconnect();
      this.contentObserver = null;
      if (this.destroyed || this.state.status !== 'ready' || !this.frame?.contentDocument?.body || typeof ResizeObserver === 'undefined') return;
      this.contentObserver = new ResizeObserver(() => this.measureFrame());
      this.contentObserver.observe(this.frame.contentDocument.body);
    },
    measureFrame() {
      if (this.destroyed) return;
      if (this.frame) {
        const doc = this.frame.contentDocument;
        this.frame.style.width = `${this.pagePixels.width}px`;
        this.frame.style.height = `${this.pagePixels.height}px`;
        this.frameHeight = Math.ceil(Math.max(this.pagePixels.height, doc?.body?.scrollHeight || 0, doc?.documentElement?.scrollHeight || 0)) + 2;
        this.frame.style.height = `${this.frameHeight}px`;
      } else this.frameHeight = this.pagePixels.height;
      this.updateScale();
    },
    updateScale() {
      if (this.destroyed) return;
      const viewport = this.$refs.viewport;
      this.scale = this.zoom === 'fit'
        ? Math.max(0.1, Math.min(1, ((viewport?.clientWidth || this.pagePixels.width + 48) - 48) / this.pagePixels.width))
        : Number(this.zoom) / 100;
    }
  }
});
</script>
