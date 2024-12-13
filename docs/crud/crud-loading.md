# 等待加载

## 普通用法
:::demo `table-loading`属性可以配置等待加载状态
```html
<el-button type="primary"
            icon="el-icon-sort"
            @click="getOption">加载等待框</el-button>
<br /> <br />
<tvue-crud :key="reload"
            :data="data"
            :option="option"
            :table-loading="loading"></tvue-crud>
<script>
export default {
  data () {
    return {
      reload: Math.random(),
      loading: true,
      data: [],
      option: {
        border: true,
        align: 'center',
        menuAlign: 'center',
        loadingText: "Loading...",
        loadingSpinner: "svg",
        loadingSvgViewBox: "-10, -10, 50, 50",
        loadingBackground: "rgba(122, 122, 122, 0.8)",
        column: [
          {
            label: '姓名',
            prop: 'name'
          }, {
            label: '性别',
            prop: 'sex'
          }]
      },
    };
  },
  created () {
    this.getOption()
  },
  methods: {
    getOption () {
      this.loading = true;
      this.$message.success('模拟2s后服务端动态加载');
      setTimeout(() => {
        this.data = [
          {
            name: '张三',
            sex: '男',
            province: '110000'
          }, {
            name: '李四',
            sex: '女',
            province: '120000'
          }
        ]
        this.loading = false;
        this.reload = Math.random()
      }, 2000)

    }
  }
}
</script>

```
:::
```
:::

