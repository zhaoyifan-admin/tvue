<template>
  <a-col
    :span="menuSpan"
    :md="menuSpan"
    :xs="menuXsSpan"
    :style="styleName"
    :class="[b('menu',[formSafe.menuPosition]),'no-print']"
    v-if="validData(formSafe.tableOption.menuBtn, true)"
  >
    <slot
      name="menu-form-before"
      :disabled="formSafe.allDisabled"
      :size="formSafe.size"
    ></slot>
    <a-button
      type="primary"
      @click="formSafe.handleMock"
      :size="formSafe.size"
      :disabled="formSafe.allDisabled"
      v-if="formSafe.isMock"
    >
      {{ validData(formSafe.tableOption.mockText, t("form.mockBtn")) }}
    </a-button>
    <a-button
      type="primary"
      @click="formSafe.handlePrint"
      :size="formSafe.size"
      :disabled="formSafe.allDisabled"
      v-if="formSafe.isPrint"
    >
      {{ validData(formSafe.tableOption.printText, t("form.printBtn")) }}
    </a-button>
    <a-button
      type="primary"
      @click="formSafe.submit"
      :size="formSafe.size"
      :loading="formSafe.allDisabled"
      v-if="validData(formSafe.tableOption.submitBtn, true)"
    >
      <component
        :is="getIconComponent(formSafe.tableOption.submitIcon, 'CheckOutlined')"
        v-if="isAntdIcon(getIconName(formSafe.tableOption.submitIcon, 'CheckOutlined'))"
      />
      <i
        v-else-if="isIconfont(getIconName(formSafe.tableOption.submitIcon, 'CheckOutlined'))"
        :class="getIconfontClass(getIconName(formSafe.tableOption.submitIcon, 'CheckOutlined'))"
      ></i>
      {{ validData(formSafe.tableOption.submitText, t("form.submitBtn")) }}
    </a-button>
    <a-button
      :size="formSafe.size"
      :disabled="formSafe.allDisabled"
      v-if="validData(formSafe.tableOption.emptyBtn, true)"
      @click="formSafe.resetForm"
    >
      <component
        :is="getIconComponent(formSafe.tableOption.emptyIcon, 'DeleteOutlined')"
        v-if="isAntdIcon(getIconName(formSafe.tableOption.emptyIcon, 'DeleteOutlined'))"
      />
      <i
        v-else-if="isIconfont(getIconName(formSafe.tableOption.emptyIcon, 'DeleteOutlined'))"
        :class="getIconfontClass(getIconName(formSafe.tableOption.emptyIcon, 'DeleteOutlined'))"
      ></i>
      {{ validData(formSafe.tableOption.emptyText, t("form.emptyBtn")) }}
    </a-button>
    <slot
      name="menu-form"
      :disabled="formSafe.allDisabled"
      :size="formSafe.size"
    ></slot>
  </a-col>
</template>

<script>
import locale from "core/locale";
import create from "core/create";


export default create({
  name: 'ant-form',
  inject: ["formSafe"],
  mixins: [locale],
  computed: {
    menuXsSpan() {
      return this.formSafe.tableOption.menuXsSpan || this.formSafe.config.xsSpan;
    },
    menuSpan() {
      return this.formSafe.tableOption.menuSpan || this.formSafe.config.xsSpan;
    },
    styleName() {
      if (this.menuSpan !== 24) {
        return {
          padding: 0
        }
      }
      return {}
    }
  },
  methods: {
    isAntdIcon(icon) {
      if (!icon) return false;
      return typeof icon === 'string' && icon.endsWith('Outlined');
    },
    isIconfont(icon) {
      if (!icon) return false;
      return typeof icon === 'string' && (icon.startsWith('icon-') || icon.startsWith('iconfont'));
    },
    getIconName(icon, defaultIcon) {
      if (icon === false) return null;
      if (!icon) return defaultIcon;
      return icon;
    },
    getIconComponent(icon, defaultIcon) {
      const iconName = this.getIconName(icon, defaultIcon);
      if (!iconName) return null;
      return iconName;
    },
    getIconfontClass(icon) {
      if (!icon) return '';
      if (icon.startsWith('iconfont ')) {
        return icon;
      }
      return `iconfont ${icon}`;
    }
  }
})
</script>
