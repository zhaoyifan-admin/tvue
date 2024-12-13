
# DataIcons 数据展示


:::demo 
```html
<tvue-data-icons :option="option"></tvue-data-icons>
<script>
export default {
  data(){
    return {
      option: {
        span:4,
        data: [
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: '今日注册',
            count: 12678,
            decimals:2,
            icon: 'el-icon-tickets',
            href:'https://avuejs.com',
            target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: '今日登录',
            count: 22139,
            icon: 'el-icon-success',
            href:'https://avuejs.com',
            target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: '今日订阅',
            count: 35623,
            icon: 'el-icon-info',
            href:'https://avuejs.com',
            target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: '今日评论',
            count: 16826,
            icon: 'el-icon-message',
            href:'https://avuejs.com',
            target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: '今日评论',
            count: 16826,
            icon: 'el-icon-message',
            href:'https://avuejs.com',
            target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: '今日评论',
            count: 16826,
            icon: 'el-icon-message',
            href:'https://avuejs.com',
            target:'_blank'
          }
        ]
      },
    }
  }
}
</script>

```
:::

## Attributes

| 参数      | 说明       | 类型    | 可选值     | 默认值 |
| --------- | ---------- | ------- | ---------- | ------ |
| animation | 是否动画   | Boolean | false/true | true   |
| decimals  | 小数点位数 | Number  | —          | 0      |
| span      | 栅格数     | String  | —          | 8      |
| data      | 数据       | Array   | —          | -      |

