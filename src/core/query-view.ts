import { cloneModel, isModelEqual } from './model';
import type { TvueColumnState, TvueColumnStateItem } from './column-state';

type AnyRecord = Record<string, any>;
export interface TvueQuerySort { prop: string; order: 'ascending' | 'descending' }
export interface TvueQueryView {
  version: 1;
  id: string;
  name: string;
  search: AnyRecord;
  emptySearchFields?: string[];
  searchDatePaths?: string[][];
  fields: string[];
  sort: TvueQuerySort | null;
  filters: Record<string, any[]>;
  columns: TvueColumnState;
  pageSize?: number;
}

const PREFIX = 'TVUE_QUERY_VIEWS:';
let nextId = 0;
const own = (value: any, key: string) => Object.prototype.hasOwnProperty.call(value || {}, key);
const isRecord = (value: any): value is AnyRecord =>
  !!value && Object.prototype.toString.call(value) === '[object Object]';

const getSearchDatePaths = (search: AnyRecord) => {
  const paths: string[][] = [];
  const ancestors = new WeakSet<object>();
  const visit = (value: any, path: string[]) => {
    if (value instanceof Date) {
      if (Number.isFinite(value.getTime())) paths.push(path);
      return;
    }
    if (!value || typeof value !== 'object' || ancestors.has(value)) return;
    ancestors.add(value);
    Object.keys(value).forEach((key) => visit(value[key], [...path, key]));
    ancestors.delete(value);
  };
  visit(search, []);
  return paths;
};

const restoreSearchDates = (search: AnyRecord, paths: any) => {
  if (!Array.isArray(paths)) return;
  paths.forEach((path) => {
    if (!Array.isArray(path) || !path.length || path.some((key) => typeof key !== 'string')) return;
    let parent = search;
    for (const key of path.slice(0, -1)) {
      if (!parent || typeof parent !== 'object' || !own(parent, key)) return;
      parent = parent[key];
    }
    const key = path[path.length - 1];
    if (!parent || typeof parent !== 'object' || !own(parent, key) || typeof parent[key] !== 'string') return;
    const value = new Date(parent[key]);
    if (Number.isFinite(value.getTime())) Object.defineProperty(parent, key, {
      value, enumerable: true, writable: true, configurable: true,
    });
  });
};

export class QueryViewError extends Error {
  code: string;
  constructor(code: string) { super(code); this.code = code; }
}

export const queryViewColumns = (columns: AnyRecord[] | AnyRecord = []): AnyRecord[] => {
  const list = Array.isArray(columns) ? columns : Object.keys(columns || {}).map((prop) => ({
    ...(columns[prop] || {}), prop: columns[prop]?.prop || prop,
  }));
  return list.filter((column) => column && typeof column === 'object');
};

export const queryViewLeafColumns = (columns: AnyRecord[] | AnyRecord = []): AnyRecord[] => {
  const result: AnyRecord[] = [];
  queryViewColumns(columns).forEach((column) => {
    if (Array.isArray(column.children) && column.children.length) result.push(...queryViewLeafColumns(column.children));
    else if (typeof column.prop === 'string') result.push(column);
  });
  return result;
};

const queryViewLayoutProps = (columns: AnyRecord[] | AnyRecord = []): Set<string> => {
  const result = new Set<string>();
  queryViewColumns(columns).forEach((column) => {
    if (typeof column.prop === 'string') result.add(column.prop);
    if (Array.isArray(column.children)) queryViewLayoutProps(column.children).forEach((prop) => result.add(prop));
  });
  return result;
};

const LAYOUT_KEYS = ['hide', 'fixed', 'width'] as const;

// Query views restore presentation only. Filter choices and sorting capabilities
// belong to the current schema, including when reading older column-state data.
export const createQueryColumnState = (columns: AnyRecord[] | AnyRecord = []): TvueColumnState => {
  const state: TvueColumnState = { version: 1, columns: [] };
  const visit = (list: AnyRecord[]) => {
    list.forEach((column, order) => {
      if (typeof column.prop === 'string') {
        const item: TvueColumnStateItem = { prop: column.prop, order };
        LAYOUT_KEYS.forEach((key) => {
          if (column[key] !== undefined) Object.assign(item, { [key]: cloneModel(column[key]) });
        });
        state.columns.push(item);
      }
      if (Array.isArray(column.children)) visit(column.children);
    });
  };
  visit(queryViewColumns(columns));
  return state;
};

