# License 授权书

:::tip
 2.0.5+
::::

``` html
<!-- 导出pdf时导入需要的包 （一定要放到index.html中的head标签里）-->
<script src="https://cdn.staticfile.net/jspdf/1.5.3/jspdf.min.js"></script>
```


:::demo 
```html
<el-button @click="handleUpload">导出PDF</el-button>
<el-button @click="handleFile" type="success">下载图片</el-button>
<el-button @click="handleSend"
               type="primary">获取文件流</el-button>
<el-button @click="handleBase64"
              type="danger">获取bas64</el-button>
 <tvue-license ref="license"
                    :option="data">
    <h1 style="color:red">自定义内容</h1>
  </tvue-license>
<script>
export default {
  data () {
    return {
       form: {
        id: 'xxxx',
        date: '2022-02-02',
        name: 'xxx公司',
        qq: 'xxxxx'
      }
    }
  },
  computed: {
    data () {
      return {
        img: "/images/sqstemp.jpg",
        list: [{
          left: 140,
          top: 665,
          text: `“ ${this.form.name} ”`,
          color: '#000',
          size: 29,
          bold: true,
          style: '黑体'
        }, {
          left: 280,
          top: 1049,
          text: this.form.id,
          color: '#000',
          size: 26,
          bold: true,
          style: '黑体'
        }, {
          left: 740,
          top: 1049,
          text: this.form.date,
          color: '#000',
          bold: true,
          size: 26,
          style: '黑体'
        }, {
          left: 440,
          top: 120,
          width: 100,
          img: '/images/logo.png'
        }]
      }
    }
  },
  methods: {
    handleSend () {
      this.$message.success('请查看控制台');
      this.$refs.license.getFile(this.form.name).then(file=>{
          console.log(file);
      })
     
      
    },
    handleBase64(){
      this.$message.success('请查看控制台');
      this.$refs.license.getBase64().then(file=>{
        console.log(file);
      });
    },
    handleFile(){
       this.$refs.license.getBase64(this.form.name).then(file=>{
          this.downFile(file,new Date().getTime());
      })
    },
    handleUpload () {
      this.$refs.license.getPdf(this.form.name);
    }
  }
}
</script>


```
:::


