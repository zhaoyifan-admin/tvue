# 富文本编辑器
- 如果和crud组件或则from组件使用自定义卡槽的方式
``` html
<!-- oss导入需要的包 （一定要放到index.html中的head标签里） -->
<script type="text/javascript" src='https://cdn.staticfile.net/ali-oss/6.10.0/aliyun-oss-sdk.min.js'></script>
<script src="https://avuejs.com/cdn/CryptoJS.js"></script>
```

## 代码
[代码地址](https://gitee.com/smallweigit/avue-plugin-ueditor)

## 新特性
- 基于wangeditor二次开发
- 支持avue方式配置图片上传
- 支持七牛云和阿里云oss上传
- 支持粘贴和ctrl+v粘贴图片

## 使用
- 1.npm install avue-plugin-ueditor --save
- 2.import TvueUeditor from 'avue-plugin-ueditor'
- 3.Vue.use(TvueUeditor);
- 4.参考如下代码使用

<Ueditor></Ueditor>
```html
<tvue-ueditor v-model="text"
              v-bind="options"></tvue-ueditor>
<span class="tvue-ueditor__code">{{text}}</span>
<script>
import avueUeditor from 'avue-plugin-ueditor'
export default {
  component:{
    avueUeditor
  },
  data() {
    return {
      text: '<h1 class="ql-align-center" style="text-align: center;"><a href="https://avuejs.com/doc/plugins/ueditor-plugins" target="_blank" style="font-weight: bold; color: rgb(194, 79, 74);">欢迎使用Tvue富文本编辑器</a></h1><p class="ql-align-center" style="text-align: center;"><span style="font-weight: bold; color: rgb(194, 79, 74);"><img src="https://avuejs.com/images/logo.png" height="200" width="200"></span></p>',
      options: {
        //普通上传地址
        action: "https://api.avuejs.com/imgupload",
        customConfig: {},//wangEditor编辑的配置
        //是否启用oss(qiniu/ali)
        oss:'',
        headers:{},
        data:{},
        propsHttp: {
          home:'',
          url:'url',
          res: 'data'
        },
        //七牛云oss配置
        qiniu: {
          AK: "",
          SK: "",
          scope: "",
          url: "",
          deadline: 1
        },
        //阿里云oss配置
        ali: {
          region: "",
          endpoint: "",
          accessKeyId: "",
          accessKeySecret: "",
          bucket: ""
        }
      }
    };
  }
};
</script>

```

## upload Attributes
| 参数    | 说明                              | 类型   | 可选值    | 默认值 |
| ------- | --------------------------------- | ------ | --------- | ------ |
| action  | 图片上传地址                      | String | —         | -      |
| headers | 上传附带请求头数据                | Object | —         | -      |
| data    | 上传附带数据                      | Object | —         | -      |
| props   | 相关可配置参数，具体参考props配置 | Object | —         | -      |
| oss     | 是否使用oss不写则为普通上传       | String | ali/qiniu | -      |
| qiniu   | 七牛云oss配置，具体参考qiniu配置  | Object | —         | -      |
| ali     | 阿里云oss配置，具体参考ali配置    | Object | —         | -      |

## propsHttp Attributes
| 参数 | 说明                   | 类型   | 可选值 | 默认值 |
| ---- | ---------------------- | ------ | ------ | ------ |
| res  | 返回的数据结构层次     | String | —      | -      |
| url  | 返回结构体图片地址字段 | String | —      | -      |
| home | 图片的根路径地址       | String | —      | -      |

## qiniu Attributes
| 参数     | 说明               | 类型   | 可选值 | 默认值 |
| -------- | ------------------ | ------ | ------ | ------ |
| AK       | 七牛云的密钥       | String | —      | -      |
| SK       | 七牛云的密钥       | String | —      | -      |
| scope    | 七牛云存储的空间名 | String | —      | -      |
| url      | 空间的自定义域名   | String | —      | -      |
| deadline | token的过期时间    | String | —      | -      |

## ali Attributes
| 参数            | 说明                                     | 类型   | 可选值 | 默认值 |
| --------------- | ---------------------------------------- | ------ | ------ | ------ |
| region          | oss所在区域的名称，具体查看阿里云oss文档 | String | —      | -      |
| endpoint        | oss所在区域的域名，具体查看阿里云oss文档 | String | —      | -      |
| accessKeyId     | 阿里云的密钥                             | String | —      | -      |
| accessKeySecret | 阿里云的密钥                             | String | —      | -      |
| bucket          | 阿里云存储的空间名                       | String | —      | -      |