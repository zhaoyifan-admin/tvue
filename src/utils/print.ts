export type PrintPaperSize = 'A4' | 'A3' | 'Letter';
export type PrintOrientation = 'portrait' | 'landscape';

export interface PrintLayoutOptions {
  paperSize?: PrintPaperSize;
  orientation?: PrintOrientation;
  /** 统一页边距，单位 mm。 */
  margin?: number;
  /** 正文字号，单位 px。 */
  fontSize?: number;
  showTitle?: boolean;
  title?: string;
}

export interface PrintTableOptions extends PrintLayoutOptions {
  documentTitle?: string;
  emptyText?: string;
  hiddenColumnLabels?: string[];
  /** 原始表头叶子列索引；不受同名列、选择列和操作列过滤影响。 */
  columnIndexes?: number[];
}

const PAPER_SIZES: Record<PrintPaperSize, { width: number; height: number }> = {
  A4: { width: 210, height: 297 },
  A3: { width: 297, height: 420 },
  Letter: { width: 215.9, height: 279.4 }
};

const clampSetting = (value: unknown, fallback: number, min: number, max: number) => {
  const number = typeof value === 'number' ? value : NaN;
  return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
};

/** 统一预览与实际打印的页面参数，并限制可进入 CSS 的数值。 */
export const normalizePrintLayout = (options: PrintLayoutOptions = {}): Required<PrintLayoutOptions> => ({
  paperSize: Object.prototype.hasOwnProperty.call(PAPER_SIZES, options.paperSize) ? options.paperSize : 'A4',
  orientation: options.orientation === 'landscape' ? 'landscape' : 'portrait',
  margin: clampSetting(options.margin, 12, 0, 40),
  fontSize: clampSetting(options.fontSize, 12, 8, 24),
  showTitle: options.showTitle !== false,
  title: typeof options.title === 'string' ? options.title : ''
});

/** 纸张尺寸，单位 mm，已根据打印方向交换宽高。 */
export const getPrintPageSize = (options: PrintLayoutOptions = {}) => {
  const layout = normalizePrintLayout(options);
  const paper = PAPER_SIZES[layout.paperSize];
  return layout.orientation === 'landscape'
    ? { width: paper.height, height: paper.width }
    : { ...paper };
};

/** 预览在屏幕中保留纸张边距，实际打印交由 @page 提供同等边距。 */
export const getPrintLayoutCss = (options: PrintLayoutOptions = {}) => {
  const layout = normalizePrintLayout(options);
  const paper = getPrintPageSize(layout);
  return `
      @page { size: ${layout.paperSize} ${layout.orientation}; margin: ${layout.margin}mm; }
      html { box-sizing: border-box; background: #fff; }
      body { margin: 0; color: #1f2937; background: #fff; font: ${layout.fontSize}px/1.5 "Microsoft YaHei", Arial, sans-serif; }
      .tvue-print__content { width: 100%; font-size: ${layout.fontSize}px; }
      .tvue-print__title { margin: 0 0 16px; color: #111827; font-size: ${Math.max(18, layout.fontSize + 8)}px; text-align: center; overflow-wrap: anywhere; }
      @media screen {
        body { box-sizing: border-box; width: ${paper.width}mm; min-height: ${paper.height}mm; padding: ${layout.margin}mm; }
      }
      @media print {
        html, body { width: auto !important; min-height: 0 !important; height: auto !important; padding: 0 !important; }
        .tvue-print__content { width: 100%; }
      }`;
};

type TableCell = HTMLTableCellElement;
type TableRow = Array<TableCell | undefined>;

interface PrintColumn {
  index: number;
  cell: TableCell;
}

const getElement = (source: any): HTMLElement | undefined => {
  if (source instanceof HTMLElement) return source;
  if (source && source.$el instanceof HTMLElement) return source.$el;
  return undefined;
};

const escapeHtml = (value: string) => {
  return value.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return map[char];
  });
};

const getText = (element: Element) => {
  return (element.textContent || '').replace(/\s+/g, ' ').trim();
};

const toAbsoluteUrl = (url: string) => {
  try {
    return new URL(url, document.baseURI).href;
  } catch {
    return url;
  }
};

