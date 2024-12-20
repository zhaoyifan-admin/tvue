const {
  config
} = require("vuepress-theme-hope");
module.exports = config({
  lang: 'zh-CN',
  title: 'Tvue',
  base: '/tvue/',
  description: '意想不到的搬砖神器✨',
  themeConfig: {
    darkmode: 'disable',
    anchorDisplay: false,
    logo: '/images/logo.png',
    nav: [{
      text: '首页',
      link: '/',
    }, {
      text: '文档',
      items: [{
        text: '开发指南',
        link: '/docs/installation'
      }, {
        text: 'Form组件',
        link: '/form/form-doc'
      }, {
        text: 'Crud组件',
        link: '/crud/crud-doc'
      }, {
        text: 'Default组件',
        link: '/default/contextmenu'
      }, {
        text: 'treeTransfer组件',
        link: '/transfer/transfer-doc'
      }, {
        text: 'Data组件',
        link: '/data/data0'
      }, {
        text: 'Component单组件',
        link: '/component/input'
      }]
    }, {
      text: '工具',
      items:[{
        text: '快速上手',
        link: '/utils/home'
      }]
    }],
    sidebar: {
      '/plugins': [
        '/plugins/tvue-cli',
        '/plugins/ueditor-plugins',
        '/plugins/print-plugins',
        '/plugins/excel-plugins',
        '/plugins/map-plugins',
        {
          title: "Data大屏设计器",
          path: 'https://data.avuejs.com'
        },
        {
          title: "Crud设计器",
          path: 'https://crud.avuejs.com'
        },
        {
          title: "Form设计器",
          path: 'https://form.avuejs.com'
        }
      ],
      '/form': [
        "/form/form-doc",
        "/form/form-input",
        "/form/form-number",
        "/form/form-select",
        "/form/form-cascader",
        "/form/form-checkbox",
        "/form/form-radio",
        "/form/form-date",
        "/form/form-time",
        "/form/form-switch",
        "/form/form-upload",
        "/form/form-title",
        "/form/form-array",
        "/form/form-dynamic",
        "/form/form-input-tree",
        "/form/form-input-icon",
        "/form/form-input-table",
        "/form/form-input-map",
        "/form/form-input-color",
        "/form/form-rate",
        "/form/form-slider",
        "/form/form-object",
        "/form/form-layout",
        "/form/form-rules",
        "/form/form-value",
        "/form/form-submit",
        "/form/form-slot",
        "/form/form-dic",
        "/form/form-cascader-item",
        "/form/form-data",
        "/form/form-event",
        "/form/form-ajax"
      ],
      '/crud': [
        "/crud/crud-doc",
        "/crud/crud-object",
        "/crud/crud-page",
        "/crud/crud-search",
        "/crud/crud-head",
        "/crud/crud-row",
        "/crud/crud-column",
        "/crud/crud-dic",
        "/crud/crud-menu",
        "/crud/crud-fun",
        "/crud/crud-text",
        "/crud/crud-btn-slot",
        "/crud/crud-form",
        "/crud/crud-bind",
        "/crud/crud-grid",
        "/crud/crud-sum",
        "/crud/crud-export",
        "/crud/crud-tree",
        "/crud/crud-children",
        "/crud/crud-cell",
        "/crud/crud-permission",
        "/crud/crud-rc",
        "/crud/crud-empty",
        "/crud/crud-loading",
        "/crud/crud-sortable",
        "/crud/crud-default",
        "/crud/crud-ajax",
        "/crud/crud-cw",
        "/crud/crud-bigcousin",
        '/crud/api-crud-big',
        '/crud/api-crud-temp',
        '/crud/api-crud-fun',
      ],
      '/transfer': [
        "/transfer/transfer-doc",
        "/transfer/transfer",
        "/transfer/address",
      ],
      '/data': [
        '/data/data0',
        '/data/data1',
        '/data/data2',
        '/data/data3',
        '/data/data4',
        '/data/data5',
        '/data/data6',
        '/data/data7',
        '/data/data8',
        '/data/data9',
        '/data/data10',
        '/data/data11',
        '/data/data12',
      ],
      '/default': [
        "/default/contextmenu",
        "/default/dialog-drag",
        "/default/dialog-form",
        "/default/export",
        "/default/login",
        "/default/keyboard",
        "/default/notice",
        "/default/screenshot",
        "/default/video",
        "/default/verify",
        "/default/print",
        "/default/nprogress",
        "/default/chat",
        "/default/license",
        "/default/sign",
        "/default/flow",
        "/default/skeleton",
        "/default/article",
        "/default/comment",
        "/default/code",
        "/default/count-up",
        "/default/card",
        "/default/draggable",
        "/default/image-preview",
        "/default/image-cropper",
        "/default/clipboard",
        "/default/watermark",
        "/default/text-ellipsis",
        "/default/avatar",
        "/default/affix",
        "/default/search",
        "/default/tabs",
        "/default/calendar",
        "/default/tree"
      ],
      '/docs': [
        '/docs/installation',
        '/docs/changelog',
        '/docs/global',
        '/docs/locale',
        '/docs/api'
      ],
      '/component': [
        "/component/input",
        "/component/input-tree",
        "/component/input-number",
        "/component/input-color",
        "/component/input-icon",
        "/component/input-map",
        "/component/input-table",
        "/component/array",
        "/component/img",
        "/component/url",
        "/component/select",
        "/component/radio",
        "/component/checkbox",
        "/component/switch",
        "/component/datetime",
        "/component/time",
        "/component/rate",
        "/component/slider",
        "/component/cascader",
        "/component/upload",
      ],
      '/utils':[
        '/utils/home'
      ]
    },

  },
  chainWebpack: (config) => {
    config.globalObject = 'this'
  },
  plugins: ['fulltext-search', 'demo-container', '@vuepress/back-to-top', '@vuepress/nprogress', {
    name: "notice-plugin",
    globalUIComponents: ["Notice"],
  }]
})