export const applyQueryColumnState = (columns: AnyRecord[], state?: TvueColumnState) => {
  if (!state || !Array.isArray(state.columns)) return columns;
  const saved = new Map(state.columns.filter((item) => item && typeof item.prop === 'string')
    .map((item) => [item.prop, item]));
  const visit = (list: AnyRecord[]) => {
    const originalOrder = new Map(list.map((column, index) => [column, index]));
    list.forEach((column) => {
      const item = saved.get(column.prop);
      if (item) LAYOUT_KEYS.forEach((key) => {
        if (item[key] !== undefined) column[key] = cloneModel(item[key]);
      });
      if (Array.isArray(column.children)) visit(column.children);
    });
    list.sort((left, right) => {
      const leftOrder = saved.get(left.prop)?.order;
      const rightOrder = saved.get(right.prop)?.order;
      return (Number.isFinite(leftOrder) ? leftOrder : originalOrder.get(left)) -
        (Number.isFinite(rightOrder) ? rightOrder : originalOrder.get(right)) ||
        originalOrder.get(left) - originalOrder.get(right);
    });
  };
  visit(columns);
  return columns;
};

export const queryViewFields = (columns: AnyRecord[] | AnyRecord = []) => {
  const fields: string[] = [];
  queryViewLeafColumns(columns).forEach((column) => {
    fields.push(column.prop);
    if (column.searchProp) fields.push(column.searchProp);
  });
  return Array.from(new Set(fields));
};

export const normalizeQuerySort = (value: any, props?: Set<string>): TvueQuerySort | null => {
  const prop = value && (value.prop || value.property);
  return typeof prop === 'string' && (!props || props.has(prop)) &&
    ['ascending', 'descending'].includes(value.order)
    ? { prop, order: value.order } : null;
};

export const normalizeQueryViews = (input: any): TvueQueryView[] => {
  if (input == null) return [];
  const list = Array.isArray(input) ? input : input.version === 1 ? input.views : null;
  if (!Array.isArray(list)) throw new QueryViewError('invalidCache');
  const ids = new Set<string>();
  const names = new Set<string>();
  return list.map((item) => {
    if (!isRecord(item) || typeof item.id !== 'string' || !item.id ||
        typeof item.name !== 'string' || !item.name.trim() || !isRecord(item.search) ||
        (item.version !== undefined && item.version !== 1)) throw new QueryViewError('invalidCache');
    const name = item.name.trim();
    if (ids.has(item.id) || names.has(name.toLowerCase())) throw new QueryViewError('invalidCache');
    ids.add(item.id);
    names.add(name.toLowerCase());
    const filters: Record<string, any[]> = {};
    const search = cloneModel(item.search);
    // JSON omits undefined object values. Keep explicit clears distinct from
    // fields introduced by a later schema, which should retain their defaults.
    (Array.isArray(item.emptySearchFields) ? item.emptySearchFields : []).forEach((prop) => {
      if (typeof prop === 'string' && !own(search, prop)) search[prop] = undefined;
    });
    const emptySearchFields = Object.keys(search).filter((prop) => search[prop] === undefined);
    // Only fields recorded as real Dates are revived. ISO business strings
    // without date metadata retain their original model type.
    restoreSearchDates(search, item.searchDatePaths);
    const searchDatePaths = getSearchDatePaths(search);
    Object.keys(item.filters || {}).forEach((prop) => {
      if (Array.isArray(item.filters[prop])) filters[prop] = cloneModel(item.filters[prop]);
    });
    return {
      version: 1,
      id: item.id,
      name,
      search,
      ...(emptySearchFields.length ? { emptySearchFields } : {}),
      ...(searchDatePaths.length ? { searchDatePaths } : {}),
      fields: Array.isArray(item.fields) ? item.fields.filter((prop) => typeof prop === 'string') : [],
      sort: normalizeQuerySort(item.sort),
      filters,
      columns: cloneModel(item.columns && Array.isArray(item.columns.columns)
        ? item.columns : { version: 1, columns: [] }),
      ...(Number.isFinite(item.pageSize) && item.pageSize > 0 ? { pageSize: item.pageSize } : {}),
    };
  });
};

