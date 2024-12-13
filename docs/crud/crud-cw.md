# 表格错位问题

:::tip
 如果表格出现错位问题，是fixed冻结列导致的，去掉冻结列即可,或者[表格初始化](/crud/crud-ajax)
::::

:::demo 配置`indexFixed`,`selectionFixed`,`expandFixed`可以配置序号，多选，面板是否为冻结
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
          // indexWidth:100,
          selection:true,
          // selectionWidth:100,
          selectionFixed:false,
          expand:true,
          // expandWidth:100,
          expandFixed:false,
          align:'center',
          menuFixed:false,
          menuAlign:'center',
          column:[
             {
              label:'姓名',
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