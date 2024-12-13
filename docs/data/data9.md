# DataRotate 数据展示

:::tip
 1.0.4+
::::

:::demo 
```html
<tvue-data-rotate :option="option"></tvue-data-rotate>
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
              count: '150',
              title: '新订单',
              icon: 'el-icon-warning',
              color: 'rgb(49, 180, 141)'
            }, {
              click: function (item) {
                alert(JSON.stringify(item));
              },
              count: '53%',
              title: '跳出率',
              icon: 'el-icon-view',
              color: '#00a65a'
            }, {
              click: function (item) {
                alert(JSON.stringify(item));
              },
              count: '44',
              title: '用户注册数',
              icon: 'el-icon-setting',
              color: '#f39c12'
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

|参数|说明|类型|可选值|默认值|
|--------|------------------|------|------|------|
|animation|是否动画|Boolean|false/true|true|
|decimals|小数点位数|Number|—|0|
|span|栅格数|String|—|8|
|data|数据|Array|—|-|
