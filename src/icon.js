import * as Icons from '@element-plus/icons-vue';
import * as AIcons from '@ant-design/icons-vue';

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
