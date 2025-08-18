## ✨ 特性

- 🚀 **高效开发**：基于数据驱动视图的理念，大大减少了代码量
- 📦 **开箱即用**：丰富的表格、表单配置及多种常用组件
- 🛠️ **强大定制**：高度灵活的配置项，满足各种复杂场景需求
- 🔌 **扩展性强**：支持自定义组件和多种交互方式
- 📚 **详尽文档**：完善的文档和示例，快速上手无烦恼

## 🔧 安装

```bash
# 使用 pnpm 安装（推荐）
pnpm add @zhaoyifannan/tvue

# 或使用 npm 安装
npm install @zhaoyifannan/tvue

# 或使用 yarn 安装
yarn add @zhaoyifannan/tvue
```

## 📦 使用

```js
// 完整引入
import { createApp } from 'vue'
import Tvue from '@zhaoyifannan/tvue'
import '@zhaoyifannan/tvue/dist/tvue.css'
import App from './App.vue'

const app = createApp(App)
app.use(Tvue)
app.mount('#app')
```

## 📄 文件说明

| 文件名      | 用途     | 说明 |
| ----------- | -------- | ---- |
| tvue.min.js | 生产环境 | 压缩优化版本，体积更小 |
| tvue.js     | 开发环境 | 包含完整的调试信息 |

## 📚 文档与示例

要查看详细文档和在线示例，请访问：[官方文档](https://zhaoyifan-admin.github.io/vuepress-3.0/)