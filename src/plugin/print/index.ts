import {
  buildTablePrintHtml, getTablePrintColumns, getPrintLayoutCss,
  normalizePrintLayout, PrintTableOptions,
} from 'utils/print';
import { createPrintPreview } from './preview';

interface PrintOptions extends PrintTableOptions {
  noPrint?: string;
  preview?: boolean;
  timeout?: number;
  onReady?: () => void;
  onBeforePrint?: () => void;
  onAfterPrint?: () => void;
  onClose?: () => void;
  onError?: (error: Error) => void;
  [key: string]: any;
}

const escapeHtml = (value: string) => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

class PrintInstance {
  dom: HTMLElement;
  options: PrintOptions;
  iframe: HTMLIFrameElement | null = null;
  state = 'loading';
  layout: ReturnType<typeof normalizePrintLayout>;
  columns: ReturnType<typeof getTablePrintColumns>;
  private table: boolean;
  private sourceHeadingTitle = '';
  private snapshot: HTMLElement;
  private preview: ReturnType<typeof createPrintPreview> | null = null;
  private revision = 0;
  private readyNotified = false;
  private loadingTimer: ReturnType<typeof setTimeout> | undefined;
  private updateTimer: ReturnType<typeof setTimeout> | undefined;
  private printTimer: ReturnType<typeof setTimeout> | undefined;
  private stopAssets: (() => void) | undefined;
  private stopPrint: (() => void) | undefined;

  constructor(dom: any, options: PrintOptions = {}) {
    this.options = { noPrint: '.no-print', timeout: 15000, preview: true, ...options };
    const element = typeof dom === 'string' ? document.querySelector<HTMLElement>(dom)
      : dom instanceof HTMLElement ? dom : dom?.$el;
    if (!(element instanceof HTMLElement)) throw new TypeError('未找到可打印的 DOM 节点。');
    this.dom = element;
    this.columns = getTablePrintColumns(element, this.options);
    this.table = this.columns.length > 0 || !!element.matches?.('.el-table') || !!element.querySelector('.el-table');
    const sourceHeading = element.querySelector('h1, h2, h3, h4, h5, h6');
    const heading = sourceHeading || element.closest('.tvue-crud')?.querySelector('h1, h2, h3, h4, h5, h6');
    if (options.title === undefined) this.sourceHeadingTitle = sourceHeading?.textContent?.trim() || '';
    this.layout = normalizePrintLayout({ ...this.options, title: options.title ?? heading?.textContent?.trim() ?? '' });
    this.options = { ...this.options, ...this.layout };
    if (this.columns.length && !Array.isArray(options.columnIndexes)) this.options.columnIndexes = this.columns.map(column => column.index);
    this.snapshot = element.cloneNode(true) as HTMLElement;
    this.syncFormState(element, this.snapshot);
    if (this.options.preview !== false) {
      this.preview = createPrintPreview({
        layout: { ...this.layout, columnIndexes: this.options.columnIndexes },
        columns: this.columns,
        onChange: values => this.updateLayout(values),
        onPrint: () => this.print(),
        onClose: () => this.close(),
        onRetry: () => this.load(),
      });
    }
    this.load();
  }

  private setState(state: string, error = '') {
    this.state = state;
    this.preview?.setState(state, error);
  }

  private isState(state: string) { return this.state === state; }

  private notifyError(error: unknown) {
    const normalized = error instanceof Error ? error : new Error(String(error || '打印失败。'));
    try {
      if (typeof this.options.onError === 'function') this.options.onError(normalized);
      else console.error(normalized);
    } catch (callbackError) { console.error(callbackError); }
    return normalized;
  }

  private fail(error: unknown) {
    if (this.state === 'closed') return;
    this.cancelLoading();
    const normalized = this.notifyError(error);
    if (this.state === 'closed') return;
    this.setState('error', normalized.message);
    if (this.options.preview === false) this.close();
  }

  private cancelLoading() {
    window.clearTimeout(this.loadingTimer);
    this.stopAssets?.();
    this.stopAssets = undefined;
    if (this.iframe) { this.iframe.onload = null; this.iframe.onerror = null; }
  }

