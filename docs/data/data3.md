
# DataCard 数据展示


:::demo 
```html
<tvue-data-card :option="option"></tvue-data-card>
<script>
export default {
  data(){
    return {
      option: {
        span:8,
        data: [
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            name: '小马',
            src: '/images/card-1.jpg',
            text: 'xxxxxxxx',
            href:'https://avuejs.com',
            target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            name: '网易掌门人',
            src: '/images/card-3.jpg',
            text: 'xxxxxx',
            href:'https://avuejs.com',
            target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            name: '桐谷和人',
            src: '/images/card-4.jpg',
            text: 'xxxxx',
            href:'https://avuejs.com',
            target:'_blank'
          },
        ]
      },
    }
  }
}
</script>

```
:::
