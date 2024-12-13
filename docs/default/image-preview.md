# ImagePreview 图片预览
可以赋值任赋值图片去放大预览(一张缩略图，一张放大图)

:::tip
 2.5.3+
::::


:::demo 如果没有后缀，可以配置`type`属性，可选值`img/video/audio`
```html
<div>
  <el-button @click="openPreview(0)" style="margin-bottom:20px;">打开图片预览</el-button>
  <p>
    <img width="200px" style="margin-right:20px" v-for="(d, index) of datas" :src="d.thumbUrl" @click="openPreview(index)">
  </p>
</div>
<script>
export default {
   data() {
    return {
      datas: [
        { thumbUrl: `https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg`, url: `https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg`,type:'img' },
        { thumbUrl: `https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg`, url: `https://www.w3school.com.cn/i/movie.ogg`,type:'img' },
      ]
    }
  },
  methods: {
    openPreview(index = 0) {
      this.$ImagePreview(this.datas, index,{
        interval:3000,
        closeOnClickModal: true,
        click:(data,index)=>{
          this.$message.success('点击事件'+index)
        },
        beforeClose:()=>{
          this.$message.success('关闭回调')
        }
      });
    }
  }
}
</script>
```
:::




