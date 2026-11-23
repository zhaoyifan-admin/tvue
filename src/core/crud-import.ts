import get from 'lodash/get';
import has from 'lodash/has';
import set from 'lodash/set';
import toPath from 'lodash/toPath';
import dayjs from 'dayjs';
import { cloneModel, isModelEqual } from './model';
import { getCrudDataColumns, validateCrudRow } from './crud-validation';

type AnyRecord = Record<string, any>;
export interface CrudImportIssue {
  prop: string;
  code?: string;
  message?: string;
  params?: AnyRecord;
}
export interface CrudImportSheet {
  headers: string[];
  rows: Array<{ values: AnyRecord; rowNumber: number }>;
  sheetName: string;
}

export class CrudImportError extends Error {
  code: string;
  params: AnyRecord;
  constructor(code: string, params: AnyRecord = {}) {
    super(code);
    this.name = 'CrudImportError';
    this.code = code;
    this.params = params;
  }
}

const empty = (value: any) => value === '' || value === null || value === undefined;
const heading = (value: any) => String(value == null ? '' : value).trim().toLocaleLowerCase();

export const validateCrudImportFileSize = (file: { size?: number }, options: AnyRecord = {}) => {
  const configured = Math.floor(Number(options.maxFileSize));
  const max = Number.isFinite(configured) && configured > 0 ? configured : 10 * 1024 * 1024;
  if (Number.isFinite(file?.size) && file.size! > max) {
    const unit = max >= 1024 * 1024 ? 1024 * 1024 : max >= 1024 ? 1024 : 1;
    const suffix = unit === 1 ? 'B' : unit === 1024 ? 'KiB' : 'MiB';
    throw new CrudImportError('fileTooLarge', { max: `${Number((max / unit).toFixed(2))} ${suffix}` });
  }
};

export const normalizeCrudImport = (parsed: AnyRecord, options: AnyRecord = {}): CrudImportSheet => {
  if (!Array.isArray(parsed?.header) || !Array.isArray(parsed?.results)) throw new CrudImportError('parseFailed');
  const headers = parsed.header.map((value: any) => String(value == null ? '' : value));
  if (!headers.length) throw new CrudImportError('noData');
  const seen = new Set<string>();
  headers.forEach((value: string) => {
    const key = heading(value);
    if (!key || /^unknown \d+$/i.test(key)) throw new CrudImportError('emptyHeader');
    if (seen.has(key)) throw new CrudImportError('duplicateHeader', { header: value });
    seen.add(key);
  });
  const headerRow = Math.max(0, Math.floor(Number(options.headerRow) || 0));
  const rows: CrudImportSheet['rows'] = [];
  parsed.results.forEach((value: AnyRecord, index: number) => {
    if (!value || typeof value !== 'object') throw new CrudImportError('parseFailed');
    if (headers.every((key: string) => empty(value[key]))) return;
    rows.push({
      values: cloneModel(value),
      rowNumber: Number.isInteger(value.__rowNum__) && value.__rowNum__ > headerRow
        ? value.__rowNum__ + 1 : headerRow + index + 2,
    });
  });
  if (!rows.length) throw new CrudImportError('noData');
  const configuredMax = Math.floor(Number(options.maxRows));
  const maxRows = Number.isFinite(configuredMax) && configuredMax > 0 ? configuredMax : 1000;
  if (rows.length > maxRows) throw new CrudImportError('tooManyRows', { max: maxRows });
  return { headers, rows, sheetName: String(parsed.sheetName || '') };
};

export const autoMapCrudImport = (headers: string[], columns: AnyRecord[]): string[] => {
  const used = new Set<string>();
  return headers.map(header => {
    const key = heading(header);
    const propMatches = columns.filter(column => heading(column.prop) === key);
    const matches = propMatches.length ? propMatches : columns.filter(column => heading(column.label) === key);
    if (matches.length !== 1 || used.has(matches[0].prop)) return '';
    used.add(matches[0].prop);
    return matches[0].prop;
  });
};

export const validateCrudImportMapping = (headers: string[], mapping: string[], columns: AnyRecord[]) => {
  const destinations: string[][] = [];
  const overlaps = (left: string[], right: string[]) =>
    left.slice(0, Math.min(left.length, right.length)).every((part, index) => part === right[index]);
  let count = 0;
  mapping.forEach((prop, index) => {
    if (!prop) return;
    const column = columns.find(item => item.prop === prop);
    if (index >= headers.length || !column) throw new CrudImportError('invalidMapping');
    const writes = [[prop]];
    if (column.bind) {
      const bound = toPath(column.bind);
      if (!(bound.length === 1 && bound[0] === prop)) writes.push(bound);
    }
    writes.forEach((path, position) => {
      if (destinations.some(previous => overlaps(previous, path)) ||
          writes.slice(0, position).some(previous => overlaps(previous, path))) {
        throw new CrudImportError('duplicateMapping');
      }
    });
    destinations.push(...writes);
    count += 1;
  });
  if (!count) throw new CrudImportError('mappingRequired');
};

