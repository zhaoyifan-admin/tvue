<template>
  <div :class="b('header')">
    <div :class="b('left')"
         v-if="validData(crud.tableOption.menuLeft,true)">
      <a-button type="primary"
                :class="b('addBtn')"
                @click="crud.rowAdd"
                :size="crud.size"
                v-permission="crud.getPermission('addBtn')"
                v-if="validData(crud.tableOption.addBtn,config.addBtn)">
        <template #icon>
          <component :is="getIconComponent(crud.getBtnIcon('addBtn'))" />
        </template>
        <template v-if="!crud.isIconMenu">
          {{crud.menuIcon('addBtn')}}
        </template>
      </a-button>
      <a-button type="primary"
                :class="b('addBtn')"
                @click="crud.rowCellAdd"
                v-permission="crud.getPermission('addRowBtn')"
                :size="crud.size"
                v-if="validData(crud.tableOption.addRowBtn,config.addRowBtn)">
        <template #icon>
          <component :is="getIconComponent(crud.getBtnIcon('addBtn'))" />
        </template>
        <template v-if="!crud.isIconMenu">
          {{crud.menuIcon('addBtn')}}
        </template>
      </a-button>
      <slot name="menu-left"
            :size="crud.size"></slot>
    </div>
    <div :class="b('right')"
         v-if="validData(crud.tableOption.menuRight,true)">
      <tvue-ant-date type="datetimerange"
                 @change="dateChange"
                 value-format="YYYY-MM-DD HH:mm:ss"
                 format="YYYY-MM-DD HH:mm:ss"
                 :shortcuts="shortcuts"
                 style="display:inline-block;margin-right:20px;"
                 v-if="validData(crud.tableOption.dateBtn,config.dateBtn)"
                 :size="crud.size"></tvue-ant-date>
      <slot name="menu-right"
            :size="crud.size"></slot>
      <a-tooltip :title="t('crud.excelBtn')">
        <a-button :class="b('excelBtn')"
                  :size="crud.size"
                  @click="rowExcel"
                  v-permission="crud.getPermission('excelBtn')"
                  v-if="validData(crud.tableOption.excelBtn,config.excelBtn)">
          <template #icon>
            <component :is="getIconComponent(crud.getBtnIcon('excelBtn'))" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :title="t('crud.printBtn')">
        <a-button :class="b('printBtn')"
                  :size="crud.size"
                  @click="rowPrint"
                  v-permission="crud.getPermission('printBtn')"
                  v-if="validData(crud.tableOption.printBtn,config.printBtn)">
          <template #icon>
            <component :is="getIconComponent(crud.getBtnIcon('printBtn'))" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :title="t('crud.refreshBtn')">
        <a-button :class="b('refreshBtn')"
                  :size="crud.size"
                  @click="crud.refreshChange"
                  v-permission="crud.getPermission('refreshBtn')"
                  v-if="validData(crud.tableOption.refreshBtn,config.refreshBtn)">
          <template #icon>
            <component :is="getIconComponent(crud.getBtnIcon('refreshBtn'))" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :title="t('crud.columnBtn')">
        <a-button :class="b('columnBtn')"
                  :size="crud.size"
                  @click="crud.$refs.dialogColumn.handleShow()"
                  v-permission="crud.getPermission('columnBtn')"
                  v-if="validData(crud.tableOption.columnBtn,config.columnBtn)">
          <template #icon>
            <component :is="getIconComponent(crud.getBtnIcon('columnBtn'))" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :title="t('crud.searchBtn')" v-if="(crud.$refs.headerSearch || {}).searchFlag&&validData(crud.tableOption.searchShowBtn,true)">
        <a-button :class="b('searchBtn')"
                  :size="crud.size"
                  @click="crud.$refs.headerSearch.handleSearchShow()">
          <template #icon>
            <component :is="getIconComponent(crud.getBtnIcon('searchBtn'))" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :title="t('crud.filterBtn')">
        <a-button :class="b('filterBtn')"
                  :size="crud.size"
                  @click="crud.$refs.dialogFilter.handleShow()"
                  v-permission="crud.getPermission('filterBtn')"
                  v-if="validData(crud.tableOption.filterBtn,config.filterBtn)">
          <template #icon>
            <component :is="getIconComponent(crud.getBtnIcon('filterBtn'))" />
          </template>
        </a-button>
      </a-tooltip>

      <a-tooltip :title="t('crud.gridBtn')">
        <a-button :class="b('gridBtn')"
                  :size="crud.size"
                  @click="crud.handleGridShow()"
                  v-permission="crud.getPermission('gridBtn')"
                  v-if="validData(crud.tableOption.gridBtn,config.gridBtn)">
          <template #icon>
            <component :is="getIconComponent(crud.getBtnIcon('gridBtn'))" />
          </template>
        </a-button>
      </a-tooltip>

    </div>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import packages from "core/packages";
import permission from 'common/directive/permission';
import { validData, getAsVal } from "utils/util";
import config from "../config";
import * as AntIcons from '@ant-design/icons-vue';

export default create({
  name: "crud",
  mixins: [locale],
  directives: {
    permission
  },
  inject: ["crud"],
  data () {
    return {
      dateCreate: false,
      shortcuts: [
        {
          text: this.t('date.t'),
          value: new Date(),
        },
        {
          text: this.t('date.y'),
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
          },
        },
        {
          text: this.t('date.n'),
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
          },
        },
      ],
      config: config
    };
  },
  created () {
    this.initFun();
  },
  computed: {
    data () {
      if (this.crud.tableOption.selection) {
        return this.crud.tableSelect;
      } else {
        return this.crud.list;
      }
    }
  },
  methods: {
    getIconComponent(iconName) {
      if (!iconName) return null;
      const iconMap = {
        'plus': AntIcons.PlusOutlined,
        'eye': AntIcons.EyeOutlined,
        'edit': AntIcons.EditOutlined,
        'copy': AntIcons.CopyOutlined,
        'printer': AntIcons.PrinterOutlined,
        'download': AntIcons.DownloadOutlined,
        'delete': AntIcons.DeleteOutlined,
        'search': AntIcons.SearchOutlined,
        'plus-circle': AntIcons.PlusCircleOutlined,
        'check-circle': AntIcons.CheckCircleOutlined,
        'close-circle': AntIcons.CloseCircleOutlined,
        'setting': AntIcons.SettingOutlined,
        'filter': AntIcons.FilterOutlined,
        'appstore': AntIcons.AppstoreOutlined,
        'reload': AntIcons.ReloadOutlined,
      };
      return iconMap[iconName] || AntIcons.PlusOutlined;
    },
    dateChange (val) {
      if (this.dateCreate) {
        this.crud.$emit("date-change", val);
      } else {
        this.dateCreate = true;
      }
    },
    initFun () {
      this.crud.rowExcel = this.rowExcel;
      this.crud.rowPrint = this.rowPrint;
    },
    rowExcel () {
      this.crud.$refs.dialogExcel.handleShow()
    },
    rowPrint () {
      this.$Print(this.crud.$refs.table)
    }
  }
});
</script>
