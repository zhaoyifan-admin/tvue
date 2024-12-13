# url超链接输入框

:::demo 
```html
<el-row :span="24">
  <el-col :span="6">
     值:{{form}}<br/>
    <tvue-array type="url" alone v-model="form" placeholder="请输入内容" ></tvue-array>
  </el-col>
</el-row>
<script>
export default {
    data() {
      return {
        form:['https://avuejs.com/']
      }
    }
}
</script>

```
:::