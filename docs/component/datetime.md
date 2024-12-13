# datetime日期时间

:::demo 
```html
<el-row :span="24">
  <el-col :span="6">
    值:{{form}}<br/>
   <tvue-date v-model="form" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" placeholder="请选择日期"></tvue-date> <el-col :span="24"></el-col>
  </el-col>
  <el-col :span="24"></el-col>
  <el-col :span="6">
     值:{{form1}}<br/>
    <tvue-date v-model="form1" type="datetime" format="yyyy年MM月dd日 hh:mm:ss" value-format="yyyy-MM-dd hh:mm:ss" placeholder="请选择日期"></tvue-date>
  </el-col>
</el-row>
<script>
export default {
    data() {
      return {
        form:'2020-01-01',
        form1:'2020-01-01 12:00:00'
      }
    }
}
</script>

```
:::