# 表格列配置项


## 主键

:::demo  很多表格操作都是依靠表格主键的(行展开，表格树等)，需要配置`rowKey`属性，默认为`id`
```html
<tvue-crud :data="data" :option="option" ></tvue-crud>

<script>
export default {
    data() {
      return {
        data: [
          {
            ids:1,
            name:'张三',
            sex:'男'
          }, {
            ids:2,
            name:'李四',
            sex:'女'
          }
        ],
        option:{
          rowKey:'ids',
          column:[
             {
              label:'姓名',
              prop:'name'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    }
}
</script>
```
:::

## 宽度

:::demo  可以配置`width`属性控制每列的宽度，如果不配置则会自适应
```html
<tvue-crud :data="data" :option="option" ></tvue-crud>

<script>
export default {
    data() {
      return {
        data: [
          {
            id:1,
            name:'张三',
            sex:'男'
          }, {
            id:2,
            name:'李四',
            sex:'女'
          }
        ],
        option:{
          column:[
             {
              width:200,
              label:'姓名',
              prop:'name'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    }
}
</script>
```
:::

## 对齐方式

:::demo  可以配置`align`属性和`headerAlign`属性控制对齐方式
```html
<tvue-crud :data="data" :option="option" ></tvue-crud>

<script>
export default {
    data() {
      return {
        data: [
          {
            id:1,
            name:'张三',
            sex:'男'
          }, {
            id:2,
            name:'李四',
            sex:'女'
          }
        ],
        option:{
          align:'center',
          headerAlign:'center',
          border:true,
          column:[
             {
              width:200,
              label:'姓名',
              prop:'name'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    }
}
</script>
```
:::

## 索引

:::demo  设`index`属性为`true`即可，`indexLabel`设置表格的序号的标题,默认为`#`
```html
<tvue-crud :data="data" :option="option" ></tvue-crud>

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
          index:true,
          indexLabel:'序号',
          column:[
             {
              label:'姓名',
              prop:'name'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    }
}
</script>
```
:::


## 自定义索引

:::demo 
```html
<tvue-crud :data="data" :option="option" >
  <template slot="index" slot-scope="{row,index}">
    <el-tag>{{index+1}}</el-tag>
  </template>
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
          column:[{
              label:'序号',
              prop:'index',
              fixed:true
            },
             {
              label:'姓名',
              prop:'name'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    }
}
</script>
```
:::

## 内容超出隐藏

:::demo `overHidden`设置`true`即可超出列表宽度的内容以省略号显示
```html
<tvue-crud :data="data" :option="option"></tvue-crud><script>
export default {
    data() {
      return {
        data: [
          {
            name:'张三的名字是一个很长很长的内容',
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
              overHidden:true,
              width:80,
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    }
}
</script>
```
:::


## 内容格式化

:::demo `formatter`方法格式化内容
```html
<tvue-crud :data="data" :option="option"></tvue-crud><script>
export default {
    data() {
      return {
        data: [
          {
            name:'张三',
            sex:'男',
            select:'110000'
          }, {
            name:'李四',
            sex:'女',
            select:'120000'
          }
        ],
        option:{
          column:[
             {
              label:'姓名',
              prop:'name',
              formatter:(val,value,label)=>{
                return val.name+'格式化内容'
              }
            }, {
              label:'性别',
              prop:'sex'
            },{
              label: '字典',
              prop: 'select',
              type: 'select',
              formatter:(val,value,label)=>{
                return `${label}(${value})`
              },
              props: {
                label: 'name',
                value: 'code'
              },
              dicUrl: 'https://cli.avuejs.com/api/area/getProvince'
            }]
        },
      };
    }
}
</script>
```
:::


## 支持html转译
:::tip
 2.8.23+
::::

:::demo 配置`html`设置为`true`即可支持`formatter`转义`html`代码
```html
<tvue-crud :data="data" :option="option"></tvue-crud><script>
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
              html:true,
              formatter:(val)=>{
                return '<b style="color:red">'+val.name+'格式化内容</b>'
              }
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    }
}
</script>
```
:::

## 列隐藏
:::tip
 2.5.0+
::::

:::demo 一共是有4列的`hide`和`showColumn`可以达到控制列显隐控制
```html
<tvue-crud :option="option" :data="data" ></tvue-crud>
<script>
export default {
  data(){
    return {
       data:[{
          text1:'内容1-1',
          text2:'内容1-2',
          text3:'内容1-3',
          text4:'内容1-4'
       },{
          text1:'内容2-1',
          text2:'内容2-2',
          text3:'内容2-3',
          text4:'内容2-4'
       }],
       option:{
          align:'center',
          headerAlign:'center',
          column: [{
            label: '列内容1',
            prop: 'text1',
          }, {
            label: '列内容2',
            prop: 'text2',
          }, {
            label: '列内容3',
            prop: 'text3',
            hide:true
          }, {
            label: '列内容4',
            prop: 'text4',
            showColumn:false,
          }]
       }
    }
  }
}
</script>

```
:::


