# Tree树型选择框

## 基础用法

:::demo  
```html
<tvue-form  :option="option"></tvue-form>

<script>
export default {
    data() {
      return {
        option:{
          column: [{
              label: '树型选择框',
              prop: 'tree',
              type: 'tree',
              dicData:[{
                label:'字典1',
                value:0,
                children:[{
                  label:'字典3',
                  value:2
                }]
              },{
                label:'字典2',
                value:1
              }]
          }]
        }
      };
    }
}
</script>
```
:::

## 默认值

:::demo `value`属性可以提供一个初始化的默认值
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
         {
            label:'树型选择框',
            prop:'tree',
            type:'tree',
            dicData:[{
              label:'字典1',
              value:0,
              children:[{
                label:'字典3',
                value:2
              }]
            },{
              label:'字典2',
              value:1
            }],
            value:0
         }
        ]
      }
    }
  }
}
</script>

```
:::

## 禁用状态

:::demo 通过`disabled`属性指定是否禁用
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
         {
            label:'树型选择框',
            prop:'tree',
            type:'tree',
            dicData:[{
              label:'字典1',
              value:0,
              children:[{
                label:'字典3',
                value:2
              }]
            },{
              label:'字典2',
              value:1
            }],
            disabled:true
         }
        ]
      }
    }
  }
}
</script>

```
:::

## 禁用选项

:::demo 返回的字典中数据配置`disabled`属性指定是否禁用
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
         {
            label:'树型选择框',
            prop:'tree',
            type:'tree',
            dicData:[{
              label:'字典1',
              value:0,
              disabled:true,
              children:[{
                label:'字典3',
                value:2
              }]
            },{
              label:'字典2',
              value:1
            }]
         }
        ]
      }
    }
  }
}
</script>

```
:::

## 可清空

:::demo 使用`clearable`属性即可得到一个可清空的输入框,默认为`true`
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
         {
            label:'树型选择框',
            prop:'tree',
            type:'tree',
            clearable:false,
            dicData:[{
              label:'字典1',
              value:0,
              children:[{
                label:'字典3',
                value:2
              }]
            },{
              label:'字典2',
              value:1
            }]
         }
        ]
      }
    }
  }
}
</script>

```
:::

## 辅助语

:::demo  配置下拉数据中`desc`字段
```html
<tvue-form :option="option"></tvue-form>
<script>
export default {
    data() {
      return {
        option: {
          column: [{
            label:'树型选择框',
            prop:'tree',
            type:'tree',
            dicData:[{
              label:'字典1',
              value:0,
              desc:'字典描述',
              children:[{
                label:'字典3',
                value:2
              }]
            },{
              label:'字典2',
              value:1
            }]
          }]
        }
      }
    }
}
</script>

```
:::

## 下拉框样式

```css
.popperClass .el-tree-node__content{
  background-color: rgba(0,0,0,.2);
}
```

:::demo `popperClass`属性配置样式的`class`名字
```html
<tvue-form  :option="option"></tvue-form>

<script>
export default {
    data() {
      return {
        option:{
          column: [{
              label: '树型选择框',
              prop: 'tree',
              type: 'tree',
              popperClass:'popperClass',
              dicData:[{
                label:'字典1',
                value:0,
                children:[{
                  label:'字典3',
                  value:2
                }]
              },{
                label:'字典2',
                value:1
              }]
          }]
        }
      };
    }
}
</script>
```
:::


## 字典属性
>指定标签文本和值，默认为label和value
:::demo 配置`props`属性来指定标签文本和值，默认为`label`和`value`
```html
<tvue-form :option="option"></tvue-form>
<script>
export default {
  data(){
    return {
       option:{
          column: [{
            label: '树形下拉框',
            prop: 'tree',
            type: 'tree',
            props:{
              label:'name',
              value:'code',
              children:'list'
            },
            dicData:[{
              name:'字典1',
              code:0,
              list:[{
                label:'字典3',
                code:2
              }]
            },{
              name:'字典2',
              value:1
            }]
          }]
       }
    }
  }
}
</script>

```
:::

## 网络字典
>更多用法参考[表单数据字典](/form/form-dic)

:::demo 配置`dicUrl`指定后台接口的地址
```html
<tvue-form :option="option"></tvue-form>
<script>
export default {
  data(){
    return {
       option:{
          column: [{
            label: '树形下拉框',
            prop: 'tree',
            type: 'tree',
            props: {
              label: 'name',
              value: 'code'
            },
            dicUrl: 'https://cli.avuejs.com/api/area/getProvince'
          }]
       }
    }
  }
}
</script>

```
:::

## 基础多选

:::demo  设置`multiple`属性即可启用多选，`leafOnly`属性是否不包含父类,此时值为当前选中值所组成的数组。默认情况下选中值会以 Tag 的形式展现，你也可以设置`tags`属性将它们合并为一段文字。
```html
<tvue-form v-model="form" :option="option"></tvue-form>

<script>
const dicData=[{
  label:'字典1',
  value:0,
  children:[{
    label:'字典3',
    value:2
  }]
},{
  label:'字典2',
  value:1
}]
export default {
    data() {
      return {
        form:{
          tree1:[1,2],
          tree2:[1,2]
        },
        option:{
          column: [{
              label: '多选',
              prop: 'tree1',
              type: 'tree',
              multiple:true,
              dicData:dicData
          },{
              label: '多选',
              prop: 'tree2',
              type: 'tree',
              leafOnly:true,
              multiple:true,
              tags:true,
              dicData:dicData
          }]
        }
      };
    }
}
</script>
```
:::

