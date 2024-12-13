
# Array数组框



## 基础用法

:::demo 通过将`type`属性的值指定为`array`
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
         {
            label:'数组框',
            prop:'array',
            type:'array'
         }
        ]
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
            label:'数组框',
            prop:'array',
            type:'array',
            value:[0,1]
         }
        ]
      }
    }
  }
}
</script>

```
:::

## 最大限制

:::demo `limit`限制最大个数
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
         {
            label:'数组框',
            prop:'array',
            type:'array',
            limit:3,
            value:[0,1,2]
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
            label:'数组框',
            prop:'array',
            type:'array',
            disabled:true,
            value:[0,1]
         }
        ]
      }
    }
  }
}
</script>

```
:::

## 图片框

:::demo 通过将`type`属性的值指定为`img`
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
         {
            label:'图片框',
            prop:'array',
            type:'img',
            value:['/images/logo-bg.jpg']
         }, {
            label:'单个图片框',
            prop:'array',
            alone:true,
            type:'img',
            value:['/images/logo-bg.jpg']
         }
        ]
      }
    }
  }
}
</script>

```
:::

## 超链接框

:::demo 通过将`type`属性的值指定为`url`
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
         {
            label:'超链接框',
            prop:'array',
            type:'url',
            value:['http://avuejs.com']
         },
         {
            label:'单个超链接框',
            prop:'array',
            alone:true,
            type:'url',
            value:['http://avuejs.com']
         }
        ]
      }
    }
  }
}
</script>

```
:::




