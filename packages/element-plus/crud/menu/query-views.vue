<template>
  <div class="tvue-query-views">
    <el-popover placement="bottom-end" trigger="click" :width="crud.isMobile ? 'calc(100vw - 24px)' : 340"
                :popper-options="{ modifiers: [{ name: 'preventOverflow', options: { padding: 12 } }] }"
                popper-class="tvue-query-views__popover">
      <template #reference>
        <el-button :size="crud.size" :icon="crud.getBtnIcon('queryViewBtn')" circle
                   :title="t('crud.queryView.title')" :aria-label="t('crud.queryView.title')" />
      </template>
      <div class="tvue-query-views__editor">
        <strong class="tvue-query-views__title">{{ t('crud.queryView.title') }}</strong>
        <el-select
          :model-value="crud.activeQueryViewId || undefined"
          :placeholder="t('crud.queryView.select')"
          :aria-label="t('crud.queryView.select')"
          :size="crud.size"
          :loading="crud.queryViewLoading"
          :disabled="busy"
          class="tvue-query-views__select"
          @change="crud.applyQueryView"
        >
          <el-option v-for="view in crud.queryViews" :key="view.id" :label="view.name" :value="view.id" />
        </el-select>
        <el-input
          v-model="name"
          :placeholder="t('crud.queryView.name')"
          :aria-label="t('crud.queryView.name')"
          :size="crud.size"
          :disabled="busy"
          @keyup.enter="saveNew"
        />
        <div class="tvue-query-views__actions">
          <el-button type="primary" :size="crud.size" :disabled="busy" class="tvue-query-views__save" @click="saveNew">{{ t('crud.queryView.saveNew') }}</el-button>
          <el-button :size="crud.size" :disabled="busy || !active" @click="saveCurrent">{{ t('crud.queryView.update') }}</el-button>
          <el-button :size="crud.size" :disabled="busy || !active" @click="rename">{{ t('crud.queryView.rename') }}</el-button>
        </div>
        <div class="tvue-query-views__actions tvue-query-views__actions--footer">
          <el-button type="danger" text :size="crud.size" :disabled="busy || !active" @click="crud.removeQueryView(active.id)">
            {{ t('crud.queryView.remove') }}
          </el-button>
          <el-button text :size="crud.size" :disabled="busy" @click="crud.resetQueryView()">
            {{ t('crud.queryView.reset') }}
          </el-button>
        </div>
        <span v-if="crud.queryViewError" class="tvue-query-views__status" role="status">
          {{ t(`crud.queryView.${crud.queryViewError}`) }}
          <el-button v-if="['loadFailed', 'invalidCache', 'storageUnavailable'].includes(crud.queryViewError)"
                     link :disabled="busy" @click="crud.reloadQueryViews()">{{ t('crud.queryView.retry') }}</el-button>
        </span>
      </div>
    </el-popover>
  </div>
</template>

<script>
import create from 'core/create';
import locale from 'core/locale';

export default create({
  name: 'crud-query-views',
  inject: ['crud'],
  mixins: [locale],
  data() { return { name: '' }; },
  computed: {
    busy() { return this.crud.queryViewLoading || this.crud.queryViewApplying; },
    active() { return this.crud.queryViews.find(view => view.id === this.crud.activeQueryViewId); },
  },
  watch: {
    active: { immediate: true, handler(view) { this.name = view ? view.name : ''; } },
  },
  methods: {
    saveNew() { return this.crud.saveQueryView(this.name); },
    saveCurrent() { return this.active && this.crud.saveQueryView(this.name, this.active.id); },
    rename() { return this.active && this.crud.renameQueryView(this.active.id, this.name); },
  },
});
</script>
