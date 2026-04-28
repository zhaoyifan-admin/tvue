/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import locale from '../../../src/core/locale.mjs';
import create from '../../../src/core/create.mjs';

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
});

export { script as default };
