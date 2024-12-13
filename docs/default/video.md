# Video 摄像头
调取原生的摄像头调用开始函数和结束函数，停止后即可获取录制片段
:::tip
 2.1.0
::::

:::demo 
```html
    <el-button @click="startRecord" v-if="!flag" type="primary">开始录制</el-button>
    <el-button type="danger" @click="stopRecord" v-else>停止录制</el-button>
    <br /><br />
    <tvue-video background="https://avuejs.com/images/face.png" @data-change="dataChange" ref="video"></tvue-video>
<script>
export default {
  data(){
    return {
      flag:false
    }
  },
  methods: {
      startRecord() {
        this.flag=true;
        this.$message.success('开始录制')
        this.$refs.video.startRecord();
      },
      stopRecord() {
        this.flag=false;
        this.$message.success('请看控制台视频文件的base64')
        this.$refs.video.stopRecord();
      },
      dataChange(data) {
        console.log(data);
      }
    }
}
</script>

```
:::

