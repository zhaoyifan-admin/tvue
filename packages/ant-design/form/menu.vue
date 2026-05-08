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
      <template #icon>
        <component :is="getIconComponent('edit')" />
      </template>
      {{ validData(formSafe.tableOption.mockText, t("form.mockBtn")) }}
    </a-button>
    <a-button
      type="primary"
      @click="formSafe.handlePrint"
      :size="formSafe.size"
      :disabled="formSafe.allDisabled"
      v-if="formSafe.isPrint"
    >
      <template #icon>
        <component :is="getIconComponent('printer')" />
      </template>
      {{ validData(formSafe.tableOption.printText, t("form.printBtn")) }}
    </a-button>
    <a-button
      type="primary"
      @click="formSafe.submit"
      :size="formSafe.size"
      :loading="formSafe.allDisabled"
      v-if="validData(formSafe.tableOption.submitBtn, true)"
    >
      <template #icon>
        <component
          :is="getIconComponent(formSafe.tableOption.submitIcon, 'CheckOutlined')"
        />
      </template>
      {{ validData(formSafe.tableOption.submitText, t("form.submitBtn")) }}
    </a-button>
    <a-button
      :size="formSafe.size"
      :disabled="formSafe.allDisabled"
      v-if="validData(formSafe.tableOption.emptyBtn, true)"
      @click="formSafe.resetForm"
    >
      <template #icon>
        <component
          :is="getIconComponent(formSafe.tableOption.emptyIcon, 'DeleteOutlined')"
        />
      </template>
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
import { getAntIcon } from "utils/antIcon";


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
    // 使用统一的图标工具方法
    getIconComponent(icon, defaultIcon) {
      return getAntIcon(icon, defaultIcon);
    },
    isAntdIcon(icon) {
      if (!icon) return false;
      return typeof icon === 'string' && icon.endsWith('Outlined');
    },
    getIconName(icon, defaultIcon) {
      if (icon === false) return null;
      if (!icon) return defaultIcon;
      return icon;
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

