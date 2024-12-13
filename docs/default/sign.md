# Sign 电子签名
兼容移动端和pc段
:::tip
 2.0.4+
::::


:::demo 
```html
<tvue-sign ref="sign"></tvue-sign>
<el-button type="primary" @click="handleSubmit">生成</el-button>
<el-button type="danger" @click="$refs.sign.getStar('这里是用途','这里是单位的名称','123456')">图章</el-button>
<el-button @click="$refs.sign.clear()">清空</el-button>
<div>
<br />
  结果
  <img :src="img" alt="" width="80" height="50" />
</div>
<script>
export default {
    data() {
      return {
        img: ''
      }
    },
    methods: {
      handleSubmit() {
        this.img = this.$refs.sign.submit(80, 50);
        console.log(this.img)
      }
    }
}
</script>


```
:::