const getCellMatrix = (row: HTMLTableRowElement): TableRow => {
  const matrix: TableRow = [];
  let index = 0;
  Array.from(row.cells).forEach((cell) => {
    while (matrix[index]) index++;
    const colSpan = Math.max(cell.colSpan || 1, 1);
    for (let offset = 0; offset < colSpan; offset++) {
      matrix[index + offset] = cell;
    }
    index += colSpan;
  });
  return matrix;
};

const getHeaderColumns = (table: HTMLTableElement): PrintColumn[] => {
  const rows = Array.from(table.tHead?.rows || table.rows);
  const matrix: Array<TableRow> = [];

  rows.forEach((row, rowIndex) => {
    let columnIndex = 0;
    Array.from(row.cells).forEach((cell) => {
      while (matrix[rowIndex] && matrix[rowIndex][columnIndex]) columnIndex++;
      const colSpan = Math.max(cell.colSpan || 1, 1);
      const rowSpan = Math.max(cell.rowSpan || 1, 1);
      for (let rowOffset = 0; rowOffset < rowSpan; rowOffset++) {
        const targetRow = rowIndex + rowOffset;
        if (!matrix[targetRow]) matrix[targetRow] = [];
        for (let colOffset = 0; colOffset < colSpan; colOffset++) {
          matrix[targetRow][columnIndex + colOffset] = cell;
        }
      }
      columnIndex += colSpan;
    });
  });

  const lastRow = matrix[matrix.length - 1] || [];
  return lastRow
    .map((cell, index) => (cell ? { index, cell } : undefined))
    .filter((column): column is PrintColumn => Boolean(column));
};

const isControlColumn = (cell: TableCell) => {
  return (
    cell.classList.contains('el-table-column--selection') ||
    cell.classList.contains('el-table-column--expand') ||
    cell.classList.contains('el-table__expand-column') ||
    Boolean(cell.querySelector('.el-checkbox, .el-radio'))
  );
};

const isActionColumn = (column: PrintColumn, rows: TableRow[], options: PrintTableOptions) => {
  const label = getText(column.cell);
  if (options.hiddenColumnLabels?.includes(label)) return true;
  return rows.some((row) => Boolean(row[column.index]?.querySelector('.tvue-crud__menu')));
};

const replaceFieldValue = (element: HTMLElement, source: HTMLElement) => {
  const sourceFields = Array.from(source.querySelectorAll('input, textarea, select'));
  element.querySelectorAll('input, textarea, select').forEach((clonedField, index) => {
    // cloneNode 的默认属性不一定等于当前交互状态，始终从原控件读取实时值。
    const field = sourceFields[index] || clonedField;
    let value = '';
    if (field instanceof HTMLSelectElement) {
      value = Array.from(field.selectedOptions).map((option) => option.text).join('、');
    } else if (field instanceof HTMLInputElement) {
      value = field.type === 'checkbox' || field.type === 'radio' ? (field.checked ? '√' : '') : field.value;
    } else if (field instanceof HTMLTextAreaElement) {
      value = field.value;
    }
    clonedField.replaceWith(document.createTextNode(value));
  });
};

const getCellHtml = (cell: TableCell) => {
  const content = (cell.querySelector('.cell') as HTMLElement | null) || cell;
  const clone = content.cloneNode(true) as HTMLElement;

  replaceFieldValue(clone, content);
  clone
    .querySelectorAll(
      '.no-print, script, style, button, .el-button, .el-checkbox, .el-radio, .el-switch, .caret-wrapper, [data-print-ignore="true"]'
    )
    .forEach((element) => element.remove());
  clone.querySelectorAll('*').forEach((element) => {
    Array.from(element.attributes)
      .filter((attribute) => attribute.name.toLowerCase().startsWith('on'))
      .forEach((attribute) => element.removeAttribute(attribute.name));
  });
  clone.querySelectorAll('a').forEach((link) => {
    link.removeAttribute('href');
    link.style.color = 'inherit';
    link.style.textDecoration = 'none';
  });
  clone.querySelectorAll('img').forEach((image) => {
    const source = image.currentSrc || image.getAttribute('src');
    if (source) image.setAttribute('src', toAbsoluteUrl(source));
    image.removeAttribute('srcset');
    image.setAttribute('loading', 'eager');
    image.style.maxWidth = '100%';
    image.style.maxHeight = '80px';
    image.style.height = 'auto';
  });

  return clone.innerHTML.trim() || escapeHtml(getText(content));
};

