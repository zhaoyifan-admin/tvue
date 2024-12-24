# Code 代码高亮
可以高亮显示代码,不同的主题风格导入不同包即可
:::tip
 1.0.11+
::::

``` html
<!-- 导入需要的包 （一定要放到index.html中的head标签里） -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/dark.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js"></script>
```



:::demo 
```html
<tvue-code syntax="javascript" :height="300">
      //在main.js中使用
      Vue.use(TVUE);
    </tvue-code>
<script>
export default {
  
}
</script>

```
:::


## Variables

|参数|说明|类型|可选值|默认值|
|-------------|-------------------------------------------------------------|--------|------|------|
|syntax|代码类型|String|-|具体参考highlight.js|
|height|代码块的高度|Number|-|300|



