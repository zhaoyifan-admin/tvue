<template>
  <!-- 操作栏 -->
  <component
    :is="crud.tableColumnName"
    key="menu"
    :class-name="crud.tableOption.menuClassName"
    :fixed="validData(crud.tableOption.menuFixed, config.menuFixed)"
    v-if="
      validData(crud.tableOption.menu, config.menu) &&
      crud.getPermission('menu')
    "
    :title="crud.tableOption.menuTitle || t('crud.menu')"
    :align="crud.tableOption.menuAlign || config.menuAlign"
    :width="
      crud.isMobile
        ? crud.tableOption.menuXsWidth || config.menuXsWidth
        : crud.tableOption.menuWidth || config.menuWidth
    "
  >
    <template #header>
      <slot
        name="menu-header"
        :size="crud.size"
        v-if="crud.getSlotName({ prop: 'menu' }, 'H', crud.$slots)"
      ></slot>
      <span v-else>{{ crud.tableOption.menuTitle || t("crud.menu") }}</span>
    </template>
    <template #default="slotProps">
      <template v-if="slotProps && slotProps.record">
        <div :class="b('menu')">
          <slot
            name="menu-before"
            v-bind="menuParams({ row: slotProps.record, column: slotProps.column, $index: slotProps.index })"
          ></slot>
          <a-dropdown v-if="isMenu" trigger="click">
            <a-button type="link" :size="crud.size">
              {{ crud.tableOption.menuBtnTitle || t("crud.menuBtn") }}
              <DownOutlined />
            </a-button>
            <template #overlay>
              <a-menu>
                <slot
                  name="menu-btn-before"
                  v-bind="menuParams({ row: slotProps.record, column: slotProps.column, $index: slotProps.index })"
                ></slot>
                <a-menu-item
                  v-if="validData(crud.tableOption.viewBtn, config.viewBtn) && crud.getPermission('viewBtn', slotProps.record, slotProps.index)"
                  @click="crud.rowView(slotProps.record, slotProps.index)"
                >{{ crud.menuIcon("viewBtn") }}</a-menu-item
                >
                <a-menu-item
                  v-if="validData(crud.tableOption.copyBtn, config.copyBtn) && crud.getPermission('copyBtn', slotProps.record, slotProps.index)"
                  @click="crud.rowCopy(slotProps.record)"
                >{{ crud.menuIcon("copyBtn") }}</a-menu-item
                >
                <a-menu-item
                  v-if="validData(crud.tableOption.editBtn, config.editBtn) && crud.getPermission('editBtn', slotProps.record, slotProps.index)"
                  @click="crud.rowEdit(slotProps.record, slotProps.index)"
                >{{ crud.menuIcon("editBtn") }}</a-menu-item
                >
                <a-menu-item
                  v-if="validData(crud.tableOption.delBtn, config.delBtn) && crud.getPermission('delBtn', slotProps.record, slotProps.index)"
                  @click="crud.rowDel(slotProps.record, slotProps.index)"
                >{{ crud.menuIcon("delBtn") }}</a-menu-item
                >
                <slot
                  name="menu-btn"
                  v-bind="menuParams({ row: slotProps.record, column: slotProps.column, $index: slotProps.index })"
                ></slot>
              </a-menu>
            </template>
          </a-dropdown>
          <template v-else-if="['button', 'text', 'icon'].includes(menuType)">
            <template v-if="validData(crud.tableOption.cellBtn, config.cellBtn)">
              <a-button
                :type="menuText('primary')"
                :class="b('editBtn')"
                :size="crud.size"
                :disabled="crud.btnDisabledList[slotProps.index]"
                @click.stop="crud.rowCell(slotProps.record, slotProps.index)"
                v-if="
                  validData(crud.tableOption.editBtn, config.editBtn) &&
                  !slotProps.record.$cellEdit
                "
                v-permission="crud.getPermission('editBtn', slotProps.record, slotProps.index)"
              >
                <template v-if="!isIconMenu">
                  {{ crud.menuIcon("editBtn") }}
                </template>
              </a-button>
              <a-button
                :type="menuText('primary')"
                :class="b('saveBtn')"
                :size="crud.size"
                :disabled="crud.btnDisabledList[slotProps.index]"
                @click.stop="crud.rowCell(slotProps.record, slotProps.index)"
                v-else-if="
                  validData(crud.tableOption.saveBtn, config.saveBtn) &&
                  slotProps.record.$cellEdit
                "
                v-permission="crud.getPermission('saveBtn', slotProps.record, slotProps.index)"
              >
                <template v-if="!isIconMenu">
                  {{ crud.menuIcon("saveBtn") }}
                </template>
              </a-button>
              <a-button
                :type="menuText('primary')"
                :class="b('cancelBtn')"
                :size="crud.size"
                :disabled="crud.btnDisabledList[slotProps.index]"
                v-permission="crud.getPermission('cancelBtn', slotProps.record, slotProps.index)"
                @click.stop="crud.rowCancel(slotProps.record, slotProps.index)"
                v-if="
                  slotProps.record.$cellEdit &&
                  validData(crud.tableOption.cancelBtn, config.cancelBtn)
                "
              >
                <template v-if="!isIconMenu">
                  {{ crud.menuIcon("cancelBtn") }}
                </template>
              </a-button>
            </template>
            <a-button
              :type="menuText('primary')"
              :class="b('viewBtn')"
              :size="crud.size"
              :disabled="crud.btnDisabled"
              @click.stop="crud.rowView(slotProps.record, slotProps.index)"
              v-permission="crud.getPermission('viewBtn', slotProps.record, slotProps.index)"
              v-if="validData(crud.tableOption.viewBtn, config.viewBtn)"
            >
              <template v-if="!isIconMenu">
                {{ crud.menuIcon("viewBtn") }}
              </template>
            </a-button>
            <a-button
              :type="menuText('primary')"
              :class="b('copyBtn')"
              :size="crud.size"
              :disabled="crud.btnDisabled"
              @click.stop="crud.rowCopy(slotProps.record)"
              v-permission="crud.getPermission('copyBtn', slotProps.record, slotProps.index)"
              v-if="validData(crud.tableOption.copyBtn, config.copyBtn)"
            >
              <template v-if="!isIconMenu">
                {{ crud.menuIcon("copyBtn") }}
              </template>
            </a-button>
            <a-button
              :type="menuText('primary')"
              :class="b('editBtn')"
              :size="crud.size"
              :disabled="crud.btnDisabled"
              @click.stop="crud.rowEdit(slotProps.record, slotProps.index)"
              v-permission="crud.getPermission('editBtn', slotProps.record, slotProps.index)"
              v-if="
                validData(crud.tableOption.editBtn, config.editBtn) &&
                !crud.tableOption.cellBtn
              "
            >
              <template v-if="!isIconMenu">
                {{ crud.menuIcon("editBtn") }}
              </template>
            </a-button>
            <a-button
              :type="menuText('danger')"
              :class="b('delBtn')"
              :size="crud.size"
              :disabled="crud.btnDisabled"
              @click.stop="crud.rowDel(slotProps.record, slotProps.index)"
              v-permission="crud.getPermission('delBtn', slotProps.record, slotProps.index)"
              v-if="
                validData(crud.tableOption.delBtn, config.delBtn) &&
                !slotProps.record.$cellEdit
              "
            >
              <template v-if="!isIconMenu">
                {{ crud.menuIcon("delBtn") }}
              </template>
            </a-button>
          </template>
          <slot name="menu" v-bind="menuParams({ row: slotProps.record, column: slotProps.column, $index: slotProps.index })"></slot>
        </div>
      </template>
    </template>
  </component>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import permission from "common/directive/permission";
import config from "../config";
import tableItemCard from "../grid/item";
import { DownOutlined } from '@ant-design/icons-vue';

export default create({
  name: "crud",
  data() {
    return {
      config: config,
    };
  },
  components: {
    tableItemCard,
    DownOutlined
  },
  mixins: [locale],
  inject: ["crud"],
  directives: {
    permission,
  },
  computed: {
    menuType() {
      return this.crud.tableOption.menuType || this.$TVUE.menuType;
    },
    isIconMenu() {
      return this.menuType === "icon";
    },
    isTextMenu() {
      return this.menuType === "text";
    },
    isMenu() {
      return this.menuType === "menu";
    },
  },
  methods: {
    menuText(value) {
      return value;
    },
    menuParams({ row, column, $index }) {
      let parent = this.crud;
      return {
        row,
        column,
        type: this.menuText("primary"),
        disabled: parent.btnDisabled,
        size: parent.size,
        index: $index,
      };
    },
  },
});
</script>
