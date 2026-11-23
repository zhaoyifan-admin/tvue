import { cloneModel } from 'core/model';
import { formInitVal } from 'core/dataformat';
import {
  applyQueryColumnState, clearPreviousQuery, createQueryColumnState,
  loadQueryViews, normalizeQuerySort, normalizeQueryViews, normalizeQueryViewStorage,
  queryViewColumns, queryViewFields, queryViewLeafColumns, QueryViewError, resolveQueryView,
  saveQueryViews, upsertQueryView, TvueQueryView
} from 'core/query-view';

interface QueryViewSettings {
  key: string;
  storage: string;
  load?: (key: string) => any;
  save?: (views: TvueQueryView[], key: string) => any;
}
interface Runtime {
  unmounted: boolean;
  epoch: number;
  load: number;
  write: number;
  apply: number;
  loadedEpoch?: number;
  settings?: QueryViewSettings;
  context?: string;
  defaults?: TvueQueryView;
  defaultsByKey: Map<string, TvueQueryView>;
  sortCaptured?: boolean;
  memory: Map<string, TvueQueryView[]>;
  writes: Map<string, Promise<any>>;
}
const runtimes = new WeakMap<object, Runtime>();
const runtimeFor = (safe: object) => {
  let state = runtimes.get(safe);
  if (!state) {
    state = { unmounted: false, epoch: 0, load: 0, write: 0, apply: 0,
      memory: new Map(), defaultsByKey: new Map(), writes: new Map() };
    runtimes.set(safe, state);
  }
  return state;
};
const memoryKey = (settings: QueryViewSettings) => `${settings.storage}:${settings.key}`;
const sameSettings = (left?: QueryViewSettings, right?: QueryViewSettings) =>
  left && right && left.key === right.key && left.storage === right.storage &&
  left.load === right.load && left.save === right.save;
const isPreparedCurrent = ({ state, epoch, write }: any) =>
  !state.unmounted && state.epoch === epoch && (write === undefined || state.write === write);

