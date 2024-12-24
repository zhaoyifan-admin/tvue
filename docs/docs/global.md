# 全局配置
在引入 Tvue 时，可以传入一个全局配置对象
``` js
Vue.use(TVUE,{
  size:'',
  crudOption:{},
  formOption:{},
  tableSize:'',
  formSize:''
  appendToBody:true,
  modalAppendToBody:true,
  cos:{},
  qiniu:{},
  ali:{},
  canvas:{}
});
```

- size：用于改变组件的默认尺寸，属性的组件的默认尺寸均为 `small`。可选值`small`/`mini`/`medium`;
- crudOption：全局Crud组件的默认配置
``` js
  {
    index:true,
    indexLabel:'序号',
    ....
  }
```
- formOption：全局Form组件的默认配置
``` js
  {
    labelWidth:110,
    ....
  }
```
- qiniu 七牛云配置
``` js
  {
    AK: '',
    SK: '',
    scope: '',
    url: '',
    deadline: 1
  }
```
- ali 阿里云配置
``` js
  {
    region: '',
    endpoint: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
  }
```
- cos 腾讯云配置
``` js
  {
    SecretId: '',
    SecretKey: '',
    Bucket: '',
    Region: ''
  }
```
- canvas全局水印配置
``` js
  {
    text: 'avuejs.com',
    fontFamily: 'microsoft yahei',
    color: "#999",
    fontSize: 16,
    opacity: 100,
    bottom: 10,
    right: 10,
    ratio: 1
  }
```