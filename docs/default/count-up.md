# CountUp数字动画
数字动画效果
:::tip
 1.0.10+
::::


:::demo 
```html
<div  style="font-size:43px;font-weight:500;color:red;">
  <p><tvue-count-up :end="15033.2"></tvue-count-up></p>
  <p><tvue-count-up :end="1233.2" :start="1000"></tvue-count-up></p>
</div>
<script>
export default {
  
}
</script>

```
:::

## Variables

|参数|说明|类型|可选值|默认值|
|-------------|-------------------------------------------------------------|--------|------|------|
|start|开始时的数字|Number|-|0|
|end|结束时的数字|Number|-|-|
|decimals|是否支持小数|Number|-|0|
|duration|动画速度|Number|-|2|
|options|CountUp.js其他配置|Object|-|-|
|callback|开始时候的回调|Function|-|-|
