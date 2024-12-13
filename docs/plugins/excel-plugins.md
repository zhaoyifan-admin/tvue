# Excel导入导出

## 代码
[代码地址](https://gitee.com/smallweigit/tvue-plugin-excel)



## 使用
- 1.npm install tvue-plugin-excel --save
- 2.import $Excel from 'tvue-plugin-excel'
- 3.$Excel();
- 4.参考如下代码使用

<Excel></Excel>
```html
 <template>
  <div>
    <button id="button1"
            ref="button">导出excel</button>
    <input type="file"
           onchange="change(this)">
    <div style="height:30px"></div>
    <textarea id="text"
              class="text">
      [{
      "name": "张三",
      "sex": "男"
    }]
</textarea>
  </div>
</template>

<script>
import $Excel from 'tvue-plugin-excel'
export default {
  mounted () {
    this.$nextTick(() => {
      var text = document.getElementById('text');
      var button1 = document.getElementById('button1')
      button1.onclick = () => {
        let opt = {
          title: '文档标题',
          column: [{
            label: '多级表头',
            prop: 'header',
            children: [
              {
                label: '姓名',
                prop: 'name'
              }, {
                label: '年龄',
                prop: 'sex'
              }
            ]
          }],
          data: JSON.parse(text.value, null, 4)
        }
        $Excel.excel({
          title: opt.title,
          columns: opt.column,
          data: opt.data
        });
      }
      function change (obj) {
        var files = obj.files[0];
        $Excel.xlsx(files)
          .then(data => {
            text.value = JSON.stringify(data.results, null, 4)
          })
      }
    })
  }
}
</script>
```