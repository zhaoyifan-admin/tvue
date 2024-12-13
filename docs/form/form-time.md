# Time时间

## 基础用法

:::demo 
```html
<tvue-form :option="option"></tvue-form>

<script>
export default {
    data() {
      return {
        option:{
          column: [{
              label: "时间",
              prop: "time",
              type: "time",
          }]
        },
      };
    }
}
</script>

```
:::

## 下拉框样式


```css
.popperClass .el-time-spinner__item{
  background-color: rgba(0,0,0,.2);
}
```

:::demo  `popperClass`属性配置样式的`class`名字
```html
<tvue-form :option="option"></tvue-form>

<script>
export default {
    data() {
      return {
        option:{
          column: [{
              label: "时间",
              prop: "time",
              popperClass:'popperClass',
              type: "time",
          }]
        },
      };
    }
}
</script>

```
:::

## 固定时间点

:::demo，可设置`pickerOptions`中分别通过`start`、`end`和`step`指定可选的起始时间、结束时间和步长
```html
<tvue-form :option="option"></tvue-form>

<script>
export default {
    data() {
      return {
        option:{
          column: [{
              label: "时间",
              prop: "time",
              type: "time",
              pickerOptions:{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }
          }]
        },
      };
    }
}
</script>

```
:::


## 格式化

:::demo 使用`format`指定输入框的格式；使用`valueFormat`指定绑定值的格式。 
```html
<tvue-form :option="option"></tvue-form>

<script>
export default {
    data() {
      return {
        option:{
          column: [{
              label: "时间",
              prop: "time",
              type: "time",
              format:'HH时mm分ss秒',
              valueFormat:'HH:mm:ss'
          }]
        },
      };
    }
}
</script>
```
:::

## 时间范围

:::demo  
```html
<tvue-form  :option="option"></tvue-form>

<script>
export default {
    data() {
      return {
        option:{
          column: [{
              label: "时间范围",
              prop:'timerange',
              type: 'timerange',
              format:'HH:mm:ss',
              valueFormat:'HH:mm:ss',
              startPlaceholder: '时间开始范围自定义',
              endPlaceholder: '时间结束范围自定义',
          }]
        },
      };
    }
}
</script>

```
:::

## 固定时间范围
>若先选择开始时间，则结束时间内备选项的状态会随之改变
:::demo  
```html
<tvue-form v-model="form" :option="option"></tvue-form>

<script>
export default {
    data() {
      return {
        form:{}
      };
    },
    computed:{
      option(){
        return {
          column: [{
              label: "开始时间",
              prop:'start',
              type: 'time',
              format:'HH:mm:ss',
              pickerOptions:{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }
          },{
              label: "结束时间",
              prop:'end',
              type: 'time',
              format:'HH:mm:ss',
              pickerOptions:{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: this.form.start
              }
          }]
        }
      }
    }
}
</script>

```
:::
