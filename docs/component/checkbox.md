# checkbox多选

:::demo 
```html
<el-row :span="24">
  <el-col :span="6">
     值:{{form}}<br/>
    <tvue-checkbox v-model="form" placeholder="请选择内容" :dic="dic"></tvue-checkbox>
  </el-col>
  <el-col :span="24"></el-col>
  <el-col :span="6">
     值:{{form1}}<br/>
    <tvue-checkbox all v-model="form1" placeholder="请选择内容" :dic="dic"></tvue-checkbox>
  </el-col>
</el-row>
<script>
export default {
    data() {
      return {
        form:[0,1],
        form1:[],
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