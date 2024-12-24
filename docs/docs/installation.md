# 快速上手

### 介绍
通过本章节你可以了解到 Tvue 的安装方法和基本使用姿势。


### 安装
##### 通过 npm 安装
在现有项目中使用 Tvue 时，可以通过 npm 或 yarn 进行安装(需要先引入ElementUI作为依赖支持)：

``` bash
npm i @zhaoyifannan/tvue -S
yarn add @zhaoyifannan/tvue -S
```

``` js
//需要先安装ElementUI的依赖
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Tvue from '@zhaoyifannan/tvue';
import '@zhaoyifannan/tvue/lib/index.css';
Vue.use(ElementUI)
Vue.use(Tvue);
```

##### 使用字典需要引入axios

``` js
import axios from 'axios'
Vue.use(Tvue,{axios})

//老版本需要使用如下
//main.js
window.axios = axios
```



##### 通过 CDN 安装
使用 Tvue 最简单的方法是直接在 html 文件中引入 CDN 链接(引入的是最新的Tvue版本，当然你也可以制定版本号)，之后你可以通过全局变量 TVUE 访问到所有组件。

``` html
<!-- 引入样式文件 -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@zhaoyifannan/tvue/lib/index.css"
/>
<link 
  rel="stylesheet" 
  href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
/>
<!-- 引入相关JS 文件 -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@zhaoyifannan/tvue/lib/avue.min.js"></script>

<div id="app"></div>
<script>
  // 在 #app 标签下渲染一个按钮组件
  new Vue({
    el:'app',
    data(){
      return{}
    }
  });
  app.use(TVUE);
</script>
```
你可以通过以下免费 CDN 服务来使用 Tvue:

[jsdelivr](https://www.jsdelivr.com/package/npm/@zhaoyifannan/tvue)
[unpkg](https://unpkg.com)


### 通过脚手架安装
在新项目中使用 Tvue 时，推荐使用 Vue 官方提供的脚手架 Vue Cli 创建项目并安装 Tvue

``` bash
# 安装 Vue Cli
npm install -g @vue/cli

# 创建一个项目
vue create hello-world

# 创建完成后，可以通过命令打开图形化界面，如下图所示
vue ui

在图形化界面中，点击 依赖 -> 安装依赖，然后将 @zhaoyifannan/tvue 添加到依赖中即可。
```