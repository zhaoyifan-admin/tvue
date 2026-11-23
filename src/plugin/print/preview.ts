import { createVNode, nextTick, reactive, render } from 'vue';
import PrintPreview from 'common/components/print-preview/index.vue';
import { normalizePrintLayout, type PrintLayoutOptions } from 'utils/print';

export interface PrintPreviewLayout extends PrintLayoutOptions {
  columnIndexes?: number[];
}

export interface PrintPreviewOptions {
  layout: PrintPreviewLayout;
  columns: Array<{ index: number; label: string }>;
  onChange: (layout: PrintPreviewLayout) => void;
  onPrint: () => boolean;
  onClose: () => void;
  onRetry: () => void;
}

/** 独立挂载预览，避免依赖调用页面的组件注册和 appContext。 */
export const createPrintPreview = (options: PrintPreviewOptions) => {
  const container = document.createElement('div');
  const layout = reactive({
    ...normalizePrintLayout(options.layout),
    columnIndexes: options.layout.columnIndexes?.slice() || options.columns.map(column => column.index)
  });
  const state = reactive({ status: 'loading', error: '' });
  let closed = false;
  let pendingFrame: HTMLIFrameElement | null = null;
  const close = () => {
    if (closed) return;
    closed = true;
    pendingFrame = null;
    render(null, container);
    container.remove();
  };
  const vnode = createVNode(PrintPreview, {
    layout,
    state,
    columns: options.columns,
    onChange: (values: PrintPreviewLayout) => {
      if (closed) return;
      Object.assign(layout, normalizePrintLayout(values), {
        columnIndexes: values.columnIndexes?.slice() || layout.columnIndexes
      });
      options.onChange({ ...layout, columnIndexes: layout.columnIndexes.slice() });
    },
    onPrint: () => { if (!closed) options.onPrint(); },
    onRetry: () => { if (!closed) options.onRetry(); },
    onClose: () => {
      if (closed) return;
      close();
      options.onClose();
    }
  });
  document.body.appendChild(container);
  render(vnode, container);

  return {
    mountFrame(iframe: HTMLIFrameElement) {
      if (closed) return;
      pendingFrame = iframe;
      nextTick(() => {
        if (!closed && pendingFrame === iframe) {
          (vnode.component?.proxy as any)?.attachFrame(iframe);
        }
      });
    },
    setState(status: string, error = '') {
      if (closed) return;
      state.status = status;
      state.error = error;
    },
    close
  };
};
