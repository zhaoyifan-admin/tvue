# DataOperatext 数据展示

:::tip
 1.0.4+
::::

:::demo 
```html
<tvue-data-operatext :option="option"></tvue-data-operatext>
<script>
export default {
  data(){
    return {
        option: {
          span: 8,
          data: [
            {
              click: function (item) {
                alert(JSON.stringify(item));
              },
              title: 'smallwei',
              subtitle: 'avue部门-前端研发工程师',
              img: 'https://avatar.gitee.com/uploads/61/632261_smallweigit.jpg!avatar100?1518660401',
              color: '#00a7d0',
              list: [{
                label: '点赞',
                value: '3,200'
              }, {
                label: '关注',
                value: '13,000'
              }, {
                label: '项目',
                value: '13,000'
              }]
            },
            {
              click: function (item) {
                alert(JSON.stringify(item));
              },
              title: 'smallwei',
              subtitle: 'avue部门-前端研发工程师',
              img: 'https://avatar.gitee.com/uploads/61/632261_smallweigit.jpg!avatar100?1518660401',
              color: '#f39c12',
              list: [{
                label: '点赞',
                value: '3,200'
              }, {
                label: '关注',
                value: '13,000'
              }, {
                label: '项目',
                value: '13,000'
              }]
            },
            {
              click: function (item) {
                alert(JSON.stringify(item));
              },
              title: 'smallwei',
              subtitle: 'avue部门-前端研发工程师',
              img: 'https://avatar.gitee.com/uploads/61/632261_smallweigit.jpg!avatar100?1518660401',
              colorImg: 'http://img.sccnn.com/bimg/337/15595.jpg',
              list: [{
                label: '点赞',
                value: '3,200'
              }, {
                label: '关注',
                value: '13,000'
              }, {
                label: '项目',
                value: '13,000'
              }]
            },
          ]
        },
      }
  }
}
</script>

```
:::
