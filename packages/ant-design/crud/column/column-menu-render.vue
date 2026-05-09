NEW_FILE_CODE
<template>
  <div :class="b('menu')">
    <slot
      name="menu-before"
      v-bind="menuParams"
    ></slot>

    <!-- 下拉菜单模式 -->
    <a-dropdown v-if="isMenuType" trigger="click">
      <a-button type="link" :size="size">
        {{ menuBtnTitle }}
        <DownOutlined/>
      </a-button>
      <template #overlay>
        <a-menu>
          <slot
            name="menu-btn-before"
            v-bind="menuParams"
          ></slot>

          <a-menu-item
            v-if="showViewBtn"
            @click="handleView"
          >{{ viewBtnText }}
          </a-menu-item>

          <a-menu-item
            v-if="showCopyBtn"
            @click="handleCopy"
          >{{ copyBtnText }}
          </a-menu-item>

          <a-menu-item
            v-if="showEditBtn"
            @click="handleEdit"
          >{{ editBtnText }}
          </a-menu-item>

          <a-menu-item
            v-if="showDelBtn"
            @click="handleDel"
          >{{ delBtnText }}
          </a-menu-item>

          <slot
            name="menu-btn"
            v-bind="menuParams"
          ></slot>
        </a-menu>
      </template>
    </a-dropdown>

    <!-- 按钮/文本/图标模式 -->
    <template v-else-if="['button', 'text', 'icon'].includes(menuType)">
      <!-- 单元格编辑按钮 -->
      <template v-if="showCellBtn">
        <a-button
          v-if="showEditBtn && !row.$cellEdit"
          :type="btnType"
          :class="b('editBtn')"
          :size="size"
          :disabled="disabled"
          @click.stop="handleCellEdit"
        >
          <template #icon>
            <component :is="getIconComponent(crud.getBtnIcon('editBtn'))"/>
          </template>
          <template v-if="!isIconType">{{ editBtnText }}</template>
        </a-button>

        <a-button
          v-if="showSaveBtn && row.$cellEdit"
          :type="btnType"
          :class="b('saveBtn')"
          :size="size"
          :disabled="disabled"
          @click.stop="handleCellSave"
        >
          <template #icon>
            <component :is="getIconComponent(crud.getBtnIcon('saveBtn'))"/>
          </template>
          <template v-if="!isIconType">{{ saveBtnText }}</template>
        </a-button>

        <a-button
          v-if="row.$cellEdit && showCancelBtn"
          :type="btnType"
          :class="b('cancelBtn')"
          :size="size"
          :disabled="disabled"
          @click.stop="handleCellCancel"
        >
          <template #icon>
            <component :is="getIconComponent(crud.getBtnIcon('cancelBtn'))"/>
          </template>
          <template v-if="!isIconType">{{ cancelBtnText }}</template>
        </a-button>
      </template>

      <!-- 查看按钮 -->
      <a-button
        v-if="showViewBtn"
        :type="btnType"
        :class="b('viewBtn')"
        :size="size"
        :disabled="globalDisabled"
        @click.stop="handleView"
      >
        <template #icon>
          <component :is="getIconComponent(crud.getBtnIcon('viewBtn'))"/>
        </template>
        <template v-if="!isIconType">{{ viewBtnText }}</template>
      </a-button>

      <!-- 复制按钮 -->
      <a-button
        v-if="showCopyBtn"
        :type="btnType"
        :class="b('copyBtn')"
        :size="size"
        :disabled="globalDisabled"
        @click.stop="handleCopy"
      >
        <template #icon>
          <component :is="getIconComponent(crud.getBtnIcon('copyBtn'))"/>
        </template>
        <template v-if="!isIconType">{{ copyBtnText }}</template>
      </a-button>

      <!-- 编辑按钮 -->
      <a-button
        v-if="showEditBtn && !showCellBtn"
        :type="btnType"
        :class="b('editBtn')"
        :size="size"
        :disabled="globalDisabled"
        @click.stop="handleEdit"
      >
        <template #icon>
          <component :is="getIconComponent(crud.getBtnIcon('editBtn'))"/>
        </template>
        <template v-if="!isIconType">{{ editBtnText }}</template>
      </a-button>

      <!-- 删除按钮 -->
      <a-button
        v-if="showDelBtn && !row.$cellEdit"
        :type="btnType"
        :class="b('delBtn')"
        :size="size"
        :disabled="globalDisabled"
        @click.stop="handleDel"
      >
        <template #icon>
          <component :is="getIconComponent(crud.getBtnIcon('delBtn'))"/>
        </template>
        <template v-if="!isIconType">{{ delBtnText }}</template>
      </a-button>
    </template>

    <slot name="menu" v-bind="menuParams"></slot>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import permission from "common/directive/permission";