const dictionaryItems = (list: AnyRecord[], childrenKey: string): AnyRecord[] => {
  const result: AnyRecord[] = [];
  (Array.isArray(list) ? list : []).forEach(item => {
    if (!item || typeof item !== 'object') return;
    result.push(item);
    if (Array.isArray(item[childrenKey])) result.push(...dictionaryItems(item[childrenKey], childrenKey));
  });
  return result;
};

const dictionaryValue = (value: any, column: AnyRecord, dictionary: AnyRecord[], props: AnyRecord) => {
  const keys = { value: 'value', label: 'label', children: 'children', ...props, ...column.props };
  const items = dictionaryItems(dictionary, keys.children);
  if (!items.length) return value;
  const exact = items.find(item => isModelEqual(item[keys.value], value));
  if (exact) return cloneModel(exact[keys.value]);
  const values = items.filter(item => !empty(value) && String(item[keys.value]) === String(value).trim());
  if (values.length > 1) throw new CrudImportError('ambiguousDictionary');
  if (values.length === 1) return cloneModel(values[0][keys.value]);
  const labels = items.filter(item => !empty(item[keys.label]) && heading(item[keys.label]) === heading(value));
  if (labels.length !== 1) throw new CrudImportError(labels.length ? 'ambiguousDictionary' : 'invalidDictionary');
  return cloneModel(labels[0][keys.value]);
};

function dateValue(value: any, column: AnyRecord) {
  let date: Date;
  if (value instanceof Date) date = new Date(value.getTime());
  else if (column.type === 'year' && typeof value === 'number' && Number.isInteger(value) && value >= 1000 && value <= 9999) date = new Date(value, 0, 1);
  else if (typeof value === 'number') {
    const serialDay = Math.floor(value);
    // Excel's 1900 date system includes the nonexistent 1900-02-29 (day 60).
    if (serialDay === 60) throw new CrudImportError('invalidDate');
    const leapCorrection = serialDay >= 1 && serialDay < 60 ? 1 : 0;
    date = new Date(1899, 11, 30 + serialDay + leapCorrection, 0, 0, Math.round((value % 1) * 86400));
  }
  else {
    let text = String(value).trim();
    if (column.type === 'time' && /^\d{1,2}:\d{1,2}(?::\d{1,2})?$/.test(text)) text = '1970-01-01 ' + text;
    if (column.type === 'month' && /^\d{4}-\d{1,2}$/.test(text)) text += '-01';
    if (column.type === 'year' && /^\d{4}$/.test(text)) text += '-01-01';
    const parts = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/);
    if (parts) {
      const [, year, month, day, hour = '0', minute = '0', second = '0'] = parts;
      date = new Date(+year, +month - 1, +day, +hour, +minute, +second);
      if (date.getFullYear() !== +year || date.getMonth() !== +month - 1 || date.getDate() !== +day ||
          date.getHours() !== +hour || date.getMinutes() !== +minute || date.getSeconds() !== +second) {
        throw new CrudImportError('invalidDate');
      }
    } else {
      // Avoid locale-dependent parsing of numbers or arbitrary date text.
      if (!/^\d{4}-\d{2}-\d{2}T/.test(text)) throw new CrudImportError('invalidDate');
      const [year, month, day] = text.slice(0, 10).split('-').map(Number);
      const calendar = new Date(year, month - 1, day);
      if (calendar.getFullYear() !== year || calendar.getMonth() !== month - 1 || calendar.getDate() !== day) throw new CrudImportError('invalidDate');
      date = new Date(text);
    }
  }
  if (!Number.isFinite(date.getTime())) throw new CrudImportError('invalidDate');
  if (column.valueFormat === 'timestamp') return date.getTime();
  const formats: AnyRecord = { datetime: 'YYYY-MM-DD HH:mm:ss', time: 'HH:mm:ss', month: 'YYYY-MM', year: 'YYYY' };
  return dayjs(date).format(column.valueFormat || formats[column.type] || 'YYYY-MM-DD');
}

