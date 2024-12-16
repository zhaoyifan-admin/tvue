# 地图坐标选择器

## 代码
[代码地址](https://gitee.com/smallweigit/avue-plugin-map)

## 新特性
- 基于高德地图开发
- 可以手动选择坐标
- 可以模糊搜索

## 使用
- 1.npm install avue-plugin-map --save
- 2.import TvueMap from 'avue-plugin-map'
- 3.Vue.use(TvueMap);
- 4.参考如下代码使用

<Map></Map>

```html
{{text}}
<tvue-map v-model="text"></tvue-map>
<script>
export default {
  data() {
    return {
      text:{
        formattedAddress: "天安门广场", 
        longitude: 116.39775500000002, 
        latitude: 39.903179
      }
    }
  }
};

```
:::