export default {
  emits: ['query-view-change'],
  data() {
    return {
      queryViews: [] as TvueQueryView[],
      activeQueryViewId: '',
      queryViewLoading: false,
      queryViewApplying: false,
      queryViewSort: null,
      queryViewFilters: {},
      queryViewError: '',
      queryViewErrorDetail: null,
    };
  },
  watch: {
    tableOption() { this.initializeQueryViews(); },
  },
  mounted() { this.initializeQueryViews(); },
  beforeUnmount() {
    const state = runtimeFor(this);
    state.unmounted = true;
    state.epoch++;
    state.load++;
    state.write++;
    state.apply++;
  },
  methods: {
    captureQuerySort(this: any, value: any) {
      if (!this.queryViewEnabled || this.queryViewApplying) return;
      runtimeFor(this).sortCaptured = true;
      this.queryViewSort = normalizeQuerySort(value);
    },
    captureQueryFilters(this: any, filters: Record<string, any[]>) {
      if (!this.queryViewEnabled || this.queryViewApplying) return;
      const next = cloneModel(this.queryViewFilters);
      Object.keys(filters || {}).forEach((prop) => {
        if (Array.isArray(filters[prop])) next[prop] = cloneModel(filters[prop]);
      });
      this.queryViewFilters = next;
    },
    getQueryViewSnapshot(this: any): TvueQueryView {
      const columns = this.columnOption || queryViewColumns(this.tableOption.column);
      return cloneModel({
        version: 1, id: '', name: '',
        search: this.search || {},
        fields: queryViewFields(columns),
        sort: this.queryViewSort,
        filters: this.queryViewFilters,
        columns: createQueryColumnState(columns),
        pageSize: this.page?.pageSize || this.$refs.tablePage?.defaultPage?.pageSize || 10,
      });
    },
    setQueryViewError(this: any, error: any, fallback: string) {
      this.queryViewError = error instanceof QueryViewError ? error.code : fallback;
      this.queryViewErrorDetail = error || null;
    },
    async prepareQueryViews(this: any) {
      // HeaderSearch publishes its form defaults after mounting. Two Vue
      // flushes capture those defaults without delaying normal CRUD startup.
      await this.$nextTick();
      await this.$nextTick();
      const state = runtimeFor(this);
      if (state.unmounted || !this.queryViewEnabled) return null;
      const option = this.tableOption;
      const settings: QueryViewSettings = {
        key: String(option.queryViewKey || option.tableId || option.columnStateKey || ''),
        storage: normalizeQueryViewStorage(option.queryViewStorage),
        load: option.queryViewLoad,
        save: option.queryViewSave,
      };
      if (!sameSettings(state.settings, settings)) {
        const context = memoryKey(settings);
        if (state.context !== context) {
          const previousContext = state.context;
          state.context = context;
          state.defaults = cloneModel(state.defaultsByKey.get(context));
          if (previousContext !== undefined || !state.sortCaptured) {
            this.queryViewSort = normalizeQuerySort(option.defaultSort);
          }
          const filters: Record<string, any[]> = {};
          queryViewLeafColumns(this.columnOption || []).forEach((column: any) => {
            if (Array.isArray(column.filteredValue)) filters[column.prop] = cloneModel(column.filteredValue);
          });
          this.queryViewFilters = previousContext === undefined
            ? { ...filters, ...this.queryViewFilters } : filters;
        }
        state.epoch++;
        state.load++;
        state.write++;
        state.apply++;
        state.settings = settings;
        this.queryViews = cloneModel(state.memory.get(memoryKey(settings)) || []);
        this.activeQueryViewId = '';
        this.queryViewLoading = false;
        this.queryViewApplying = false;
      }
      if (!state.defaults) {
        state.defaults = this.getQueryViewSnapshot();
        state.defaultsByKey.set(memoryKey(settings), cloneModel(state.defaults));
      }
      return { state, settings, epoch: state.epoch };
    },
    async initializeQueryViews(this: any) {
      if (!this.queryViewEnabled) {
        const state = runtimeFor(this);
        if (state.settings) {
          state.epoch++;
          state.settings = undefined;
          this.queryViewLoading = false;
          this.queryViewApplying = false;
        }
        return;
      }
      const prepared = await this.prepareQueryViews();
      if (!prepared || prepared.state.loadedEpoch === prepared.epoch) return;
      prepared.state.loadedEpoch = prepared.epoch;
      await this.reloadQueryViews();
    },
    async reloadQueryViews(this: any) {
      const prepared = await this.prepareQueryViews();
      if (!prepared) return null;
      const { state, settings, epoch } = prepared;
      const token = ++state.load;
      state.write++;
      state.loadedEpoch = epoch;
      this.queryViewLoading = true;
      this.queryViewError = '';
      this.queryViewErrorDetail = null;
      const current = () => !state.unmounted && state.epoch === epoch && state.load === token;
      try {
        await (state.writes.get(memoryKey(settings)) || Promise.resolve()).catch(() => {});
        if (!current()) return null;
        let views = state.memory.get(memoryKey(settings)) || [];
        let warning = settings.key ? '' : 'memoryOnly';
        if (settings.key) {
          if (typeof settings.load === 'function') views = normalizeQueryViews(await settings.load(settings.key));
          else {
            const result = loadQueryViews(settings.key, settings.storage);
            views = result.error ? views : result.views;
            warning = result.error || '';
          }
        }
        if (!current()) return null;
        this.queryViews = cloneModel(views);
        state.memory.set(memoryKey(settings), cloneModel(views));
        if (!views.some((view: TvueQueryView) => view.id === this.activeQueryViewId)) this.activeQueryViewId = '';
        this.queryViewError = warning;
        return cloneModel(views);
      } catch (error) {
        if (current()) this.setQueryViewError(error, 'loadFailed');
        return null;
      } finally { if (current()) this.queryViewLoading = false; }
    },
    async persistQueryViews(this: any, views: TvueQueryView[], prepared: any) {
      const { state, settings, epoch } = prepared;
      const token = ++state.write;
      prepared.write = token;
      state.load++;
      this.queryViewLoading = true;
      this.queryViewError = '';
      this.queryViewErrorDetail = null;
      const current = () => !state.unmounted && state.epoch === epoch && state.write === token;
      const context = memoryKey(settings);
      const write = (state.writes.get(context) || Promise.resolve()).catch(() => {}).then(async () => {
        if (!current()) return false;
        let warning = settings.key ? '' : 'memoryOnly';
        if (settings.key) {
          if (typeof settings.save === 'function') await settings.save(cloneModel(views), settings.key);
          else warning = saveQueryViews(settings.key, views, settings.storage).error || '';
        }
        if (!current()) return false;
        state.memory.set(memoryKey(settings), cloneModel(views));
        this.queryViews = cloneModel(views);
        this.queryViewError = warning;
        return true;
      });
      state.writes.set(context, write);
      try { return await write; }
      catch (error) {
        if (current()) this.setQueryViewError(error, 'saveFailed');
        return false;
      } finally { if (current()) this.queryViewLoading = false; }
    },
    async saveQueryView(this: any, name: string, id?: string) {
      const prepared = await this.prepareQueryViews();
      if (!prepared) return null;
      try {
        const result = upsertQueryView(this.queryViews, this.getQueryViewSnapshot(), name, id);
        if (!await this.persistQueryViews(result.views, prepared) || !isPreparedCurrent(prepared)) return null;
        this.activeQueryViewId = result.view.id;
        return cloneModel(result.view);
      } catch (error) { this.setQueryViewError(error, 'saveFailed'); return null; }
    },
    async renameQueryView(this: any, id: string, name: string) {
      const prepared = await this.prepareQueryViews();
      if (!prepared) return null;
      try {
        const view = this.queryViews.find((item: TvueQueryView) => item.id === id);
        if (!view) throw new QueryViewError('notFound');
        const result = upsertQueryView(this.queryViews, view, name, id);
        return await this.persistQueryViews(result.views, prepared) && isPreparedCurrent(prepared) ? cloneModel(result.view) : null;
      } catch (error) { this.setQueryViewError(error, 'saveFailed'); return null; }
    },
    async removeQueryView(this: any, id: string) {
      const prepared = await this.prepareQueryViews();
      if (!prepared) return false;
      if (!this.queryViews.some((view: TvueQueryView) => view.id === id)) {
        this.setQueryViewError(new QueryViewError('notFound'), 'saveFailed');
        return false;
      }
      const views = this.queryViews.filter((view: TvueQueryView) => view.id !== id);
      if (!await this.persistQueryViews(views, prepared) || !isPreparedCurrent(prepared)) return false;
      if (this.activeQueryViewId === id) this.activeQueryViewId = '';
      return true;
    },
    async applyQueryView(this: any, id: string) {
      const prepared = await this.prepareQueryViews();
      if (!prepared) return false;
      const view = this.queryViews.find((item: TvueQueryView) => item.id === id);
      if (!view) { this.setQueryViewError(new QueryViewError('notFound'), 'applyFailed'); return false; }
      return this.applyQueryViewState(cloneModel(view), prepared, id);
    },
    async resetQueryView(this: any) {
      const prepared = await this.prepareQueryViews();
      if (!prepared) return false;
      return this.applyQueryViewState(cloneModel(prepared.state.defaults), prepared, '');
    },
    async applyQueryViewState(this: any, view: TvueQueryView, prepared: any, id: string) {
      const { state, epoch } = prepared;
      const token = ++state.apply;
      const current = () => !state.unmounted && state.epoch === epoch && state.apply === token;
      this.queryViewApplying = true;
      this.queryViewError = '';
      this.queryViewErrorDetail = null;
      try {
        await this.$nextTick();
        if (!current()) return false;
        const columns = cloneModel(queryViewColumns(this.option?.column || this.tableOption.column));
        const defaults = cloneModel(state.defaults);
        const searchDefaults = formInitVal(this.$refs.headerSearch?.option?.column || []);
        Object.keys(searchDefaults).forEach((prop) => {
          if (!defaults.fields.includes(prop)) defaults.search[prop] = cloneModel(searchDefaults[prop]);
        });
        const resolved = resolveQueryView(view, defaults, columns);
        applyQueryColumnState(columns, state.defaults.columns);
        applyQueryColumnState(columns, resolved.columns);
        queryViewLeafColumns(columns).forEach((column) => { column.filteredValue = cloneModel(resolved.filters[column.prop] || []); });
        this.queryViewSort = cloneModel(resolved.sort);
        this.queryViewFilters = cloneModel(resolved.filters);
        this.$refs.table?.clearFilter?.();
        this.tableOption.column = columns;
        this.tableOption.defaultSort = cloneModel(resolved.sort || {});
        const search = clearPreviousQuery(this.search || {}, resolved.search);
        this.$emit('update:search', cloneModel(search));
        this.$refs.headerSearch?.$refs.form?.setForm?.(cloneModel(search));
        this.$emit('update:page', { ...cloneModel(this.page || {}), currentPage: 1,
          pageSize: resolved.pageSize || state.defaults.pageSize || 10 });
        await this.$nextTick();
        if (!current()) return false;
        const table = this.$refs.table;
        table?.clearSort?.();
        if (resolved.sort) table?.sort?.(resolved.sort.prop, resolved.sort.order);
        this.doLayout?.();
        this.saveColumnState?.('query-view');
        await this.$nextTick();
        if (!current()) return false;
        this.activeQueryViewId = id;
        const header = this.$refs.headerSearch;
        if (typeof header?.searchChange === 'function') header.searchChange(cloneModel(search), () => {});
        else this.$emit('search-change', cloneModel(search), () => {});
        if (current()) this.$emit('query-view-change', id ? cloneModel(resolved) : null);
        return true;
      } catch (error) {
        if (current()) this.setQueryViewError(error, 'applyFailed');
        return false;
      } finally { if (current()) this.queryViewApplying = false; }
    },
  },
};
