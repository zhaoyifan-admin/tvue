# Title标题
:::tip
 2.6.15+
::::

## 普通用法

:::demo  
```html
<tvue-form v-model="form" :option="option" ></tvue-form>

<script>
export default {
    data() {
      return {
        form:{
          title:'我是头部标题',
          title1:'我是尾部标题'
        },
        option:{
          column: [{
                  label: "",
                  labelWidth:20,
                  type:'title',
                  prop: "title",
                  span:24,
                  styles:{
                    color:'red',
                    fontSize:'24px'
                  }
              },
              {
                label:'输入框',
                prop:'text'
              },{
                  label: "",
                  labelWidth:20,
                  type:'title',
                  prop: "title1",
                  span:24,
                  styles:{
                    color:'green',
                    fontSize:'18px'
                  }
              },
          ]
        }
      };
    }
}
</script>

```
:::