## 选择任意级别

:::demo 当属性`checkStrictly`为`true` 时,`leafOnly`必须设置为1`false`，任何节点都可以被选择
```html
<tvue-form :option="option"></tvue-form>
<script>
export default {
  data () {
    return {
      option: {
        column: [{
          label: '树型选择框',
          prop: 'tree',
          type: 'tree',
          checkStrictly: true,
          leafOnly:false,
          dicData: [{
            label: '字典1',
            value: 0,
            children: [{
              label: '字典3',
              value: 2
            }]
          }, {
            label: '字典2',
            value: 1
          }]
        }, {
          label: '树型选择框1',
          prop: 'tree1',
          type: 'tree',
          multiple: true,
          checkStrictly: true,
          dicData: [{
            label: '字典1',
            value: 0,
            children: [{
              label: '字典3',
              value: 2
            }]
          }, {
            label: '字典2',
            value: 1
          }]
        }]
      }
    };
  }
}
</script>
```
:::

## 基础过滤

:::demo  数据过滤`filter`属性默认为`true`,`filterText`为过滤框的文字
```html
<tvue-form :option="option"></tvue-form>

<script>
export default {
    data() {
      return {
        option:{
          column: [{
              label: '多选',
              prop: 'tree',
              type: 'tree',
              filterText:'自定义搜索文字',
              dicData:[{
                label:'字典1',
                value:0,
                children:[{
                  label:'字典3',
                  value:2
                }]
              },{
                label:'字典2',
                value:1
              }]
          },{
              label: '父类不可选',
              prop: 'tree',
              type: 'tree',
              parent:false,
              dicData:[{
                label:'字典1',
                value:0,
                children:[{
                  label:'字典3',
                  value:2,
                  children:[{
                    label:'字典4',
                    value:3
                  }]
                }]
              },{
                label:'字典2',
                value:1
              }]
          }]
        }
      };
    }
}
</script>
```
:::




## 节点事件

:::demo  
```html
<tvue-form  :option="option" ></tvue-form>

<script>
export default {
    data() {
      return {
        option:{
          column: [{
              label: '多选',
              prop: 'tree',
              type: 'tree',
              multiple:true,
              nodeClick:(data, node, nodeComp)=>{
                this.$message.success(JSON.stringify(data))
              },
              checked:(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys)=>{
                this.$message.success(JSON.stringify(checkedKeys))
              },
              dicData:[{
                label:'字典1',
                value:0,
                children:[{
                  label:'字典3',
                  value:2
                }]
              },{
                label:'字典2',
                value:1
              }]
          }]
        }
      };
    }
}
</script>
```
:::





## 自定义模板

:::demo 配置`prop`名称加`Type`卡槽开启即可自定义下拉框的内容,`typeformat`配置回显的内容,但是你提交的值还是`value`并不会改变
```html
<tvue-form :option="option" v-model="form">
  <template slot="codeType" slot-scope="{item,value,label}">
      <span>{{ item }}</span>
  </template>
  <template slot="codesType" slot-scope="{item,value,label}">
      <span>{{ item }}</span>
  </template>
</tvue-form>
<script>
var baseUrl = 'https://cli.avuejs.com/api/area'
export default {
    data() {
      return {
        form: {},
        option: {
          column: [{
              label: '单选',
              prop: 'code',
              type: 'tree',
              props: {
                label: 'name',
                value: 'code'
              },
              dicUrl: `${baseUrl}/getProvince`,
              typeformat(item, label, value) {
                return `值:${item[label]}-名:${item[value]}`
              },
              rules: [
                {
                  required: true,
                  message: '请选择省份',
                  trigger: 'blur'
                }
              ]
            }, {
              label: '多选',
              prop: 'codes',
              type: 'tree',
              props: {
                label: 'name',
                value: 'code'
              },
              multiple: true,
              dicUrl: `${baseUrl}/getProvince`,
              typeformat(item, label, value) {
                return `值:${item[label]}-名:${item[value]}`
              },
              rules: [
                {
                  required: true,
                  message: '请选择省份',
                  trigger: 'blur'
                }
              ]
            }
          ]
        }
      }
    }
}
</script>

```
:::


## 懒加载

:::demo  
```html
<tvue-form  :option="option" ></tvue-form>

<script>
let baseUrl = 'https://cli.avuejs.com/api/area'
export default {
    data() {
      return {
        option:{
          column: [{
            label:'懒加载',
            prop:'id',
            type:'tree',
            dicUrl:`${baseUrl}/getProvince?id={{key}}`,
            props: {
              label: 'name',
              value: 'code'
            },
            lazy:true,
            treeLoad: (node, resolve)=> {
              let stop_level = 2;
              let level = node.level;
              let data = node.data || {}
              let code = data.code;
              let list = [];
              let callback = () => {
                resolve((list || []).map(ele => {
                  return Object.assign(ele, {
                    leaf: level >= stop_level
                  })
                }));
              }
              if (level == 0) {
                axios.get(`${baseUrl}/getProvince`).then(res => {
                  list = res.data;
                  callback()
                })
              }
              if (level == 1) {
                axios.get(`${baseUrl}/getCity/${code}`).then(res => {
                  list = res.data;
                  callback()
                })
              } else if (level == 2) {
                axios.get(`${baseUrl}/getArea/${code}`).then(res => {
                  list = res.data;
                  callback()
                })
              }else{
                list=[]
                callback()
              }
            }
          }]
        }
      };
    }
}
</script>
```
:::

