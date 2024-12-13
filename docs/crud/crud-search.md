# 搜索

## 搜索变量
:::demo  `search`变量为搜索的表单对象
```html
{{search}}
<tvue-crud :option="option" :search.sync="search" :data="data" >
</tvue-crud>
<script>
export default {
  data(){
    return {
       search:{
         name:'small'
       },
       data:[{
         name:'张三'
       }],
       option:{
          column: [{
            label: '姓名',
            prop: 'name',
            search:true,
          }]
       }
    }
  }
}
</script>

```
:::

## 搜索按钮文字和图标配置
:::demo  `searchBtnText`和`emptyBtnText`为搜索和清空的文字`searchBtnIcon`和`emptyBtnIcon`为搜索和清空的图标
```html
<tvue-crud :option="option" :data="data" >
</tvue-crud>
<script>
export default {
  data(){
    return {
       data:[{
         name:'张三'
       }],
       option:{
          searchBtnText:'查询',
          searchBtnIcon:'el-icon-user',
          emptyBtnText:'重置',
          emptyBtnIcon:'el-icon-close',
          column: [{
            label: '姓名',
            prop: 'name',
            search:true,
          }]
       }
    }
  }
}
</script>

```
:::


## 搜索方法
:::demo  `search-change`为点击搜索后执行方法，`done`方法为关闭等待框,`search-reset`点击清空的执行方法
```html

<tvue-crud :option="option"  :data="data" @search-change="searchChange" @search-reset="resetChange">
</tvue-crud>
<script>
export default {
  data(){
    return {
       data:[{
         name:'张三'
       }],
       option:{
          column: [{
            label: '姓名',
            prop: 'name',
            search:true,
          }]
       }
    }
  },
  methods:{
      resetChange(item){
        this.$message.success('清空回调')
      },
      searchChange(params,done) {
        this.$message.success('2s后关闭锁定')
        setTimeout(()=>{
          done();
          this.$message.success(JSON.stringify(params));
        },2000)
        
      }
  }
}
</script>

```
:::

## 搜索字段标题宽度
:::demo `searchLabelWidth`为标题的宽度，默认为`110`，可以配置到`option`下作用于全部,也可以单独配置每一项
```html
<tvue-crud :data="data" :option="option" ></tvue-crud>
</tvue-crud>
<script>
export default {
    data() {
      return {
        data: [
          {
            name:'张三',
            sex:'男'
          }, {
            name:'李四',
            sex:'女'
          }
        ],
        option:{
          searchLabelWidth:150,
          column:[
             {
              label:'姓名',
              prop:'name',
              searchLabelWidth:30,
              search:true,
            }, {
              label:'性别',
              prop:'sex',
              search:true,
            }
          ]
        },
      };
    }
}
</script>

```
:::


## 搜索字段排序
:::demo `searchOrder`为排序字段，不写默认为`0`搜索字段排序不影响表格顺序
```html
<tvue-crud :data="data" :option="option" ></tvue-crud>
</tvue-crud>
<script>
export default {
    data() {
      return {
        data: [
          {
            name:'张三',
            sex:'男'
          }, {
            name:'李四',
            sex:'女'
          }
        ],
        option:{
          column:[
             {
              label:'姓名',
              prop:'name',
              search:true,
            }, {
              label:'性别',
              prop:'sex',
              search:true,
              searchOrder:1
            }
          ]
        },
      };
    }
}
</script>

```
:::

## 搜索过滤

:::demo 
```html
<el-button size="small" type="danger" @click="filterDic">过滤数据字典</el-button>
<el-button size="small" type="success" @click="filterNull">过滤空数据</el-button>
<el-button size="small" type="primary" @click="filter">不过滤</el-button>
<p>{{search}}</p>
<tvue-crud :key="reload" :data="data" :search.sync="search" :option="option" ></tvue-crud>

<script>
export default {
    data() {
      return {
        search:{
          cascader:[0,1],
          tree:0
        },
        reload:Math.random(),
        data: [{
          cascader:[0,1],
          tree:0
        }],
        option:{
          column:[{
            label:'姓名',
            prop:'name',
            search:true
          },{
              label:'级别',
              prop:'cascader',
              type:'cascader',
              search:true,
              dicData:[{
                label:'一级',
                value:0,
                children:[
                  {
                    label:'一级1',
                    value:1,
                  },{
                    label:'一级2',
                    value:2,
                  }
                ]
              }],
            },
            {
              label:'树型',
              prop:'tree',
              type:'tree',
              search:true,
              dicData:[{
                label:'一级',
                value:0,
                children:[
                  {
                    label:'一级1',
                    value:1,
                  },{
                    label:'一级2',
                    value:2,
                  }
                ]
              }]
            }]
        }
      }
    },
    methods:{
      refresh(){
        this.reload=Math.random()
      },
      filter(){
        this.option.searchFilterDic=false
        this.option.searchFilterNull=false
        this.refresh()
      },
      filterDic(){
        this.option.searchFilterDic=true
        this.refresh()
      },
      filterNull(){
        this.option.searchFilterNull=true
        this.refresh()
      }
    }
}
</script>
```
:::

