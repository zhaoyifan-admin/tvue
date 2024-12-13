# Switch开关

## 基础用法
>表示两种相互对立的状态间的切换，多用于触发「开/关」
:::demo 通过将`type`属性的值指定为`switch`,同时配置`dicData`为字典值

```html
<tvue-form :option="option"></tvue-form>
<script>
export default {
  data(){
    return {
       option:{
          column: [{
            label: '开关',
            prop: 'switch',
            type: 'switch',
            dicData:[{
              label:'关',
              value:0
            },{
              label:'开',
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
            label: '开关',
            prop: 'switch',
            type: 'switch',
            dicData:[{
              label:'关',
              value:0
            },{
              label:'开',
              value:1
            }],
            value:1
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
            label: '开关',
            prop: 'switch',
            type: 'switch',
            dicData:[{
              label:'关',
              value:0
            },{
              label:'开',
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
            label: '开关',
            prop: 'switch',
            type: 'switch',
            props:{
              label:'name',
              value:'code'
            },
            dicData:[{
              name:'关',
              code:0
            },{
              name:'开',
              code:1
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

:::demo 配置`dicUrl`指定后台接口的地址，默认只会取前2项
```html
<tvue-form :option="option"></tvue-form>
<script>
export default {
  data(){
    return {
       option:{
          column: [{
            label: '开关',
            prop: 'switch',
            type: 'switch',
            props:{
              label:'name',
              value:'code'
            },
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


## 按钮颜色
:::demo 使用`activeColor`属性与`inactiveColor`属性来设置开关的文字描述。

```html
<tvue-form :option="option"></tvue-form>
<script>
export default {
  data(){
    return {
       option:{
          column: [{
            label: '开关',
            prop: 'switch',
            type: 'switch',
            activeColor:"#13ce66",
            inactiveColor:"#ff4949",
            dicData:[{
              label:'关',
              value:0
            },{
              label:'开',
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