import config from "../config";
import {DownOutlined} from '@ant-design/icons-vue';
import {getAntIcon} from "utils/antIcon";

export default create({
  name: "column-menu-render",
  data() {
    return {
      config: config,
    };
  },
  components: {
    DownOutlined
  },
  mixins: [locale],
  inject: ["crud"],
  directives: {
    permission,
  },
  props: {
    row: Object,
    index: Number,
  },
  computed: {
    menuType() {
      return this.crud.tableOption.menuType || this.$TVUE.menuType;
    },
    isIconType() {
      return this.menuType === "icon";
    },
    isTextType() {
      return this.menuType === "text";
    },
    isMenuType() {
      return this.menuType === "menu";
    },
    size() {
      return this.crud.size;
    },
    disabled() {
      return this.crud.btnDisabledList[this.index];
    },
    globalDisabled() {
      return this.crud.btnDisabled;
    },
    btnType() {
      return "link";
    },
    menuBtnTitle() {
      return this.crud.tableOption.menuBtnTitle || this.t("crud.menuBtn");
    },
    showViewBtn() {
      return this.validData(this.crud.tableOption.viewBtn, config.viewBtn) &&
        this.crud.getPermission('viewBtn', this.row, this.index);
    },
    showCopyBtn() {
      return this.validData(this.crud.tableOption.copyBtn, config.copyBtn) &&
        this.crud.getPermission('copyBtn', this.row, this.index);
    },
    showEditBtn() {
      return this.validData(this.crud.tableOption.editBtn, config.editBtn) &&
        this.crud.getPermission('editBtn', this.row, this.index);
    },
    showDelBtn() {
      return this.validData(this.crud.tableOption.delBtn, config.delBtn) &&
        this.crud.getPermission('delBtn', this.row, this.index) &&
        !this.row.$cellEdit;
    },
    showCellBtn() {
      return this.validData(this.crud.tableOption.cellBtn, config.cellBtn);
    },
    showSaveBtn() {
      return this.validData(this.crud.tableOption.saveBtn, config.saveBtn) &&
        this.row.$cellEdit;
    },
    showCancelBtn() {
      return this.validData(this.crud.tableOption.cancelBtn, config.cancelBtn);
    },
    viewBtnText() {
      return this.crud.menuIcon("viewBtn");
    },
    copyBtnText() {
      return this.crud.menuIcon("copyBtn");
    },
    editBtnText() {
      return this.crud.menuIcon("editBtn");
    },
    delBtnText() {
      return this.crud.menuIcon("delBtn");
    },
    saveBtnText() {
      return this.crud.menuIcon("saveBtn");
    },
    cancelBtnText() {
      return this.crud.menuIcon("cancelBtn");
    },
    menuParams() {
      return {
        row: this.row,
        column: {},
        type: this.btnType,
        disabled: this.globalDisabled,
        size: this.size,
        index: this.index,
      };
    },
  },
  methods: {
    getIconComponent(iconName, defaultIcon) {
      return getAntIcon(iconName, defaultIcon);
    },
    handleView() {
      this.crud.rowView(this.row, this.index);
    },
    handleCopy() {
      this.crud.rowCopy(this.row);
    },
    handleEdit() {
      this.crud.rowEdit(this.row, this.index);
    },
    handleDel() {
      this.crud.rowDel(this.row, this.index);
    },
    handleCellEdit() {
      this.crud.rowCell(this.row, this.index);
    },
    handleCellSave() {
      this.crud.rowCell(this.row, this.index);
    },
    handleCellCancel() {
      this.crud.rowCancel(this.row, this.index);
    },
  },
});
</script>