const getBodyRows = (table: HTMLTableElement) => {
  const tableRows: HTMLTableRowElement[] = [];
  Array.from(table.tBodies).forEach((body) => {
    tableRows.push(...Array.from(body.rows));
  });
  return tableRows
    .filter((row) => {
      return !row.classList.contains('el-table__expanded-row') && !row.querySelector('.el-table__expanded-cell');
    })
    .map(getCellMatrix);
};

const getTableTitle = (root: HTMLElement, options: PrintTableOptions) => {
  if (typeof options.title === 'string') return options.title;
  const crud = root.closest('.tvue-crud');
  const title = crud?.querySelector('h1, h2, h3, h4, h5, h6');
  return title ? getText(title) : '';
};

const getTablePrintData = (source: any, options: PrintTableOptions) => {
  const root = getElement(source);
  const tableRoot = root?.matches('.el-table') ? root : root?.querySelector('.el-table');
  const headerTable = tableRoot?.querySelector('.el-table__header-wrapper table') as HTMLTableElement | null;
  const bodyTable = tableRoot?.querySelector('.el-table__body-wrapper table') as HTMLTableElement | null;
  if (!root || !headerTable || !bodyTable) return undefined;

  const rows = getBodyRows(bodyTable);
  const columns = getHeaderColumns(headerTable).filter((column) => {
    if (isControlColumn(column.cell)) return false;
    if (isActionColumn(column, rows, options)) return false;
    if (getCellHtml(column.cell)) return true;
    return rows.some((row) => Boolean(row[column.index] && getCellHtml(row[column.index] as TableCell)));
  });
  return { root, rows, columns };
};

/** 所有可打印列，忽略本次 columnIndexes 选择，供预览设置面板使用。 */
export const getTablePrintColumns = (source: any, options: PrintTableOptions = {}) => {
  const table = getTablePrintData(source, options);
  return (table?.columns || []).map((column) => ({
    index: column.index,
    label: getText(column.cell) || `第 ${column.index + 1} 列`
  }));
};

/**
 * 将 Element Plus 表格转为独立的静态 HTML，避免固定列、滚动容器和页面样式影响打印结果。
 */
export const buildTablePrintHtml = (source: any, options: PrintTableOptions = {}) => {
  const table = getTablePrintData(source, options);
  if (!table) return undefined;
  const { root, rows } = table;
  const selectedIndexes = Array.isArray(options.columnIndexes) ? new Set(options.columnIndexes) : undefined;
  const columns = table.columns.filter((column) => !selectedIndexes || selectedIndexes.has(column.index));
  if (columns.length === 0) return undefined;

  const title = getTableTitle(root, options);
  const titleHtml = title && options.showTitle !== false ? `<h1 class="tvue-print__title">${escapeHtml(title)}</h1>` : '';
  const headerHtml = columns
    .map((column) => `<th>${getCellHtml(column.cell)}</th>`)
    .join('');
  const bodyHtml = rows.length
    ? rows
      .map((row) => {
        return `<tr>${columns
          .map((column) => `<td>${row[column.index] ? getCellHtml(row[column.index] as TableCell) : ''}</td>`)
          .join('')}</tr>`;
      })
      .join('')
    : `<tr><td class="tvue-print__empty" colspan="${columns.length}">${escapeHtml(
      options.emptyText || '暂无数据'
    )}</td></tr>`;
  const documentTitle = options.documentTitle || title || document.title;

  return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(documentTitle)}</title>
    <style>
      * { box-sizing: border-box; }
      ${getPrintLayoutCss(options)}
      table { width: 100%; border-collapse: collapse; table-layout: auto; font-size: inherit; }
      thead { display: table-header-group; }
      tr { break-inside: avoid; page-break-inside: avoid; }
      th, td { padding: 8px 10px; border: 1px solid #dcdfe6; vertical-align: middle; word-break: break-word; overflow-wrap: anywhere; }
      th { color: #fff; font-weight: 600; text-align: center; background: #2563eb; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      tbody tr:nth-child(even) { background: #f8fafc; }
      td img { display: inline-block; max-width: 100%; max-height: 80px; object-fit: contain; vertical-align: middle; }
      .tvue-print__empty { padding: 32px; color: #909399; text-align: center; }
    </style>
  </head>
  <body>
    <main class="tvue-print__content">
    ${titleHtml}
    <table>
      <thead><tr>${headerHtml}</tr></thead>
      <tbody>${bodyHtml}</tbody>
    </table>
    </main>
  </body>
</html>`;
};
