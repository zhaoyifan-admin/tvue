# 表单默认值

## 配置方法
:::demo  配置`value`为字段默认值
```html
<tvue-form :option="option" v-model="form" > </tvue-form>

<script>
export default{
  data() {
    return {
      form: {},
      option: {
        column: [
          {
            label: '姓名',
            prop: 'name',
            value:'small'
          }
        ]
      }
    }
  }
}
</script>

```
:::

## 赋值方法
:::demo  利用`v-model`绑定的对象直接操作即可
```html
<el-button @click="changeText" size="small" type="success">改变值</el-button>
<br/><br/>
<tvue-form :option="option" v-model="form" > </tvue-form>

<script>
export default{
  data() {
    return {
      form: {
        name:'small'
      },
      option: {
        column: [
          {
            label: '姓名',
            prop: 'name'
          }
        ]
      }
    }
  },
  methods:{
      changeText(){
        this.form.name="我改变了"
      }
  }
}
</script>

```
:::
