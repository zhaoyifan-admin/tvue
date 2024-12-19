import axios from 'axios';
import Bmob from './Bmob'
import website from './website';
import ElementUI from 'element-ui';
import store from 'store2'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.scss'
import './public/lib/index.css'
import { validatenull } from './utils/validate';
import { deepClone } from './utils/util';
export default async ({ Vue, isServer }) => {
  Vue.use(ElementUI)
  Vue.prototype.validatenull = validatenull;
  Vue.prototype.deepClone = deepClone;
  Vue.prototype.store = store;
  Vue.prototype.$axios = axios;
  Vue.prototype.website = website;
  if (!isServer) {
    window.axios = axios;
    await import('./public/lib/tvue.min').then(module => {
      Vue.use(module, {
        axios,
        cos: website.COS,
        qiniu: website.QINIU,
        ali: website.ALI
      })
    })
    await import('avue-plugin-map').then(module => Vue.use(module))
    await import('avue-plugin-ueditor').then(module => Vue.use(module))
    Bmob.initialize(website.Bmob.AK, website.Bmob.SK);
    Vue.prototype.Bmob = Bmob;
  }
};
