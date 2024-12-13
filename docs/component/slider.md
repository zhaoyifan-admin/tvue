# slider滑动框

:::demo 
```html
<el-row :span="24">
  <el-col :span="6">
   值:{{form}}<br/>
   <tvue-slider v-model="form" :max="100" :min="20"></tvue-slider>
  </el-col>
</el-row>
<script>
export default {
    data() {
      return {
        form:52
      }
    }
}
</script>

```
:::