# 表格高级用法


## 配置项服务端加载

:::tip
- 这里没有走真真的服务器请求，而是做了一个模拟
::::

:::demo 
```html
<el-button type="primary"
            size="small"
            icon="el-icon-sort"
            @click="getOption">服务端加载</el-button>
  <br /> <br />
<tvue-crud :key="reload" :data="data"  :option="option" :table-loading="loading"></tvue-crud>

<script>
export default {
    data() {
      return {
        reload: Math.random(),
        loading:true,
        data: [],
        option:{},
      };
    },
    methods:{
      getOption(){
        this.$message.success('模拟2s后服务端动态加载');
        setTimeout(()=>{
          this.option={
            border:true,
            align:'center',
            menuAlign:'center',
            column:[
              {
                label:'姓名',
                prop:'name'
              }, {
                label:'性别',
                prop:'sex'
              },{
                label: '省份',
                prop: 'province',
                type: 'select',
                props: {
                  label: 'name',
                  value: 'code'
                },
                dicUrl: `https://cli.avuejs.com/api/area/getProvince`,
                rules: [
                  {
                    required: true,
                    message: '请选择省份',
                    trigger: 'blur'
                  }
                ]
              }]
          }
          this.data=[
            {
              name:'张三',
              sex:'男',
              province:'110000'
            }, {
              name:'李四',
              sex:'女',
              province:'120000'
            }
          ]
          this.loading=false;
          this.reload=Math.random()
        },2000)
      }
    }
}
</script>

```
:::


## 配置项切换


:::demo
```html
<tvue-crud ref="crud" :data="data" :option="option">
  <template slot="menuLeft">
    <el-button type="primary" size="small" @click="handleSwitch" icon="el-icon-sort">切 换</el-button>
  </template>
</tvue-crud>

<script>
export default {
    data() {
      return {
        type:true,
        data: [
          {
            name:'张三',
            sex:'男',
            username:'smallwei',
            password:'smallwei'
          }, {
            name:'李四',
            sex:'女',
            username:'avue',
            password:'avue'
          }
        ],
        option:{},
        option1:{
          addBtn:false,
          column:[
             {
              label:'姓名',
              prop:'name',
              search:true
            }
          ]
        },
        option2:{
          addBtn:false,
          column:[
             {
              label:'用户名',
              prop:'username',
              search:true
            }, {
              label:'密码',
              prop:'password',
              type:'password',
              search:true
            }, {
              label:'姓名',
              prop:'name',
              search:true
            }
          ]
        },
      };
    },
    mounted(){
      this.handleSwitch();
    },
    methods: {
      handleSwitch(){
        this.type=!this.type;
        if(this.type){
          this.option=this.option1;
        }else{
          this.option=this.option2;
        }
        this.$refs.crud.refreshTable()
      }
    }
}
</script>
```
:::


## 表格初始化


:::demo 也可以调用内置方法`refreshTable`去初始化
```html
<el-button type="primary" size="small" @click="handleReload" >Key初始化</el-button>
<el-button type="primary" size="small" @click="handleReload1" >内置方法初始化</el-button>
<br /><br />
<tvue-crud :key="reload" ref="crud" :data="data" :option="option"></tvue-crud>

<script>
export default {
    data() {
      return {
        reload: Math.random(),
        data: [
          {
            username:'smallwei',
            password:'smallwei'
          }, {
            username:'avue',
            password:'avue'
          }
        ],
        option:{
          column:[
             {
              label:'用户名',
              prop:'username'
            }, {
              label:'密码',
              prop:'password',
              type:'password'
            }
          ]
        },
      }
    },
    methods: {
      handleReload(){
        this.reload=Math.random();
        this.$message.success('初始化完成')
      },
      handleReload1(){
        this.$refs.crud.refreshTable()
        this.$message.success('初始化完成')
      }
    }
}
</script>
```
:::

