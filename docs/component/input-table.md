# inputTabel表格选择器

:::demo 
```html
<el-row :span="24">
  <el-col :span="6">
   值:{{form}}<br/>
   <tvue-input-table :props="props"  :children="children" :on-load="onLoad" v-model="form"  placeholder="请选择数据" ></tvue-input-table>
   格式化值:{{form}}<br/>
   <tvue-input-table :props="props" :children="children" :formatter="formatter" :on-load="onLoad" v-model="form"  placeholder="请选择数据" ></tvue-input-table>
    值:{{form1}}<br/>
    <tvue-input-table multiple :props="props" :children="children" :formatter="formatter1" :on-load="onLoad1" v-model="form1"  placeholder="请选择数据" ></tvue-input-table>
  </el-col>
</el-row>
<script>
export default {
    data() {
      return {
        children:{
          border: true,
          column: [{
            label: '姓名',
            width: 120,
            search:true,
            prop: 'name'
          }, {
            label: '性别',
            search:true,
            prop: 'sex'
          }],
        },
        props: {
          label: 'name',
          value: 'id'
        },
        form:'0',
        form1:[0,1]
      }
    },
    methods:{
      formatter1(row){
       if (Array.isArray(row)) {
          return row.map(ele => ele.name + '格式化').join(',')
        } else {
          return row.name + '格式化'
        }
      },
      onLoad1({ page, value,data }, callback){
        //首次加载去查询对应的值
        if (value) {
          this.$message.success('首次查询'+value)
          callback([{
            id: '0',
            name: '张三',
            sex: '男',
            age:18
          }, {
            id: '2',
            name: '王五',
            sex: '女'
          }])
          return
        }
        if(data){
          this.$message.success('搜索查询参数'+JSON.stringify(data))
        }
        if(page){
          this.$message.success('分页参数'+JSON.stringify(page))
        }
        //分页查询信息
        callback({
          total: 2,
          data: [{
            id: '0',
            name: '张三',
            sex: '男',
            age:18
          }, {
            id: '1',
            name: '李四',
            sex: '女',
            disabled:true,
            age:18
          }, {
            id: '2',
            name: '王五',
            sex: '女'
          }]
        })
      },
      formatter(row){
        if(!row.name) return ''
        return row.name + '-' + row.sex
      },
      onLoad({ page, value,data }, callback){
        //首次加载去查询对应的值
        if (value) {
          this.$message.success('首次查询'+value)
          callback({
            id: '0',
            name: '张三',
            sex: '男'
          })
          return
        }
        if(data){
          this.$message.success('搜索查询参数'+JSON.stringify(data))
        }
        if(page){
          this.$message.success('分页参数'+JSON.stringify(page))
        }
        //分页查询信息
        callback({
          total: 2,
          data: [{
            id: '0',
            name: '张三',
            sex: '男'
          }, {
            id: '1',
            name: '李四',
            sex: '女'
          }]
        })
      }
    }
}
</script>


```
:::