export const upsertQueryView = (views: TvueQueryView[], value: AnyRecord, name: string, id?: string) => {
  const trimmed = typeof name === 'string' ? name.trim() : '';
  if (!trimmed) throw new QueryViewError('invalidName');
  if (id && !views.some((view) => view.id === id)) throw new QueryViewError('notFound');
  if (views.some((view) => view.id !== id && view.name.toLowerCase() === trimmed.toLowerCase())) {
    throw new QueryViewError('duplicateName');
  }
  const view = normalizeQueryViews([{ ...cloneModel(value), version: 1,
    id: id || `qv-${Date.now().toString(36)}-${(++nextId).toString(36)}`, name: trimmed }])[0];
  return { view, views: id ? views.map((item) => item.id === id ? view : cloneModel(item)) : [...cloneModel(views), view] };
};

// Saved schema fields can be dropped after a column is removed; custom-slot
// keys were never schema fields and remain valid across table revisions.
export const resolveQueryView = (view: TvueQueryView, defaults: TvueQueryView, columns: AnyRecord[]) => {
  const result = cloneModel(view);
  const fields = new Set(queryViewFields(columns));
  const leaves = new Map(queryViewLeafColumns(columns).map((column) => [column.prop, column]));
  const props = new Set<string>(leaves.keys());
  const layoutProps = queryViewLayoutProps(columns);
  const search: AnyRecord = {};
  Object.keys(defaults.search).forEach((prop) => {
    if (!defaults.fields.includes(prop) || fields.has(prop)) search[prop] = cloneModel(defaults.search[prop]);
  });
  Object.keys(view.search).forEach((prop) => {
    if (!view.fields.includes(prop) || fields.has(prop)) search[prop] = cloneModel(view.search[prop]);
  });
  result.search = search;
  result.sort = normalizeQuerySort(view.sort, props);
  if (result.sort && leaves.get(result.sort.prop)?.sortable === false) result.sort = null;
  result.filters = {};
  Object.keys(view.filters).forEach((prop) => {
    const column = leaves.get(prop);
    if (!column || column.filters === false) return;
    if (Array.isArray(column.filters)) {
      const choices = column.filters.filter((item: any) => item && own(item, 'value'));
      const selected = view.filters[prop].filter((value) =>
        choices.some((item: any) => isModelEqual(item.value, value)));
      if (selected.length) result.filters[prop] = cloneModel(selected);
    } else result.filters[prop] = cloneModel(view.filters[prop]);
  });
  result.columns.columns = result.columns.columns.filter((column) => column && layoutProps.has(column.prop));
  return result;
};

export const getQueryViewStorageKey = (key: string) => `${PREFIX}${key}`;
export const normalizeQueryViewStorage = (type?: string) =>
  type === 'session' || type === 'sessionStorage' ? 'sessionStorage' : 'localStorage';
const storageFor = (type?: string) => {
  if (typeof window === 'undefined') return null;
  return normalizeQueryViewStorage(type) === 'sessionStorage' ? window.sessionStorage : window.localStorage;
};

export const loadQueryViews = (key: string, type?: string): { views: TvueQueryView[]; error?: string } => {
  if (!key) return { views: [] };
  let raw: string;
  try {
    const storage = storageFor(type);
    if (!storage) return { views: [], error: 'storageUnavailable' };
    raw = storage.getItem(getQueryViewStorageKey(key));
  } catch { return { views: [], error: 'storageUnavailable' }; }
  if (!raw) return { views: [] };
  try { return { views: normalizeQueryViews(JSON.parse(raw)) }; }
  catch { return { views: [], error: 'invalidCache' }; }
};

export const saveQueryViews = (key: string, views: TvueQueryView[], type?: string): { error?: string } => {
  if (!key) return {};
  try {
    const storage = storageFor(type);
    if (!storage) return { error: 'storageUnavailable' };
    storage.setItem(getQueryViewStorageKey(key), JSON.stringify({ version: 1, views: normalizeQueryViews(views) }));
    return {};
  } catch { return { error: 'storageUnavailable' }; }
};

export const clearPreviousQuery = (current: AnyRecord, next: AnyRecord) => {
  const result = cloneModel(next);
  Object.keys(current || {}).forEach((prop) => {
    if (own(next, prop)) return;
    const value = current[prop];
    result[prop] = Array.isArray(value) ? [] : isRecord(value) ? {} :
      typeof value === 'number' || typeof value === 'boolean' ? undefined : value == null ? value : '';
  });
  return result;
};
