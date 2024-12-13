# 操作栏配置


## 操作栏隐藏

:::demo `menu`属性接受一个`Boolean`的属性达到隐藏操作栏的效果，默认为`false`
```html
<tvue-crud :data="data" :option="option1"></tvue-crud>

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
          menu:false,
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

## 操作栏对齐方式

:::demo `menuWidth`属性设置操作栏宽度,`menuTitle`属性设置操作栏目的文字,`menuAlign`属性设置对齐方式,`menuHeaderAlign`属性设置表头对齐方式
```html
<tvue-crud :data="data" :option="option1"></tvue-crud>
<script>
export default {
  data () {
    return {
      data: [
        {
          name: '张三',
          sex: '男'
        }, {
          name: '李四',
          sex: '女'
        }
      ],
      option1: {
        menuTitle: '其它',
        menuWidth: 250,
        menuAlign: 'left',
        menuHeaderAlign: 'left',
        column: [
          {
            label: '姓名',
            prop: 'name'
          }, {
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

## 操作栏自适应
:::demo 通过`js`计算元素宽度，动态给`menuWidth`去赋值，实现动态宽度
```html
<tvue-crud :data="data"
            :option="option">
  <template #menu="{size}">
    <el-button v-for="(item,index) in 5"
                :key="index"
                :size="size"
                type="text">操作{{index+1}}</el-button>
  </template>
</tvue-crud>
<script>
export default {
  data () {
    return {
      data: [
        {
          name: '张三',
          sex: '男'
        }, {
          name: '李四',
          sex: '女'
        }
      ],
      option: {
        menuWidth: 0,
        column: [
          {
            label: '姓名',
            prop: 'name'
          }, {
            label: '性别',
            prop: 'sex'
          }
        ]
      },
    };
  },
  mounted () {
    this.setMenuWidth()
  },
  methods: {
    setMenuWidth () {
      setTimeout(() => {
        let width = 0;
        let list = document.querySelectorAll('.tvue-crud__menu');
        list.forEach(ele => {
          let childList = ele.children
          let allWidth = 0;
          for (let i = 0; i < childList.length; i++) {
            const child = childList[i]
            allWidth += child.offsetWidth + 18
          }
          if (allWidth >= width) width = allWidth
        })
        this.option.menuWidth = width
      })
    }
  }
}
</script>
```
:::

## 操作栏样式

:::demo `menuClassName`属性和`menuLabelClassName`属性配置操作栏列的单元格和表头样式名称
```html
<tvue-crud :data="data":option="option1"></tvue-crud>
<script>
export default {
  data () {
    return {
      data: [
        {
          name: '张三',
          sex: '男'
        }, {
          name: '李四',
          sex: '女'
        }
      ],
      option1: {
        menuClassName: 'menuClassName',
        menuLabelClassName: 'menuLabelClassName',
        column: [
          {
            label: '姓名',
            prop: 'name'
          }, {
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


## 自定义操作栏头部

:::demo  `menuHeader`插槽为操作栏头部自定义
```html
<tvue-crud :data="data" :option="option">
  <template #menuHeader="{}">
      <el-tag @click="tip()">操作</el-tag>
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
              prop:'name'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    },
    methods: {
      tip(){
        this.$message.success('自定义头部按钮');
      }
    }
}
</script>
```
:::


## 自定义操作栏

:::demo  `menu`为操作栏自定义
```html
<tvue-crud :data="data" :option="option">
  <template slot-scope="{type,size,row,index}" slot="menu">
     <el-button icon="el-icon-check" :size="size" :type="type" @click="tip(row,index)">自定义菜单按钮</el-button>
  </template>
  <template slot-scope="{type,size,row,index}" slot="menuBefore">
      <el-button @click="tip(row,index)"
                 icon="el-icon-check"
                 :type="type"
                 :size="size">自定义前菜单</el-button>
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
          menuWidth:380,
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
    },
    methods: {
      tip(row){
        this.$message.success('自定义按钮'+ JSON.stringify(row));
      }
    }
}
</script>
```
:::

## 查看按钮
:::tip
 [自定义按钮](/crud/crud-btn-slot.html#自定义查看按钮)
::::

:::demo  `viewBtn`配置为`true`即可
```html
<tvue-crud ref="crud" :option="option" :data="data"></tvue-crud>
<script>
export default {
  data(){
    return {
       data:[
         {
           name:'张三',
           age:12,
           address:'码云的地址'
         }, {
           name:'李四',
           age:13,
           address:'码云的地址'
         }
       ],
       option:{
          viewBtn:true,
          editBtn:false,
          delBtn:false,
          column: [{
            label: '姓名',
            prop: 'name'
          },{
            label: '年龄',
            prop: 'age'
          },{
            label:'地址',
            span:24,
            prop:'address',
            type:'textarea'
          }]
       }
    }
  }
}
</script>

```
:::


## 复制按钮
:::tip
 2.6.14+
::::

:::demo 设置`copyBtn`为`true`时激活行复制功能,复制的数据会去除`rowKey`配置的主键
```html

{{form}}
<tvue-crud :data="data" :option="option" v-model="form"></tvue-crud>

<script>
export default {
    data() {
      return {
        form:{},
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
          copyBtn:true,
          delBtn:false,
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

## 打印按钮

:::demo  `printBtn`设置为`true`即可开启打印功能
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
       }],
       option:{
          menu:false,
          printBtn:true,
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

## 导出按钮

``` html
<!-- 导入需要的包 （一定要放到index.html中的head标签里）-->
<script src="https://cdn.staticfile.net/FileSaver.js/2014-11-29/FileSaver.min.js"></script>
<script src="https://cdn.staticfile.net/xlsx/0.18.2/xlsx.full.min.js"></script>
```


:::demo  `excelBtn`设置为`true`即可开启表格导出功能
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
       }],
       option:{
          menu:false,
          excelBtn:true,
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


## 筛选按钮

:::tip
 常用自定筛选条件
::::

:::demo  `filterBtn`默认为`true`，可以自定义过滤条件，根据`filter`函数回调
```html
<tvue-crud :option="option" :data="data" @filter="filterChange"></tvue-crud>
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
       }],
       option:{
          filterBtn:true,
          align:'center',
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
    filterChange(result) {
      this.$message.success('过滤器' + JSON.stringify(result))
    },
  }
}
</script>

```
:::



## 合并菜单

:::demo  配置`menuType`为`menu`表格的操作栏目菜单合并，`menuBtn`卡槽为自定义卡槽,
```html
<tvue-crud :data="data" :option="option" >
<template slot-scope="{row}" slot="menuBtnBefore">
     <el-dropdown-item @click.native="tip(row)">自定义按钮</el-dropdown-item>
  </template>
  <template slot-scope="{row}" slot="menuBtn">
     <el-dropdown-item divided @click.native="tip(row)">自定义按钮</el-dropdown-item>
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
          }, {
            name:'王五',
            sex:'女'
          }, {
            name:'赵六',
            sex:'男'
          }
        ],
        option:{
          menuType:'menu',
          menuBtnTitle:'自定义名称',
          column:[
             {
              label:'姓名',
              prop:'name'
            },
            {
              label:'性别',
              prop:'sex'
            }
          ]
        }
      }
    },
    methods: {
      tip(row){
        this.$message.success('自定义按钮'+ JSON.stringify(row));
      }
    }
  }
</script>
``` 
:::


## 图标菜单

:::demo  配置`menuType`为`icon`时表格操作栏为图标按钮
```html
<tvue-crud :data="data" :option="option">
  <template slot-scope="{row}" slot="menu">
     <el-button size="small" @click="tip(row)" icon="el-icon-share"></el-button>
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
          }, {
            name:'王五',
            sex:'女'
          }, {
            name:'赵六',
            sex:'男'
          }
        ],
        option:{
          menuType:'icon',
          column:[
             {
              label:'姓名',
              prop:'name'
            },
            {
              label:'性别',
              prop:'sex'
            }
          ]
        }
      }
    },
    methods: {
      tip(row){
        this.$message.success('自定义按钮'+ JSON.stringify(row));
      }
    }
  }
</script>
``` 
:::

