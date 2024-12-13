# TextEllipsis 超出文本省略

当问题太多时可以只展示部分，后面省略显示
:::tip
 1.0.4+
::::


## 基本调用
:::demo 
```html
<tvue-text-ellipsis :text="text" :height="50" :width="200">
  <small slot="more">...</small>
</tvue-text-ellipsis>
<script>
export default {
  data() {
      return {
        text: "《华盛顿自由灯塔报》几天前报道称，美国国防部官员透露中国近日进行第十次东风-41洲际导弹的试射活动，这次试射中东风-41导弹投射了多个弹头并成功命中中国西部靶场目标。"
      }
  }
}
</script>

```
:::

## 自定义前缀后缀
:::demo 
```html
<tvue-text-ellipsis :text="text" :height="100" :width="200">
  <small slot="more">...</small>
  <el-tag slot="before" size="small">new</el-tag>
  <small slot="after">[09/14]</small>
</tvue-text-ellipsis>
<script>
export default {
  data() {
      return {
        text: "《华盛顿自由灯塔报》几天前报道称，美国国防部官员透露中国近日进行第十次东风-41洲际导弹的试射活动，这次试射中东风-41导弹投射了多个弹头并成功命中中国西部靶场目标。"
      }
  }
}
</script>

```
:::

## 自定义更多
:::demo 
```html
<tvue-text-ellipsis :text="text" :height="100" :width="200" :is-limit-height="isLimitHeight" @show="show"
  @hide="hide">
  <el-tag slot="before" size="small">new</el-tag>
  <small slot="more"><span>...</span><span class="link" @click="isLimitHeight=false">查看更多</span></small>
  <small slot="after" class="link" v-if="!isLimitHeight" @click="isLimitHeight=true">收起</small>
</tvue-text-ellipsis>
<script>
export default {
  data() {
      return {
        text: "《华盛顿自由灯塔报》几天前报道称，美国国防部官员透露中国近日进行第十次东风-41洲际导弹的试射活动，这次试射中东风-41导弹投射了多个弹头并成功命中中国西部靶场目标。",
        isLimitHeight: true
      }
  }
}
</script>

```
:::

## 当被隐藏文字的时候，使用tooltip提示
:::demo 
```html
<tvue-text-ellipsis :key="text" :text="text" :height="40" :width="200" use-tooltip placement="top">
  <small slot="more">...</small>
</tvue-text-ellipsis>
<script>
export default {
   data() {
      return {
        text: "《华盛顿自由灯塔报》几天前报道称，美国国防部官员透露中国近日进行第十次东风-41洲际导弹的试射活动，这次试射中东风-41导弹投射了多个弹头并成功命中中国西部靶场目标。"
      }
  },
  methods: {
    show() {
      this.$message.success('show');
    },
    hide() {
      this.$message.success('hide')
    }
  }
}
</script>

```
:::



## Variables

|参数|说明|类型|可选值|默认值|
|-------------|-------------------------------------------------------------|--------|------|------|
|text|需要省略的文本|String|-|-|
|width|限制的宽|Number|-|-|
|height|限制的高|Number|-|-|
|is-limit-height|是否开启限制|Boolean|-|true|
|use-tooltip|是否使用tooltip|Boolean|-|false|
|placement|tooltip的placement|String|-|


## Events
|事件名|说明|参数|
|------------------|---------------------------|-------------------------|
|show|当isLimitHeight为true，文本全部展示的时候|-|
|hide|当isLimitHeight为true，文本省略的时候|-|


