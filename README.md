# Tvue.js

Tvue.js 是基于 **Vue 3 + Element Plus** 的配置驱动型组件库，面向后台管理系统中的表单、表格、查询、数据展示及常见业务场景。它通过统一的 `option` 配置方式组织页面结构，减少重复的表单与表格模板代码。

Tvue.js 提供 **69 个公共组件**，覆盖容器、输入、数据展示和基础组件；同时提供弹窗、预览、导出、打印、水印、截图等全局能力。

## 适用场景

- 中后台管理系统的快速搭建。
- 表单、表格、查询条件较多的业务页面。
- 需要统一交互规范与组件配置方式的项目。
- 需要复用数据展示、输入扩展、弹窗、导出、打印等能力的企业应用。

## 核心特性

- **配置驱动**：通过 `option.column` 等配置生成表单、表格与查询区。
- **Vue 3 与 Element Plus**：基于 Element Plus 封装，组件以 `tvue-` 前缀全局注册。
- **业务组件完整**：内置数据管理、表单、搜索栏、分组、页签及多类输入组件。
- **全局能力**：提供弹窗表单、图片预览、导出、打印、剪贴板、水印、日志、截图等插件。
- **工具方法**：`deepClone`、`findObject`、`validatenull`、`downFile` 等同时挂载到全局属性并具名导出。
- **类型支持**：提供 TypeScript 类型声明。

## 环境要求

使用前需安装以下依赖：

| 依赖 | 版本要求 |
| --- | --- |
| `vue` | `>= 3.2.0` |
| `element-plus` | `>= 2.2.0` |
| `@element-plus/icons-vue` | `>= 2.0.0` |

## 安装

```bash
pnpm add vue element-plus @element-plus/icons-vue @zhaoyifannan/tvue
```

或使用 npm / yarn：

```bash
npm install vue element-plus @element-plus/icons-vue @zhaoyifannan/tvue
```

```bash
yarn add vue element-plus @element-plus/icons-vue @zhaoyifannan/tvue
```

## 快速开始

### 在 Vue 应用中引入

```ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Tvue from "@zhaoyifannan/tvue";
import "@zhaoyifannan/tvue/dist/index.css";
import App from "./App.vue";

const app = createApp(App);

app.use(ElementPlus);
app.use(Tvue, {
  size: "default",
  menuType: "text",
  locale: "zh-cn",
});

app.mount("#app");
```

组件全局注册后，模板中统一使用 kebab-case 标签：

```vue
<tvue-form v-model="form" :option="option" />
```

### 浏览器直接引入

```html
<link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css" />
<link rel="stylesheet" href="https://unpkg.com/@zhaoyifannan/tvue/dist/index.css" />

<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/element-plus/dist/index.full.min.js"></script>
<script src="https://unpkg.com/@element-plus/icons-vue"></script>
<script src="https://unpkg.com/@zhaoyifannan/tvue/dist/tvue.min.js"></script>
```

浏览器直引时使用完整版 Vue（含模板编译器），可直接挂载字符串模板：

```html
<div id="app">
  <tvue-form v-model="form" :option="option"></tvue-form>
</div>

<script>
  const app = Vue.createApp({
    data() {
      return {
        form: {},
        option: {
          column: [{ label: "姓名", prop: "name" }],
        },
      };
    },
  });

  app.use(ElementPlus);
  app.use(Tvue);
  app.mount("#app");
</script>
```

## 表单

`tvue-form` 通过 `option.column` 定义字段，字段名 `prop` 对应 `v-model` 对象的键，列的 `type` 决定渲染的控件类型。

```vue
<template>
  <tvue-form v-model="form" :option="option" @submit="submit"></tvue-form>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  name: "",
  sex: 1,
  birthday: "",
});

const option = reactive({
  labelWidth: 90,
  column: [
    {
      label: "姓名",
      prop: "name",
      rules: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    },
    {
      label: "性别",
      prop: "sex",
      type: "radio",
      dicData: [
        { label: "男", value: 1 },
        { label: "女", value: 0 },
      ],
    },
    { label: "生日", prop: "birthday", type: "date" },
  ],
});

const submit = (formData, done) => {
  console.log("提交数据", formData);
  done();
};
</script>
```

使用要点：

- `option` 管理整张表单，例如 `labelWidth`、`span`、`menuBtn`。
- `option.column` 管理字段；`prop` 是字段名，`type` 是控件类型。
- `select`、`radio`、`checkbox` 等字段通过 `dicData` 提供本地字典，也可使用 `dicUrl` 远程加载。
- `@submit` 回调签名为 `(form, done)`，处理完成后应调用 `done()` 结束提交态。

## 数据管理

`tvue-crud` 不内置请求逻辑：列表数据由 `:data` 传入，加载时机由业务方在 `@on-load` 中控制。

```vue
<template>
  <tvue-crud :option="option" :data="data" @on-load="onLoad"></tvue-crud>
</template>

<script setup>
import { ref } from "vue";

const data = ref([]);

const option = ref({
  border: true,
  column: [
    { label: "姓名", prop: "name" },
    { label: "年龄", prop: "age" },
    { label: "城市", prop: "city" },
  ],
});

const onLoad = (page, params, done) => {
  data.value = [
    { name: "张三", age: 28, city: "北京" },
    { name: "李四", age: 32, city: "上海" },
  ];
  if (typeof done === "function") done();
};
</script>
```

使用要点：

