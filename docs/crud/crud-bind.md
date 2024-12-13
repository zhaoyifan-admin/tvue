# 深层结构数据
:::tip
 2.6.11+
::::

## 普通用法 
:::demo  `bing`绑定深层次的结构对象，`prop`也是需要填写
```html
<tvue-crud :option="option" :data="data" ></tvue-crud>

<script>
export default{
  data() {
    return {
      form:{},
      data: [{ 
        deep:{
          deep:{
            deep:{
              value:'我是深结构'
            }
          }
        }
      }],
      option: {
        labelWidth: 120,
        column: [
          {
            label: '深结构',
            prop: 'test',
            bind:'deep.deep.deep.value'
          }
        ]
      }
    }
  }
}
</script>

```
:::
