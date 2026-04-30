<template>
  <a-card :bordered="true"
          :class="b('pagination')"
          v-if="pageFlag && validData(crud.tableOption.page,true)">
    <slot name="page"></slot>
    <a-pagination :size="crud.size"
                  :disabled="defaultPage.disabled"
                  :hideOnSinglePage="defaultPage.single"
                  :showSizeChanger="defaultPage.layout.includes('sizes')"
                  :showQuickJumper="defaultPage.layout.includes('jumper')"
                  :showTotal="(total) => `${t('crud.total')} ${total}`"
                  :pageSizeOptions="defaultPage.pageSizes.map(size => size.toString())"
                  :defaultPageSize="defaultPage.pageSize"
                  :current="defaultPage.currentPage"
                  :pageSize="defaultPage.pageSize"
                  :total="defaultPage.total"
                  @change="currentChange"
                  @showSizeChange="sizeChange"
                  :showLessItems="this.crud.isMobile"></a-pagination>
  </a-card>
</template>

<script>
import config from "../config";
import create from "core/create";
export default create({
  name: "crud",
  inject: ["crud"],
  props: {
    page: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      config: config,
      defaultPage: {
        single: false,
        total: 0,
        pagerCount: 7,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true
      }
    };
  },
  created () {
    this.pageInit();
    this.crud.$emit("on-load", this.defaultPage);
  },
  watch: {
    'crud.page': {
      handler () {
        this.pageInit();
      },
      deep: true,
    },
    pageFlag () {
      this.crud.getTableHeight();
    },
  },
  computed: {
    pageFlag () {
      return this.defaultPage.total != 0
    }
  },
  methods: {
    pageInit () {
      this.defaultPage = Object.assign(this.defaultPage, this.crud.page)
      this.updateValue();
    },
    updateValue () {
      this.crud.$emit('update:page', this.defaultPage)
    },
    sizeChange (current, size) {
      this.defaultPage.currentPage = current;
      this.defaultPage.pageSize = size;
      this.updateValue();
      this.crud.$emit("on-load", this.defaultPage);
      this.crud.$emit("size-change", size);
    },
    currentChange (page, pageSize) {
      this.defaultPage.currentPage = page;
      this.defaultPage.pageSize = pageSize;
      this.updateValue();
      this.crud.$emit("on-load", this.defaultPage);
      this.crud.$emit("current-change", page);
    }
  }
});
</script>
