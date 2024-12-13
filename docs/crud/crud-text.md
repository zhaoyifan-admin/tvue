# 按钮文案和图标
:::tip
 2.5.0+
::::

:::demo  对应按钮的名称加上`Text`即使按钮的文案，加上`Icon`即使按钮的图标，如果设置图标为`' '`则是不使用图标
```html
<tvue-crud :data="data" :option="option"></tvue-crud>

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
          align:'center',
          menuAlign:'center',
          menuWidth:400,
          viewBtn:true,
          menuTitle:'其它',
          addTitle: '保存标题',
          editTitle: '编辑标题',
          viewTitle: '查看标题',
          searchBtnText:'搜索文案',
          emptyBtnText:'清空文案',
          addBtnText:'新增文案',
          addBtnIcon:'el-icon-user',
          delBtnText:'删除文案',
          delBtnIcon:' ',
          editBtnIcon:' ',
          editBtnText:'编辑文案',
          viewBtnText:'查看文案',
          printBtnText:'打印文案',
          excelBtnText:'导出文案',
          updateBtnText:'修改文案',
          saveBtnText:'保存文案',
          cancelBtnText:'取消文案',
          printBtn:true,
          excelBtn:true,
          column:[
             {
              label:'姓名',
              prop:'name',
              search:true
            }, {
              label:'性别',
              prop:'sex',
              search:true
            }
          ]
        },
      };
    }
}
</script>
```
:::