# Print打印

:::tip
 2.8.6+
::::

:::demo
```html
<el-button type="primary" @click="handlePrint">打印全部</el-button>
<el-button type="primary" @click="handlePrint1">打印局部</el-button>
<el-button type="primary" @click="handlePrint2">打印DOM</el-button>
<div id="test">
  <h2 style="color:red">我是测试字段</h2>
</div>
<script>
export default {
  methods: {
    handlePrint() {
      this.$Print('#app');
    },
    handlePrint1(){
      this.$Print('#test');
    },
    handlePrint2(){
      this.$Print(document.querySelector('.logo'));
    }
  }
}
</script>

```
:::



## Variables

| 参数 | 说明         | 类型   | 可选值 | 默认值 |
| ---- | ------------ | ------ | ------ | ------ |
| id   | dom元素的id  | String | -      | -      |
| html | html代码片段 | String | -      | -      |