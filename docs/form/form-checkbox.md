# Checkbox多选框


## 基础用法
>由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

:::demo  通过将`type`属性的值指定为`checkbox`,同时配置`dicData`为字典值
```html
<tvue-form :option="option"></tvue-form>
<script>
export default {
    data() {
      return {
        option: {
          column: [{
              label: '多选',
              prop: 'checkbox',
              type: 'checkbox',
              dicData:[{
                label:'男',
                value:0
              },{
                label:'女',
                value:1
              },{
                label:'未知',
                value:''
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
            label:'多选框',
            prop:'checkbox',
            type:'checkbox',
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
            label:'多选框',
            prop:'checkbox',
            type:'checkbox',
            dicData:[{
              label:'男',
              value:0
            },{
              label:'女',
              value:1
            },{
              label:'未知',
              value:''
            }],
            value:[0]
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
            label:'多选框',
            prop:'checkbox',
            type:'checkbox',
            dicData:[{
              label:'男',
              value:0
            },{
              label:'女',
              value:1
            },{
              label:'未知',
              value:''
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
            label:'多选框',
            prop:'checkbox',
            type:'checkbox',
            dicData:[{
              label:'男',
              value:0
            },{
              label:'女',
              value:1,
              disabled:true
            },{
              label:'未知',
              value:''
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


## 全选
:::demo  配置`all`为`true`
```html
<tvue-form :option="option" ></tvue-form>
<script>
export default {
    data() {
      return {
        option: {
          column: [{
              label: '多选',
              prop: 'checkbox',
              type: 'checkbox',
              all:true,
              dicData:[{
                label:'男',
                value:0
              },{
                label:'女',
                value:1
              },{
                label:'未知',
                value:''
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



## 数量限制
:::demo  使用`min`和`max`属性能够限制可以被勾选的项目的数量。
```html
<tvue-form :option="option"></tvue-form>
<script>
export default {
    data() {
      return {
        option: {
          column: [{
              label: '空心多选',
              prop: 'checkbox',
              type: 'checkbox',
              min:0,
              max:2,
              dicData:[{
                label:'男',
                value:0
              },{
                label:'女',
                value:1
              },{
                label:'未知',
                value:''
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




## 按钮样式
:::demo  配置`button`为`true`
```html
<tvue-form :option="option" v-model="form"></tvue-form>
<script>
export default {
    data() {
      return {
        form: {
          checkbox:[0,1],
        },
        option: {
          column: [{
              label: '实心多选',
              prop: 'checkbox',
              type: 'checkbox',
              button:true,
              dicData:[{
                label:'男',
                value:0
              },{
                label:'女',
                value:1
              },{
                label:'未知',
                value:''
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



## 空心样式
:::demo  配置`border`为`true`
```html
<tvue-form :option="option"></tvue-form>
<script>
export default {
    data() {
      return {
        option: {
          column: [{
              label: '空心多选',
              prop: 'checkbox',
              type: 'checkbox',
              border:true,
              dicData:[{
                label:'男',
                value:0
              },{
                label:'女',
                value:1
              },{
                label:'未知',
                value:''
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