  updateLayout(values: Partial<PrintOptions>) {
    if (this.state === 'closed' || this.state === 'printing') return;
    this.layout = normalizePrintLayout({ ...this.layout, ...values });
    this.options = { ...this.options, ...this.layout };
    if (Array.isArray(values.columnIndexes)) this.options.columnIndexes = [...values.columnIndexes];
    ++this.revision;
    this.cancelLoading();
    this.setState('loading');
    window.clearTimeout(this.updateTimer);
    this.updateTimer = window.setTimeout(() => this.load(), 180);
  }

  private load() {
    if (this.state === 'closed' || this.state === 'printing') return;
    window.clearTimeout(this.updateTimer);
    const revision = ++this.revision;
    this.cancelLoading();
    this.setState('loading');
    try {
      const content = buildTablePrintHtml(this.snapshot, this.options);
      if (this.table && !content) throw new Error('请至少选择一列打印内容。');
      this.writeIframe(content || this.getDocumentHtml(), revision);
    } catch (error) { this.fail(error); }
  }

  private syncFormState(source: HTMLElement, clone: HTMLElement) {
    const originals = [source, ...Array.from(source.querySelectorAll('input, textarea, select'))];
    const copies = [clone, ...Array.from(clone.querySelectorAll('input, textarea, select'))];
    originals.forEach((field, index) => {
      const target = copies[index];
      if (field instanceof HTMLInputElement && target instanceof HTMLInputElement) {
        target.value = field.value;
        target.setAttribute('value', field.value);
        target.checked = field.checked;
        if (field.checked) target.setAttribute('checked', '');
        else target.removeAttribute('checked');
      } else if (field instanceof HTMLTextAreaElement && target instanceof HTMLTextAreaElement) {
        target.value = field.value;
        target.textContent = field.value;
      } else if (field instanceof HTMLSelectElement && target instanceof HTMLSelectElement) {
        Array.from(target.options).forEach((option, position) => {
          option.selected = !!field.options[position]?.selected;
          if (option.selected) option.setAttribute('selected', '');
          else option.removeAttribute('selected');
        });
      }
    });
  }