- `option.column` 同时影响表格列、查询条件与编辑表单，可用 `search: false`、`add: false`、`edit: false` 分别关闭。
- `v-model:page` 与 `v-model:search` 可获取分页与查询条件。
- `@row-save(form, done)`、`@row-update(form, done)` 中的 `done()` 用于关闭弹窗；`done(savedRow)` 还会同步本地列表。
- 命名插槽可覆盖单元格或操作列，例如 `#name`、`#menu`。

## 全局配置

使用 `app.use(Tvue, options)` 传入全局配置。配置会合并到 `app.config.globalProperties.$TVUE`。

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `string` | `"default"` | 全局组件尺寸 |
| `calcHeight` | `number` | `0` | 全局高度修正值 |
| `menuType` | `string` | `"text"` | 操作区按钮展示类型 |
| `formOption` | `object` | `{}` | 表单默认配置 |
| `crudOption` | `object` | `{}` | 数据管理默认配置 |
| `appendToBody` | `boolean` | `true` | 弹层类组件是否挂载到 `body` |
| `optionValidate` | `boolean` | `true` | 是否启用 `option` 校验与告警 |
| `canvas` | `object` | 内置水印配置 | 水印默认配置 |
| `qiniu` | `object` | 内置七牛配置 | 七牛上传默认配置 |
| `ali` | `object` | 内置阿里云配置 | 阿里云上传默认配置 |
| `locale` | `string \| object` | — | 语言配置 |
| `i18n` | `any` | — | 自定义国际化处理器 |
| `axios` | `any` | 内置 axios 实例 | 自定义请求实例 |

## 组件索引

组件按文档站分类整理如下，共 69 个：

| 分类 | 数量 | 组件 |
| --- | ---: | --- |
| 容器组件 | 5 | `tvue-crud`、`tvue-form`、`tvue-group`、`tvue-search`、`tvue-tabs` |
| 输入组件 | 22 | `tvue-cascader`、`tvue-checkbox`、`tvue-date`、`tvue-input`、`tvue-input-color`、`tvue-input-cron`、`tvue-input-icon`、`tvue-input-map`、`tvue-input-number`、`tvue-input-otp`、`tvue-input-table`、`tvue-input-tag`、`tvue-input-tree`、`tvue-mention`、`tvue-radio`、`tvue-rate`、`tvue-select`、`tvue-slider`、`tvue-switch`、`tvue-time`、`tvue-tree`、`tvue-upload` |
| 数据展示 | 23 | `tvue-data-box`、`tvue-data-card`、`tvue-data-cardtext`、`tvue-data-countdown`、`tvue-data-dashboard`、`tvue-data-display`、`tvue-data-icons`、`tvue-data-imgtext`、`tvue-data-list`、`tvue-data-notice`、`tvue-data-operatext`、`tvue-data-panel`、`tvue-data-pay`、`tvue-data-price`、`tvue-data-product`、`tvue-data-profile`、`tvue-data-progress`、`tvue-data-rank`、`tvue-data-rotate`、`tvue-data-statistic`、`tvue-data-tabs`、`tvue-data-task`、`tvue-data-weather` |
| 基础组件 | 19 | `tvue-array`、`tvue-article`、`tvue-captcha`、`tvue-chat`、`tvue-comment`、`tvue-count-up`、`tvue-draggable`、`tvue-dynamic`、`tvue-file-manager`、`tvue-filter-builder`、`tvue-flow`、`tvue-iframe`、`tvue-license`、`tvue-login`、`tvue-qrcode`、`tvue-sign`、`tvue-text-ellipsis`、`tvue-title`、`tvue-video` |

## 全局插件、工具与指令

安装后，以下内容挂载到应用实例或全局属性：

| 类别 | 名称 | 说明 |
| --- | --- | --- |
| 插件 | `$DialogForm` | 函数式弹窗表单 |
| 插件 | `$ImagePreview` | 图片预览 |
| 插件 | `$Export` | 数据导出 |
| 插件 | `$Print` | 打印 |
| 插件 | `$Clipboard` | 剪贴板 |
| 插件 | `$Watermark` | 水印 |
| 插件 | `$Log` | 控制台日志封装 |
| 插件 | `$Screenshot` | 截图 |
| 指令 | `v-contextmenu` | 右键菜单 |
| 全局属性 | `$TVUE` | 全局配置集合 |
| 全局属性 | `$axios` | 请求实例 |
| 全局属性 | `$uploadFun` | 上传钩子聚合 |
| 工具 | `deepClone`、`findObject`、`findArray`、`findNode`、`validatenull`、`validData`、`setPx`、`isJson`、`downFile`、`loadScript`、`dataURLtoFile`、`randomId` | 同时具名导出 |
| 校验 | `validateOption`、`warnOption` | `option` 校验与告警 |

## 使用文档

完整使用文档按组件提供：

- 在线文档：<https://tvue-guide.app.workbuddy.host/?sharecode=V72KCVTEPO>
- 文档范围：69 个组件，共 320 个页面。
- 内容结构：Props / Option / Events / Slots / Methods / Data 分模块说明。
- 可运行示例：每个模块提供 demo，可展开源码、修改并重新运行。

阅读文档时请区分：

- **Props**：写在组件标签上的属性。
- **Option**：写在配置对象内部的字段，例如 `tvue-form`、`tvue-crud` 的 `option`。
- **内部状态**：`data`、`computed`、`watch` 等字段由组件自动维护，通常无需外部设置。

## License

MIT
