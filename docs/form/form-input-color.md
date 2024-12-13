# Color颜色选择器

## 基础用法
:::demo  通过将`type`属性的值指定为`color`
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
          {
            label: '颜色选择器',
            prop: 'color',
            type: 'color'
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
            label: '颜色选择器',
            prop: 'color',
            type: 'color',
            value:'rgba(71, 46, 46, 1)'
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
            label: '颜色选择器',
            prop: 'color',
            type: 'color',
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


## 颜色格式
:::demo  
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
          {
            label: '颜色选择器',
            prop: 'color',
            type: 'color',
            colorFormat:"hex",
            showAlpha:false
          }
        ]
      }
    }
  }
}
</script>

```
:::

## 预定义颜色
:::demo  
```html
<tvue-form :option="option"></tvue-form>

<script>
export default{
  data() {
    return {
      option: {
        column: [
          {
            label: '颜色选择器',
            prop: 'color',
            type: 'color',
            predefine: [
              '#ff4500',
              '#ff8c00',
              '#ffd700'
            ]
          }
        ]
      }
    }
  }
}
</script>

```
:::
