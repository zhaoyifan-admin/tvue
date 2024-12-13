# rate评价框

:::demo 
```html
<el-row :span="24">
  <el-col :span="6">
   值:{{form}}<br/>
   <tvue-rate  v-model="form"></tvue-rate>
  </el-col>
</el-row>
<script>
export default {
    data() {
      return {
        form:4
      }
    }
}
</script>

```
:::