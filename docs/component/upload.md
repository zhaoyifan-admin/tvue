# upload 附件上传

:::demo

```html
<el-row :span="24">
  <el-col :span="6">
    值:{{form}}<br />
    <tvue-upload
      :action="action"
      :props-http="propsHttp"
      type="upload"
      v-model="form"
    ></tvue-upload>
  </el-col>
  <el-col :span="24"></el-col>
  <el-col :span="6">
    值:{{form1}}<br />
    <tvue-upload
      :action="action"
      :props-http="propsHttp"
      type="upload"
      v-model="form1"
      list-type="picture-img"
    ></tvue-upload>
  </el-col>
  <el-col :span="24"></el-col>
  <el-col :span="6">
    值:{{form2}}<br />
    <tvue-upload
      :action="action"
      :props-http="propsHttp"
      type="upload"
      v-model="form2"
      list-type="picture-card"
    ></tvue-upload>
  </el-col>
</el-row>
<script>
  export default {
    data() {
      return {
        action: "https://api.avuejs.com/imgupload",
        propsHttp: {
          url: "url",
          name: "name",
          res: "data",
        },
        form: [],
        form1: "",
        form2: [],
      };
    },
  };
</script>
```

:::
