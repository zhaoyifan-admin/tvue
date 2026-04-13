import * as Icons from '@element-plus/icons-vue';
import * as AIcons from '@ant-design/icons-vue';
import { h } from 'vue';

let IconFontInstance = null;

const icons = AIcons;
export default (app) => {
  for (const key in Icons) {
    app.component(transElIconName(key), Icons[key]);
  }
  for (const i in icons) {
    app.component(i, icons[i]);
  }
};

function transElIconName(iconName) {
  return 'el-icon' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
}

export function createIconFont(scriptUrl) {
  if (typeof window === 'undefined') return null;

  if (!IconFontInstance) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.setAttribute('data-namespace', scriptUrl);
    document.body.appendChild(script);

    IconFontInstance = new Promise((resolve) => {
      script.onload = () => {
        resolve(true);
      };
    });
  }

  return IconFontInstance;
}

export function renderIconfontIcon(type, className = '') {
  if (!type) return null;

  if (type.startsWith('icon-') || type.startsWith('iconfont')) {
    return h('i', {
      class: `iconfont ${type} ${className}`
    });
  }

  return null;
}
