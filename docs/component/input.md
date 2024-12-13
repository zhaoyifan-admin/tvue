# input输入框

:::demo 
```html
<el-row :span="24">
  <el-col :span="6">
     值:{{form}}<br/>
    <tvue-input v-model="form" placeholder="请输入内容" ></tvue-input>
  </el-col>
</el-row>
<script>
export default {
    data() {
      return {
        form:'我是内容'
      }
    }
}
</script>

```
:::