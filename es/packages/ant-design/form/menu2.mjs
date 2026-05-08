/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import locale from '../../../src/core/locale.mjs';
import create from '../../../src/core/create.mjs';
import { getAntIcon } from '../../../src/utils/antIcon.mjs';

var script = create({
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
});

export { script as default };