## 搜索验证规则

:::tip
具体参考[async-validator](https://github.com/yiminghe/async-validator)
::::

:::demo  配置验证字段的`searchRules`的数据对象即可，
```html
<tvue-crud :option="option" :data="data">
</tvue-crud>
<script>
export default {
  data(){
    return {
       data:[{
         name:'张三'
       }],
       option:{
          column: [{
            label: '姓名',
            prop: 'name',
            search:true,
            searchRules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          },{
            label: '日期',
            prop: 'date',
            type:'datetime'
          }]
       }
    }
  }
}
</script>

```
:::

## 搜索范围和宽度
:::demo  `searchSpan`搜索框的宽度，`searchRange`配置后可以开启范围搜索
```html
<tvue-crud :option="option" :data="data">
</tvue-crud>
<script>
export default {
  data(){
    return {
       data:[{
         name:'张三'
       }],
       option:{
          column: [{
            label: '姓名',
            prop: 'name',
            search:true,
          },{
            label: '日期',
            prop: 'date',
            type:'datetime',
            searchSpan:18,
            searchRange:true,
            search:true,
          }]
       }
    }
  }
}
</script>

```
:::

## 搜索默认值
:::demo  `searchValue`为搜索的默认值
```html
<tvue-crud :option="option" :data="data"></tvue-crud>
<script>
export default {
  data(){
    return {
       data:[{
         name:'张三'
       }],
       option:{
          column: [{
            label: '姓名',
            prop: 'name',
            searchValue:'small',
            search:true
          }]
       }
    }
  }
}
</script>

```
:::


## 局部展开收缩
:::demo  `searchIcon`是否启用功能按钮, `searchIndex`配置收缩展示的个数,默认为`2`个
```html
<tvue-crud :option="option" :data="data"></tvue-crud>
<script>
export default {
  data(){
    return {
       data:[
         {
          text1:'文本1',
          text2:'文本2'
         }
       ],
       option:{
          searchIndex:3,
          searchIcon:true,
          column: [{
            label: '内容1',
            prop: 'text1',
            search:true,
          },{
            label: '内容2',
            prop: 'text2',
            search:true,
          },{
            label: '内容3',
            prop: 'text3',
            search:true,
          },{
            label: '内容4',
            prop: 'text4',
            search:true,
          }]
       }
    }
  }
}
</script>

```
:::



## 辅助提示语
:::demo  `searchTip`为提示的内容,`searchTipPlacement`为提示语的方向，默认为`bottom`
```html
<tvue-crud :option="option" :data="data"></tvue-crud>
<script>
export default {
  data(){
    return {
       data:[
         {
          text1:'文本1',
          text2:'文本2'
         }
       ],
       option:{
          column: [{
            label: '内容1',
            prop: 'text1',
            search:true,
            searchTip:'我是一个默认提示语',
          },{
            label: '内容2',
            prop: 'text2',
            search:true,
            searchTip:'我是一个左边提示语',
            searchTipPlacement:'left',
          }]
       }
    }
  }
}
</script>

```
:::

## 隐藏搜索折叠按钮
:::demo  `searchShowBtn`设置为:`false`
```html
<tvue-crud :option="option" :data="data" >
</tvue-crud>
<script>
export default {
  data(){
    return {
       data:[{
         name:'张三'
       }],
       option:{
          searchShowBtn:false,
          column: [{
            label: '姓名',
            prop: 'name',
            search:true
          },{
            label: '日期',
            prop: 'date',
            type:'datetime',
            search:true
          }]
       }
    }
  },
  methods:{

  }
}
</script>

```
:::

## 按钮是否单独成行
:::demo  前提的`searchMenuSpan`可以控制搜索按钮的长度
```html
<tvue-crud :option="option" :data="data" ></tvue-crud>
<script>
export default {
  data(){
    return {
       data:[
         {
          text1:'文本1',
          text2:'文本2'
         }
       ],
       option:{
          searchMenuSpan:8,
          column: [{
            label: '内容1',
            prop: 'text1',
            search:true,
          },{
            label: '内容2',
            prop: 'text2',
            search:true,
          }]
       }
    }
  }
}
</script>

```
:::

## 定义类型
:::demo  `searchType`属性可以重新定义搜索框的类型
```html
<tvue-crud :option="option"  :data="data" ></tvue-crud>
<script>
var dic=[{
  label:'选项1',
  value:1
},{
  label:'选项2',
  value:2
}]
export default {
  data(){
    return {
       search:{},
       data:[{
         selects:[1,2],
         select:1
       }],
       option:{
          column: [{
            label: '多选框',
            prop: 'selects',
            type:'select',
            multiple:true,
            search:true,
            searchType:"checkbox",
            searchSpan:24,
            dicData:dic
          },{
            label: '单选框',
            prop: 'select',
            type:'select',
            search:true,
            searchType:"radio",
            searchSpan:24,
            dicData:dic
          }]
       }
    }
  }
}
</script>

```
:::

## 自定义搜索卡槽
:::demo  `search`和`searchMenu`卡槽可以自定义搜索内容，不需要单独设置列`search`:`true`
```html
<tvue-crud :option="option" :search.sync="search" :data="data" >
  <template slot="searchMenu"  slot-scope="{row,size}">
      <el-button :size="size" @click="searchSubmit(row)">自定义提交</el-button>
  </template>
  <template slot="search" slot-scope="{row,size}">
    <el-tag>标题</el-tag>
    <el-input placeholder="自定义输入框" :size="size" style="width:200px" v-model="search.slot"></el-input>
  </template>
</tvue-crud>
<script>
export default {
  data(){
    return {
       search:{},
       data:[{
         name:'张三'
       }],
       option:{
          column: [{
            label: '姓名',
            prop: 'name'
          },{
            label: '日期',
            prop: 'date',
            type:'datetime'
          }]
       }
    }
  }
}
</script>

```
:::




## 自定义列搜索

:::tip
 2.2.3+
::::

:::demo  配置`searchslot`为`true`即可开启自定义，列的`prop`加`Search`作为卡槽的名称，
```html
<tvue-crud :option="option" :data="data" :search.sync="search">
  <template slot-scope="{disabled,size}" slot="ageSearch">
     <el-slider  :disabled="disabled" :size="size" v-model="search.age"></el-slider>
  </template>
</tvue-crud>
<script>
export default {
  data(){
    return {
       search:{},
       data:[{
         name:'张三',
         age:18,
       }],
       option:{
          column: [{
            label: '姓名',
            prop: 'name',
            search:true,
          },{
            label: '年龄',
            prop: 'age',
            search:true,
          }]
       }
    }
  }
}
</script>

```
:::


## 多级联动

:::tip
 2.9.0+
::::

:::demo  `cascader`为需要联动的子选择框`prop`值，可以写多个，形成一对多的关系,需要手动调用内部的`dicInit`方法去初始化表格联动数据
```html
<tvue-crud ref="crud" :option="option" :data="data" ></tvue-crud>
<script>
var baseUrl = 'https://cli.avuejs.com/api/area'
export default {
  data(){
    return {
      data:[ {
        id: 1,
        name: '张三',
        province: '110000',
        city: '110100',
        area: '110101',
      },
      {
        id: 2,
        name: '李四',
        province: '140000',
        city: '140600',
        area: '140623'
      }],
       option:{
          excelBtn:true,
          column: [{
            label: '省份',
            prop: 'province',
            type: 'select',
            props: {
              label: 'name',
              value: 'code'
            },
            cascader: ['city'],
            search:true,
            dicUrl: `${baseUrl}/getProvince`,
            rules: [
              {
                required: true,
                message: '请选择省份',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '城市',
            prop: 'city',
            type: 'select',
            cascader: ['area'],
            props: {
              label: 'name',
              value: 'code'
            },
            search:true,
            dicUrl: `${baseUrl}/getCity/{{key}}`,
            rules: [
              {
                required: true,
                message: '请选择城市',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '地区',
            prop: 'area',
            type: 'select',
            props: {
              label: 'name',
              value: 'code'
            },
            search:true,
            dicUrl: `${baseUrl}/getArea/{{key}}`,
            rules: [
              {
                required: true,
                message: '请选择地区',
                trigger: 'blur'
              }
            ]
          }]
       }
    }
  },
  mounted() {
    this.$nextTick(()=>this.$refs.crud.dicInit('cascader'))
  }
}
</script>

```
:::




## 单独日期搜索
:::tip
 2.2.2+
::::

:::demo 配置`dateBtn`为`true`即可激活,搜索后回调`date-change`方法
```html
<tvue-crud ref="crud" @date-change="dateChange":option="option" :data="data" ></tvue-crud>
<script>
export default {
  data(){
    return {
       data:[{
          text1:'内容1-1',
          text2:'内容1-2'
       },{
          text1:'内容2-1',
          text2:'内容2-2'
       },{
          text1:'内容3-1',
          text2:'内容3-2'
       }],
       option:{
          dateBtn:true,
          column: [{
            label: '列内容1',
            prop: 'text1',
          }, {
            label: '列内容2',
            prop: 'text2',
          }]
       }
    }
  },
  methods:{
    dateChange(date){
      this.$message.success(JSON.stringify(date));
    }
  }
}
</script>

```
:::