  private getDocumentHtml() {
    const clone = this.snapshot.cloneNode(true) as HTMLElement;
    const noPrint = this.options.noPrint;
    if (noPrint) {
      try { clone.querySelectorAll(noPrint).forEach(node => node.remove()); } catch { /* Keep valid print content. */ }
    }
    clone.querySelectorAll('script, noscript, style, [data-print-ignore="true"]').forEach(node => node.remove());
    [clone, ...Array.from(clone.querySelectorAll('*'))].forEach(node => {
      Array.from(node.attributes).filter(attribute => attribute.name.toLowerCase().startsWith('on'))
        .forEach(attribute => node.removeAttribute(attribute.name));
      if (node.tagName.toLowerCase() === 'img') node.setAttribute('loading', 'eager');
    });
    if (this.sourceHeadingTitle && this.layout.showTitle && this.layout.title === this.sourceHeadingTitle) {
      const heading = clone.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading?.textContent?.trim() === this.sourceHeadingTitle) heading.remove();
    }
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]')).map(node => node.outerHTML).join('');
    const title = this.layout.showTitle && this.layout.title
      ? `<h1 class="tvue-print__title">${escapeHtml(this.layout.title)}</h1>` : '';
    return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><base href="${escapeHtml(document.baseURI)}"><title>${escapeHtml(this.options.documentTitle || this.layout.title || document.title || '打印预览')}</title>${styles}<style>
      ${getPrintLayoutCss(this.layout)}
      ${noPrint || '.no-print'}{display:none !important;}
      .tvue-print-root{max-width:100%;box-sizing:border-box;}
      .tvue-print__content{--el-font-size-base:${this.layout.fontSize}px;--el-font-size-small:${this.layout.fontSize}px;}
      .tvue-print__content input,.tvue-print__content textarea,.tvue-print__content select{font:inherit;}
      @media print{.tvue-print-root{margin:0 !important;}}
    </style></head><body><main class="tvue-print__content">${title}<div class="tvue-print-root">${clone.outerHTML}</div></main></body></html>`;
  }

  private writeIframe(content: string, revision: number) {
    let created = false;
    if (!this.iframe) {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('title', '打印预览');
      iframe.setAttribute('sandbox', 'allow-same-origin allow-modals');
      this.iframe = iframe;
      created = true;
      if (!this.preview) {
        iframe.setAttribute('aria-hidden', 'true');
        iframe.setAttribute('style', 'position:fixed;width:1px;height:1px;right:0;bottom:0;border:0;opacity:0;pointer-events:none;');
      }
    }
    const iframe = this.iframe;
    let started = false;
    const timeout = Number(this.options.timeout);
    this.loadingTimer = window.setTimeout(() => {
      if (revision === this.revision) this.fail(new Error('打印内容加载超时。'));
    }, Number.isFinite(timeout) && timeout > 0 ? timeout : 15000);
    iframe.onload = () => {
      if (started || revision !== this.revision || this.state === 'closed') return;
      started = true;
      const doc = iframe.contentDocument;
      if (!doc || !iframe.contentWindow) { this.fail(new Error('无法创建打印窗口。')); return; }
      this.stopAssets = this.waitForAssets(doc, () => {
        if (revision !== this.revision || this.state === 'closed') return;
        this.cancelLoading();
        this.setState('ready');
        try {
          if (!this.readyNotified) { this.readyNotified = true; this.options.onReady?.(); }
          if (revision !== this.revision || this.state !== 'ready') return;
          if (this.options.preview === false) this.print();
        } catch (error) { this.fail(error); }
      });
    };
    iframe.onerror = () => { if (revision === this.revision) this.fail(new Error('打印内容加载失败。')); };
    iframe.srcdoc = content;
    if (created) {
      if (this.preview) this.preview.mountFrame(iframe);
      else document.body.appendChild(iframe);
    }
  }

  private waitForAssets(doc: Document, done: () => void) {
    let canceled = false;
    const remove: Array<() => void> = [];
    const loaded = Array.from(doc.images).map(image => new Promise<void>(resolve => {
      image.loading = 'eager';
      if (image.complete) { resolve(); return; }
      const settle = () => { image.removeEventListener('load', settle); image.removeEventListener('error', settle); resolve(); };
      image.addEventListener('load', settle);
      image.addEventListener('error', settle);
      remove.push(() => { image.removeEventListener('load', settle); image.removeEventListener('error', settle); });
    }));
    const fonts = Promise.resolve(doc.fonts?.ready).catch(() => undefined);
    Promise.all([...loaded, fonts]).then(() => { if (!canceled) done(); });
    return () => { canceled = true; remove.forEach(stop => stop()); };
  }

  print() {
    if (this.state !== 'ready' || !this.iframe?.contentWindow) return false;
    const frameWindow = this.iframe.contentWindow;
    this.setState('printing');
    try {
      this.options.onBeforePrint?.();
      if (!this.isState('printing')) return false;
      let finished = false;
      const finish = (nativeEvent: boolean) => {
        if (finished || this.state === 'closed') return;
        finished = true;
        this.stopPrint?.();
        this.stopPrint = undefined;
        this.setState('ready');
        try { if (nativeEvent) this.options.onAfterPrint?.(); } catch (error) { this.notifyError(error); }
        if (this.options.preview === false) this.close();
      };
      const afterPrint = () => finish(true);
      frameWindow.addEventListener('afterprint', afterPrint);
      this.printTimer = window.setTimeout(() => finish(false), 60000);
      this.stopPrint = () => { window.clearTimeout(this.printTimer); frameWindow.removeEventListener('afterprint', afterPrint); };
      frameWindow.focus();
      frameWindow.print();
      return true;
    } catch (error) {
      this.stopPrint?.();
      this.stopPrint = undefined;
      this.fail(error);
      return false;
    }
  }

  close() {
    if (this.state === 'closed') return;
    ++this.revision;
    this.cancelLoading();
    window.clearTimeout(this.updateTimer);
    this.stopPrint?.();
    this.stopPrint = undefined;
    this.setState('closed');
    this.iframe?.remove();
    this.iframe = null;
    this.preview?.close();
    this.preview = null;
    try { this.options.onClose?.(); } catch (error) { console.error(error); }
  }

  destroy() { this.close(); }
}

/** 保持函数调用与 new $Print(dom, options) 两种历史调用方式。 */
function Print(dom: any, options: PrintOptions = {}) { return new PrintInstance(dom, options); }
export default Print;
