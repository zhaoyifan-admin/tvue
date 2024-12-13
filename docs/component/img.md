# img图片输入框

:::demo 
```html
<el-row :span="24">
  <el-col :span="6">
     值:{{form}}<br/>
    <tvue-array type="img" v-model="form" placeholder="请输入内容" ></tvue-array>
  </el-col>
</el-row>
<script>
export default {
    data() {
      return {
        form:[
          'https://avuejs.com/images/logo-bg.jpg',
          'https://avuejs.com/images/logo-bg.jpg',
        ]
      }
    }
}
</script>

```
:::