# Object对象形式
:::tip
 2.10.12+
::::

:::tip
之前的版本option中column是数组的格式，2.10.12+后支持对象格式，操作更加方便
::::

:::demo  `option`中的`column`可以配置成对象形式，用`prop`作为`key`
```html
<tvue-crud :option="option" :data="data" ></tvue-crud>

<script>
export default {
  data () {
    return {
      form: {},
      data: [{
        name: '姓名',
        sex: 14
      }],
      option: {
        labelWidth: 120,
        column: {
          name: {
            label: '姓名',
          },
          sex: {
            label: '年龄',
          }
        }
      }
    }
  },
  created () {
    this.option.column.name.label += '(name)';
  }
}
</script>

```
:::
