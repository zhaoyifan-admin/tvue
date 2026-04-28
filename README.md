# Tvue.js

Tvue.js 是基于 Vue 3 与 Element Plus 的数据驱动型组件库，围绕表单、表格和业务配置场景做了进一步封装。它通过统一的配置方式降低重复开发成本，让 CRUD、表单联动、数据展示和常见业务组件的搭建更直接。

适合以下场景：

- 后台管理系统的快速搭建
- 表单和表格配置较多的业务系统
- 需要统一交互规范的中后台项目
- 需要复用常见业务组件的企业应用

## 特性

- 数据驱动视图，通过配置生成常见业务界面
- 深度适配 Vue 3 与 Element Plus 生态
- 内置 `tvue-crud`、`tvue-form`、`tvue-search` 等高频组件
- 提供上传、导出、打印、水印、剪贴板、截图等常用能力
- 支持国际化、全局配置、Axios 注入和类型声明
- 附带大量本地示例，便于快速对照接入

## 环境要求

- `vue >= 3.2.0`
- `element-plus >= 2.2.0`
- `@element-plus/icons-vue >= 2.0.0`

以上依赖为当前包的 `peerDependencies`，安装 Tvue 时需要一并安装。

## 安装

```bash
pnpm add vue element-plus @element-plus/icons-vue @zhaoyifannan/tvue
```

或使用其他包管理器：

```bash
npm install vue element-plus @element-plus/icons-vue @zhaoyifannan/tvue
```

```bash
yarn add vue element-plus @element-plus/icons-vue @zhaoyifannan/tvue
```

## 快速开始

```ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Tvue from "@zhaoyifannan/tvue";
import "@zhaoyifannan/tvue/lib/index.css";
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

基础用法示例：

```vue
<template>
  <tvue-form v-model="form" :option="option" />
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  name: "",
  status: 1,
});

const option = ref({
  submitBtn: true,
  emptyBtn: true,
  column: [
    {
      label: "姓名",
      prop: "name",
      span: 24,
    },
    {
      label: "状态",
      prop: "status",
      type: "radio",
      dicData: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 },
      ],
      span: 24,
    },
  ],
});
</script>
```

## 全局配置

`app.use(Tvue, options)` 支持常见全局参数：

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `size` | `string` | 全局组件尺寸 |
| `calcHeight` | `number` | 全局高度修正值 |
| `menuType` | `string` | 操作区按钮展示类型 |
| `formOption` | `Record<string, any>` | 表单默认配置 |
| `crudOption` | `Record<string, any>` | CRUD 默认配置 |
| `appendToBody` | `boolean` | 弹层类组件是否挂载到 `body` |
| `locale` | `string \| object` | 语言配置 |
| `i18n` | `any` | 自定义国际化处理器 |
| `axios` | `any` | 自定义请求实例 |
| `canvas` | `object` | 水印默认配置 |
| `qiniu` | `object` | 七牛上传默认配置 |
| `ali` | `object` | 阿里云上传默认配置 |

## 组件与能力

当前仓库内置的能力主要包括：

- 表单与表格：`tvue-form`、`tvue-crud`、`tvue-search`
- 输入组件：`tvue-input`、`tvue-select`、`tvue-input-tree`、`tvue-input-table`
- 业务组件：`tvue-login`、`tvue-tabs`、`tvue-tree`、`tvue-chat`、`tvue-flow`
- 数据展示：`tvue-card`、`tvue-comment`、`tvue-count-up`、`tvue-article`
- 插件能力：导出、打印、截图、剪贴板、水印、日志、图片预览、弹窗表单

更完整的使用方式可参考文档站和仓库示例。

## 本地开发

```bash
pnpm install
pnpm dev
```

常用命令：

```bash
pnpm dev
pnpm build
pnpm build:esm
pnpm build:cjs
pnpm build:browser
pnpm typecheck
pnpm gen:version
```

## 目录结构

| 目录 | 说明 |
| --- | --- |
| `src` | 组件与插件源码入口 |
| `packages` | 组件实现与业务模块 |
| `styles` | 样式资源 |
| `types` | TypeScript 类型声明 |
| `examples` | 本地示例与调试页面 |
| `build` | 构建与版本生成脚本 |
| `lib` | 构建产物 |