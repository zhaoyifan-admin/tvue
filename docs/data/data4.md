
# DataCardtext 数据展示

:::tip
 1.0.2+
::::

:::demo 
```html
<tvue-data-cardtext :option="option"></tvue-data-cardtext>
<script>
export default {
  data(){
    return {
      option: {
        span:6,
        data: [
          {
              click: function (item) {
                alert(JSON.stringify(item));
              },
              title:'香菜',
              color:'yellow',
              icon:'el-icon-mobile-phone',
              content:'殷其雷，天阴霾，雨零耶，盼君留。 殷其雷，纵不零，卿若留，吾将从。',
              href:"http://www.baidu.com",
              target:'_blank',
              name:'文件上传',
              date:'1天前'
          },
          {
              click: function (item) {
                alert(JSON.stringify(item));
              },
              title:'钉宫',
              icon:'el-icon-bell',
              color:'green',
              content:'殷其雷，天阴霾，雨零耶，盼君留。 殷其雷，纵不零，卿若留，吾将从。',
              href:"http://www.baidu.com",
              name:'流加载',
              date:'1天前'
          },
          {
              click: function (item) {
                alert(JSON.stringify(item));
              },
              title:'亚丝娜',
              icon:'el-icon-service',
              color:'#3fa1ff',
              content:'殷其雷，天阴霾，雨零耶，盼君留。 殷其雷，纵不零，卿若留，吾将从。',
              href:"http://www.baidu.com",
              name:'表单',
              date:'1天前'
          },
          {
              click: function (item) {
                alert(JSON.stringify(item));
              },
              title:'狂三',
              icon:'el-icon-time',
              color:'red',
              content:'殷其雷，天阴霾，雨零耶，盼君留。 殷其雷，纵不零，卿若留，吾将从。',
              href:"http://www.baidu.com",
              name:'文件上传',
              date:'1天前'
          }
        ]
      },
    }
  }
}
</script>

```
:::