export const convertCrudImportValue = (raw: any, column: AnyRecord, dictionary: AnyRecord[] = [], props: AnyRecord = {}) => {
  if (empty(raw)) return '';
  dictionary = Array.isArray(dictionary) ? dictionary : [];
  const multiple = column.multiple === true || ['checkbox', 'array', 'cascader'].includes(column.type) || column.dataType === 'array';
  let value = cloneModel(raw);
  if (column.dataType === 'json' || multiple) {
    if (typeof value === 'string') {
      const text = value.trim();
      if (column.dataType === 'json' || text.startsWith('[')) {
        try { value = JSON.parse(text); } catch { throw new CrudImportError('invalidJson'); }
      } else value = text.split(column.separator || ',').map((item: string) => item.trim());
    }
    if (multiple && !Array.isArray(value)) value = [value];
  }
  const convertOne = (item: any): any => {
    if (!empty(item) && !dictionary.length && (column.dicUrl || column.dicData !== undefined)) {
      throw new CrudImportError('dictionaryUnavailable');
    }
    let result = dictionaryValue(item, column, dictionary, props);
    if (column.dataType === 'number' || ['number', 'rate', 'slider'].includes(column.type)) {
      if (typeof result !== 'number' && (typeof result !== 'string' || !result.trim())) throw new CrudImportError('invalidNumber');
      result = Number(result);
      if (!Number.isFinite(result)) throw new CrudImportError('invalidNumber');
    } else if (column.dataType === 'boolean' || (column.type === 'switch' && !dictionary.length)) {
      if (typeof result !== 'boolean') {
        const text = String(result).trim().toLowerCase();
        if (['true', '1', 'yes', 'y', '是'].includes(text)) result = true;
        else if (['false', '0', 'no', 'n', '否'].includes(text)) result = false;
        else throw new CrudImportError('invalidBoolean');
      }
    } else if (['date', 'datetime', 'time', 'month', 'year'].includes(column.type)) {
      result = dateValue(result, column);
    } else if (column.dataType === 'string') result = String(result);
    return result;
  };
  return Array.isArray(value) ? value.map(convertOne) : convertOne(value);
};

export const previewCrudImport = async (
  sheet: CrudImportSheet,
  mapping: string[],
  configuredColumns: AnyRecord[],
  dictionaries: AnyRecord = {},
  options: AnyRecord = {},
) => {
  const columns = getCrudDataColumns(configuredColumns, 'import');
  validateCrudImportMapping(sheet.headers, mapping, columns);
  const contextMapping = sheet.headers.map((source, index) => ({ source, target: mapping[index] || '' })).filter(item => item.target);
  const result: Array<{ rowNumber: number; row: AnyRecord; errors: CrudImportIssue[] }> = [];
  const checkCurrent = () => {
    if (typeof options.isCurrent === 'function' && !options.isCurrent()) throw new CrudImportError('cancelled');
  };
  for (const source of sheet.rows) {
    checkCurrent();
    let row: AnyRecord = {};
    const errors: CrudImportIssue[] = [];
    const context = { filename: options.filename || '', sheetName: sheet.sheetName, rowNumber: source.rowNumber, mapping: cloneModel(contextMapping) };
    mapping.forEach((prop, index) => {
      if (!prop) return;
      const column = columns.find(item => item.prop === prop)!;
      try {
        const dictionary = Array.isArray(dictionaries[prop]) ? dictionaries[prop] : (Array.isArray(column.dicData) ? column.dicData : []);
        const value = convertCrudImportValue(source.values[sheet.headers[index]], column, dictionary, options.props);
        row[prop] = value;
        if (column.bind) set(row, toPath(column.bind), cloneModel(value));
      } catch (error) {
        errors.push({ prop, code: error instanceof CrudImportError ? error.code : 'invalidValue' });
      }
    });
    if (!errors.length) {
      try {
        if (typeof options.transform === 'function') {
          const draft = cloneModel(row);
          const transformed = await options.transform(draft, cloneModel(context));
          const converted = transformed === undefined ? draft : transformed;
          if (!converted || typeof converted !== 'object' || Array.isArray(converted)) throw new CrudImportError('invalidTransform');
          row = cloneModel(converted);
        }
        checkCurrent();
        // Bind aliases and their nested destinations are both part of Form's model contract.
        columns.forEach(column => {
          if (column.bind && has(row, toPath(column.bind))) row[column.prop] = cloneModel(get(row, toPath(column.bind)));
        });
        errors.push(...await validateCrudRow(row, columns, { requiredMessage: options.requiredMessage }));
        checkCurrent();
        if (typeof options.validate === 'function') {
          const issues = await options.validate(cloneModel(row), cloneModel(context));
          if (issues === false) errors.push({ prop: '', code: 'invalidRow' });
          else if (typeof issues === 'string') errors.push({ prop: '', message: issues });
          else if (Array.isArray(issues)) issues.forEach(issue => errors.push(typeof issue === 'string' ? { prop: '', message: issue } : issue));
        }
      } catch (error) {
        if (error instanceof CrudImportError && error.code === 'cancelled') throw error;
        errors.push({ prop: '', code: error instanceof CrudImportError ? error.code : 'validationFailed', message: error instanceof CrudImportError ? undefined : String((error as Error)?.message || error) });
      }
    }
    result.push({ rowNumber: source.rowNumber, row, errors });
  }
  return result;
};
