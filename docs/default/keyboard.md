# Keyboard 键盘组件
:::tip
 2.2.0+
::::




:::demo 
```html
<el-form :inline="true">
  <el-form-item label="输入框1">
    <el-input  ref="text" id="text" v-model="text" placeholder="点击我，完后用虚拟键盘输入"></el-input>
  </el-form-item>
  <el-form-item label="输入框2">
    <el-input  ref="text2" id="text2" v-model="text2" placeholder="点击我，完后用虚拟键盘输入"></el-input>
  </el-form-item>
</el-form>
<tvue-keyboard ref="kb" :ele="ele" :keys="keys" @click="handleKeyboardClick" style="width: 800px; height: 300px">
</tvue-keyboard>
<script>
export default {
  data() {
      return {
        // keys: [
        //   ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        //   ['a', 'b', 'c', 'd', 'Shift', '清空']
        // ],
        text: '',
        text2:'',
        ele: 'text'
      }
    },
    mounted() {
      this.$refs.text.focus();
      // 自定义按键绑定click
      this.$refs.kb.bindClick("清空", () => {
        this[this.ele] = ''
      })

      // 模拟更换输入框
      setTimeout(() => {
        this.ele = "text2"
      }, 5000);
    },
    methods: {
      // 键盘点击
      handleKeyboardClick(key, val) {
        this[this.ele] = val
      }
    }
}
</script>

```
:::

## Variables

|参数|说明|类型|可选值|默认值|
|-------------|-------------------------------------------------------------|--------|------|------|
|type|键盘类型|String|default/number|default|
|theme|主题|String|default/green/dark/classic|default|

<br /><br /><br /><br /><br /><br /><br />