## 改变结构配置
:::tip
 2.8.12+
::::

:::demo  
```html

<tvue-crud ref="crud" :defaults.sync="defaults" :option="option"  :data="data">
  <template slot="menuLeft" slot-scope="{size}">
    <el-button type="primary" :size="size" @click="change">改变配置</el-button>
  </template>
</tvue-crud>
<script>
export default {
  data(){
    return {
       type:false,
       defaults:{},
       data:[{
          text1:0
       }],
       option:{
          column: [{
            label: '内容1',
            prop: 'text1',
            type:'radio', 
            dicData:[{
              label:'显示',
              value:0
            },{
              label:'隐藏',
              value:1,
            }]
          },{
            label: '内容2',
            prop: 'text2',
            display:true
          },{
            label: '内容3',
            prop: 'text3'
          }]
       }
    }
  },
  methods:{
    change(){
        if(this.type){
          this.defaults.text2.hide=true
          this.defaults.text3.label='内容3'
        }else{
          this.defaults.text2.hide=false
          this.defaults.text3.label='有没有发现我变了'
        }
        this.type=!this.type
        this.$refs.crud.refreshTable()
    }
  }
}
</script>

```
:::

## 持久化存储
:::tip
 2.9.0+
::::

:::tip
如果有远程字典类的配置或者加载错误情况，需要初始化下组件[CRUD初始化](/crud/crud-ajax)
::::

:::demo 
```html
<tvue-crud  ref="crud" :option="option" :data="data" :key="reload">
  <template slot="menuLeft" slot-scope="{size}">
    <el-button @click="saveOption" type="danger" :size="size">保存配置</el-button>
  </template>
</tvue-crud>
<script>
const key='tvue-option'
export default {
  data(){
    return {
       reload: Math.random(),
       data:[{
          text1:'内容1-1',
          text2:'内容2-1',
          text3: '110000'
       },{
          text1:'内容1-2',
          text2:'内容2-2',
          text3: '120000'
       },{
          text1:'内容1-3',
          text2:'内容2-3'
       },{
          text1:'内容1-4',
          text2:'内容2-4'
       },{
          text1:'内容1-5',
          text2:'内容2-5'
       }],
       option:{
          sortable:true,
          addBtn:false,
          menu:false,
          border:true,
          align:'center',
          column: [{
            label: '列内容1',
            prop: 'text1'
          }, {
            label: '列内容2',
            prop: 'text2'
          }, {
            label: '列内容3',
            prop: 'text3',
            type: 'select',
            props: {
              label: 'name',
              value: 'code'
            },
            dicUrl: 'https://cli.avuejs.com/api/area/getProvince',
          }]
       }
    }
  },
  mounted(){
   let option = localStorage.getItem(key)
    if (option) {
      this.option = JSON.parse(option)
      this.reload = Math.random()
    }
  },
  methods:{
    saveOption(){
      localStorage.setItem(key, JSON.stringify(this.option))
      this.$message.success('配置保存成功')
    }
  }
}
</script>

```
:::


## 筛选

:::demo  设置`filters`为`true`，字典用法和普通用法一致,`filterMethod`为自定义的筛选逻辑，`filter-multiple`筛选的数据为多选还是单选，默认为 `true`
```html
<tvue-crud :data="data" :option="option"></tvue-crud>
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
              formatter:function(row, value , label, column){
                  return row.name +'自定义'
              }
            }, {
              label:'性别',
              prop:'sex',
              filters:true,
              dicData:[{ label: '男', value: '男' }, { label: '女', value: '女' }],
              filterMethod:function(value, row, column) {
                return row.sex === value;
              }
            }
          ]
        }
      }
    }
  }
</script>

```
:::

## 默认排序

:::demo 设置`defaultSort`一个属性接受`prop`排序的字段和`order`排序的方式俩个属性，初始化的时候根据设置默认排序,`order`中接受  `ascending` 表示升序，`descending` 表示降序，回调`sort-change`方法返回排序参数
```html
<tvue-crud :data="data" :option="option1" @sort-change="sortChange"></tvue-crud>

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
        option1:{
          defaultSort:{
            prop: 'name',
            order: 'descending'
          },
          border:true,
          column:[
             {
              sortable:true,
              label:'姓名',
              prop:'name'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        }
      };
    },
    methods: {
       sortChange(val){
        this.$message.success(JSON.stringify(val));
      }
    }
}
</script>
```
:::

## 冻结列
:::tip
 2.0.4+
::::

:::tip
 配置`fixed`为`true`即可实现冻结列
::::

:::demo 配置`indexFixed`,`selectionFixed`,`expandFixed`可以配置序号，多选，面板是否为冻结,当然你也可以配置他们的宽度`indexWdth`,`selectionWidth`,`expandWidth`。
```html
<tvue-crud :data="data" :option="option" ></tvue-crud>

<script>
export default {
    data() {
      return {
        data: [
          {
            id:1,
            name:'张三',
            sex:'男'
          }, {
            id:2,
            name:'李四',
            sex:'女'
          }
        ],
        option:{
          index:true,
          indexFixed:false,
          indexWidth:100,
          selection:true,
          selectionWidth:100,
          selectionFixed:false,
          expand:true,
          expandWidth:100,
          expandFixed:false,
          align:'center',
          menuFixed:false,
          menuAlign:'center',
          column:[
             {
              label:'姓名',
              fixed:true,
              prop:'name'
            }, {
              width:500,
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    }
}
</script>

```
:::

