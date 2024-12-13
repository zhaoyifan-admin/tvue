# 分页


## 页码和条数
:::demo `currentPage`当前页码，`total`总条数，`pageSize`每页多少条数据
```html
<p>
页码:{{page.currentPage}}
<el-button type="primary" @click="page.currentPage=page.currentPage+1">页码+1</el-button>
</p>
<p>
条数:{{page.pageSize}}
<el-button type="primary" @click="page.pageSize=page.pageSize+10">条数+10</el-button>
</p>
<p>
总数:{{page.total}}
<el-button type="primary" @click="page.total=page.total+10">总页数+10</el-button>
</p>
<tvue-crud :data="data" :option="option" :page.sync="page"></tvue-crud>

<script>
  export default {
    data() {
      return {
        page:{ 
          total: 1000, 
          currentPage: 1, 
          pageSize: 10
        },
        data: [],
        option: {
          header:false,
          column:[{
            label:'姓名',
            prop:'name'
          }]
        }
      }
    }
  }
</script>
```
:::

## 设置最大页码按钮数
:::demo `pagerCount`属性默认为7
```html
<tvue-crud :data="data" :option="option" :page.sync="page"></tvue-crud>

<script>
  export default {
    data() {
      return {
        page:{
          pagerCount:11,
          total:1000
        },
        data: [],
        option: {
          header:false,
          column:[{
            label:'姓名',
            prop:'name'
          }]
        }
      }
    }
  }
</script>
```
:::

## 无背景色的分页
:::demo `background`属性默认为`true`
```html
<tvue-crud :data="data" :option="option" :page.sync="page"></tvue-crud>

<script>
  export default {
    data() {
      return {
        page:{
          background:false,
          total:1000
        },
        data: [],
        option: {
          header:false,
          column:[{
            label:'姓名',
            prop:'name'
          }]
        }
      }
    }
  }
</script>
```
:::

## 附加功能
:::demo `layout`属性中的每一项都是附加功能，可以自行操作
```html
<el-button type="small" @click="page.layout='sizes,pager'">简单模式</el-button>
<el-button type="small" @click="page.layout='total, sizes, prev, pager, next, jumper'">复杂模式</el-button>
<tvue-crud :data="data" :option="option" :page.sync="page"></tvue-crud>

<script>
  export default {
    data() {
      return {
        page:{
          total:1000,
          layout: "total, sizes, prev, pager, next, jumper", 
        },
        data: [],
        option: {
          header:false,
          column:[{
            label:'姓名',
            prop:'name'
          }]
        }
      }
    }
  }
</script>
```
:::


## 综合用法
:::tip
- 配合[增删改查方法去使用](/crud/crud-fun.html)实现完整的表格功能
::::

:::demo 首次加载调用`on-load`方法加载数据，返回`page`分页对象信息,赋值`page`的`total`总条数即可,如果`total`为0的话，或者`simplePage`为true只有1页的时候，分页选择器会隐藏
```html
{{page}}
<tvue-crud
  :data="data"
  :option="option"
  :page.sync="page"
  @on-load="onLoad"
></tvue-crud>

<script>
  export default {
    data() {
      return {
        page: {
          pageSize: 20,
          pagerCount:5
        },
        data: [],
        option: {
          align: 'center',
          menuAlign: 'center',
          column: [
            {
              label: '姓名',
              prop: 'name'
            },
            {
              label: '性别',
              prop: 'sex'
            }
          ]
        }
      }
    },
    methods: {
      onLoad(page) {
        this.$message.success('分页信息:' + JSON.stringify(page))
        this.page.total = 40
        //模拟分页
        if (this.page.currentPage === 1) {
          this.data = [
            {
              id:1,
              name: '张三',
              sex: '男'
            },{
              id:2,
              name: '李四',
              sex: '女'
            }
          ]
        } else if (this.page.currentPage == 2) {
          this.data = [
            {
              id:3,
              name: '王五',
              sex: '女'
            },{
              id:4,
              name: '赵六',
              sex: '女'
            }
          ]
        }
      }
    }
  }
</script>
```

:::

## 自定义分页

:::demo 实际的用法要后台配置，将后台返回值赋值给 page 中的属性， `page`就是分页对象注入，page 对象中的`total`为总页数，`pageSizes`为分页信息，`currentPage`为当前第几页，`pageSize`每一页加载多少条数据，点击页码会调用`current-change`方法回调当前页数，返回当前第几页，点击每页多少条会调`size-change`方法回调

```html
{{page}}
<tvue-crud
  :data="data"
  :option="option"
  :page.sync="page"
  @size-change="sizeChange"
  @current-change="currentChange"
></tvue-crud>

<script>
  export default {
    data() {
      return {
        page: {
          currentPage: 1,
          total: 0,
          layout: "total,pager,prev, next",
          background:false,
          pageSize: 10
        },
        data: [],
        option: {
          align: 'center',
          menuAlign: 'center',
          column: [
            {
              label: '姓名',
              prop: 'name'
            },
            {
              label: '性别',
              prop: 'sex'
            }
          ]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.page.total = 40
        if (this.page.currentPage === 1) {
          this.data = [
            {
              id:1,
              name: '张三',
              sex: '男'
            },{
              id:2,
              name: '李四',
              sex: '女'
            }
          ]
        } else if (this.page.currentPage == 2) {
          this.data = [
            {
              id:3,
              name: '王五',
              sex: '女'
            },{
              id:4,
              name: '赵六',
              sex: '女'
            }
          ]
        }if (this.page.currentPage === 1) {
          this.data = [
            {
              id:1,
              name: '张三',
              sex: '男'
            },{
              id:2,
              name: '李四',
              sex: '女'
            }
          ]
        } else if (this.page.currentPage == 2) {
          this.data = [
            {
              id:3,
              name: '王五',
              sex: '女'
            },{
              id:4,
              name: '赵六',
              sex: '女'
            }
          ]
        }
      },
      sizeChange(val) {
        this.page.currentPage = 1
        this.page.pageSize = val
        this.getList()
        this.$message.success('行数' + val)
      },
      currentChange(val) {
        this.page.currentPage = val
        this.getList()
        this.$message.success('页码' + val)
      }
    }
  }
</script>
```

:::

