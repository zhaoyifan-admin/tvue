# 拖拽排序

``` html
<!-- 导入需要的包 （一定要放到index.html中的head标签里） -->
<script src="https://cdn.staticfile.net/Sortable/1.10.0-rc2/Sortable.min.js"></script>
```

:::demo `sortable`设置为`true`即可同时开启行和列的拖拽功能
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
          sortable:true,
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





