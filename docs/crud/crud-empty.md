# 空状态
:::tip
 1.0.8+
::::

## 普通用法
:::demo `emptyText`属性可以配置空状态时的提示语
```html

<tvue-crud ref="crud" :option="option" :data="data"></tvue-crud>
<script>
export default {
    data() {
      return {
        option: {
          emptyText: '自定义暂无数据提示语',
          column: [{
            label: '姓名',
            prop: 'name'
          }, {
            label: '年龄',
            prop: 'sex'
          }]
        },
        data: []
      }
    }
}
</script>

```
:::


## 自定义空状态
:::demo 当然你也可以自定义`empty`卡槽
```html

<tvue-crud ref="crud" :option="option" :data="data">
  <template slot="empty">
    <tvue-empty
      :image-size="450"
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        desc="自定义的提示语">
        <el-button type="primary" @click="handleAdd">新增数据</el-button>
      </tvue-empty>
  </template>
</tvue-crud>
<script>
export default {
    data() {
      return {
        option: {
          emptyText: '自定义暂无数据提示语',
          column: [{
            label: '姓名',
            prop: 'name'
          }, {
            label: '年龄',
            prop: 'sex'
          }]
        },
        data: []
      }
    },
    methods:{
      handleAdd(){
        this.$refs.crud.rowAdd();
      }
    }
}
</script>

```
:::