## 单元格和表头样式

:::tip
 配置`className`和`labelClassName`配置单元格和表头样式名称
::::

:::demo 配置`indexClassName`,`selectionClassName`,`expandClassName`可以配置序号，多选，面板列单元格的样式名称,配置`indexLabelClassName`,`selectionLabelClassName`,`expandLabelClassName`表头样式名称
```html
<tvue-crud :data="data" :option="option"></tvue-crud>
<script>
export default {
  data () {
    return {
      data: [
        {
          id: 1,
          name: '张三',
          sex: '男'
        }, {
          id: 2,
          name: '李四',
          sex: '女'
        }
      ],
      option: {
        index: true,
        indexClassName: 'indexClassName',
        indexLabelClassName: 'indexLabelClassName',
        selection: true,
        selectionClassName: 'selectionClassName',
        selectionLabelClassName: 'selectionLabelClassName',
        expand: true,
        expandClassName: 'expandClassName',
        expandLabelClassName: 'expandLabelClassName',
        column: [
          {
            label: '姓名',
            prop: 'name',
            className:'className',
            labelClassName:'labelClassName'
          }, {
            width: 500,
            label: '性别',
            prop: 'sex'
          }
        ]
      },
    };
  }
}
</script>
```
:::



## 列拖拽排序

:::tip
 2.9.0+
::::

``` html
<!-- 导入需要的包 （一定要放到index.html中的head标签里） -->
<script src="https://cdn.staticfile.net/Sortable/1.10.0-rc2/Sortable.min.js"></script>
```

:::demo `columnSort`设置为`true`即可开启拖拽功能，没有回调用方法直接修改`option`中的顺序
```html
<tvue-crud :option="option" :data="data"></tvue-crud>
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
          columnSort:true,
          column: [{
            label: '列内容1',
            prop: 'text1',
          }, {
            label: '列内容2',
            prop: 'text2',
          }]
       }
    }
  }
}
</script>

```
:::




## 自定义列

:::demo 设置列的属性`slot`为`true`时，在卡槽中用`prop`作为卡槽的名字即可
```html
<tvue-crud :data="data" :option="option" >
  <template slot="name" slot-scope="scope" >
    <el-tag>{{scope}}</el-tag>
  </template>
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
              slot:true
            },
            {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    },
  }
</script>
```
:::

## render渲染
:::tip
 2.12.1+
::::

:::demo
```html
<tvue-crud :data="data" :option="option" ></tvue-crud>

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
              render: (h,{ row }) => {
              return h('p',
                {
                  attrs: { id: 'box' },
                  class: { 'demo': true },
                  style: { color: 'pink', lineHeight: '30px' },
                }, row.name + 'Hello World Tvue')
              }
            },
            {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    },
  }
</script>
```
:::


## 列合并

:::tip
 如果数据不确定参考[动态数据行和列合并](/crud/crud-rc.html)
::::


:::demo 通过给传入`spanMethod`方法可以实现合并行或列，方法的参数是一个对象，里面包含当前行`row`、当前列`column`、当前行号`rowIndex`、当前列号`columnIndex`四个属性。该函数可以返回一个包含两个元素的数组，第一个元素代表`rowspan`，第二个元素代表`colspan`。 也可以返回一个键名为`rowspan`和`colspan`的对象。

```html
<tvue-crud
  :data="data"
  :option="option"
  :span-method="spanMethod"
></tvue-crud>

<script>
  export default {
    data() {
      return {
        data: [
          {
            id: '12987122',
            name: '王小虎',
            amount1: '234',
            amount2: '3.2',
            amount3: 10
          },
          {
            id: '12987123',
            name: '王小虎',
            amount1: '165',
            amount2: '4.43',
            amount3: 12
          },
          {
            id: '12987124',
            name: '王小虎',
            amount1: '324',
            amount2: '1.9',
            amount3: 9
          },
          {
            id: '12987125',
            name: '王小虎',
            amount1: '621',
            amount2: '2.2',
            amount3: 17
          },
          {
            id: '12987126',
            name: '王小虎',
            amount1: '539',
            amount2: '4.1',
            amount3: 15
          }
        ],
        option: {
          border: true,
          menu:false,
          column: [
            {
              label: 'ID',
              prop: 'id'
            },
            {
              label: '姓名',
              prop: 'name'
            },
            {
              label: '数值 1',
              prop: 'amount1'
            },
            {
              label: '数值 2',
              prop: 'amount2'
            },
            {
              label: '数值 3',
              prop: 'amount3'
            }
          ]
        }
      }
    },
    methods: {
      spanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    }
  }
</script>
```

:::
