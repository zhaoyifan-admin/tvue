# Verify 验证码
结合video组件来做一些活体认证，或则是其他方面的验证
:::tip
 2.1.0
::::

:::demo 
```html
    <el-button @click="$refs.verify.randomn()" type="primary">随机验证码</el-button>
    <br /><br />
    <span style="font-size: 24px;line-height: 24px;color: #333;">请使用普通话朗读下方验证码</span>
    <br /><br />
    <tvue-verify v-model="data" :len="len" ref="verify"></tvue-verify>
    <br /><br />
    <tvue-video background="https://avuejs.com/images/face.png" @data-change="dataChange" ref="video"></tvue-video>
<script>
export default {
  data(){
    return {
      data:null,
      len:6,
    }
  },
  methods:{
    dataChange(data) {
      console.log(data);
    }
  }
}
</script>

```
:::

