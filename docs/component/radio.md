# radio单选

:::demo 
```html
<el-row :span="24">
  <el-col :span="6">
   值:{{form}}<br/>
   <tvue-radio v-model="form"  :dic="dic"></tvue-radio>
  </el-col>
</el-row>
<script>
export default {
    data() {
      return {
        form:0,
        dic:[{
          label:'选项1',
          value:0
        },{
          label:'选项2',
          value:1
        }]
      }
    }
}
</script>

```
:::