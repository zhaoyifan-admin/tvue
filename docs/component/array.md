# array 数组输入框

:::demo

```html
<el-row :span="24">
  <el-col :span="6">
    值:{{form}}<br />
    <tvue-array v-model="form" placeholder="请输入内容"></tvue-array>
  </el-col>
</el-row>
<script>
  export default {
    data() {
      return {
        form: ['第一条', '第二条', '第三条', '第四条'],
      }
    },
  }
</script>
```

:::
