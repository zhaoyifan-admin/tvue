# Map坐标选择器

``` html
<!-- 导入需要的包 （一定要放到index.html中的head标签里） -->
<!-- 高德地图api更新必须配合安全密钥使用 -->
<script>
  window._AMapSecurityConfig = {
    securityJsCode: 'xxxxx',
  }
</script>
<script type="text/javascript" src='https://webapi.amap.com/maps?v=1.4.11&key=xxxxxxxx&plugin=AMap.PlaceSearch'></script>
<script src="https://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
```

## 基础用法
:::demo  
```html
<tvue-form :option="option" ></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
          column: [
            {
              label: '坐标',
              prop: 'map',
              type: 'map',
            }]
        }
    }
  }
}
</script>

```
:::

## 默认值

:::demo `value`属性可以提供一个初始化的默认值
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
         {
            label: '坐标',
            prop: 'map',
            type: 'map',
            value:[ 113.10235504165291, 41.03624227495205, "内蒙古自治区乌兰察布市集宁区新体路街道顺达源广告传媒" ] 
         }
        ]
      }
    }
  }
}
</script>

```
:::

## 禁用状态

:::demo 通过`disabled`属性指定是否禁用
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
         {
            label: '坐标',
            prop: 'map',
            type: 'map',
            disabled:true
         }
        ]
      }
    }
  }
}
</script>

```
:::

## 高德参数
:::demo  
```html
<tvue-form :option="option" v-model="form" ></tvue-form>

<script>
export default{
  data() {
    return {
      form: {
        map: [ 113.10235504165291, 41.03624227495205, "内蒙古自治区乌兰察布市集宁区新体路街道顺达源广告传媒" ] 
      },
      option: {
          column: [
            {
              label: '坐标',
              prop: 'map',
              type: 'map',
              mapChange:(params)=>{
                console.log('高德参数',params)
              },
              //高德初始化参数
              params:{
                zoom: 10,
                zoomEnable: false,
                dragEnable: false,
              }
            }]
        }
    }
  }
}
</script>

```
:::

