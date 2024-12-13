# inputColor颜色选择器

:::demo 
```html
<el-row :span="24">
  <el-col :span="6">
   值:{{form}}<br/>
   <tvue-input-color  placeholder="请选择颜色" v-model="form" ></tvue-input-color>
  </el-col>
   <el-col :span="24"></el-col>
   <el-col :span="6">
   值:{{form1}}<br/>
   <tvue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="form1" ></tvue-input-color>
  </el-col>
</el-row>
<script>
export default {
    data() {
      return {
        form:'rgba(255, 120, 0, 1)',
        form1:'#AE4141'
      }
    }
}
</script>

```
:::