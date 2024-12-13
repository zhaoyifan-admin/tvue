# 表单验证


## 基础用法
:::tip
具体参考[async-validator](https://github.com/yiminghe/async-validator)
::::

:::demo  配置验证字段的`rules`的数据对象
```html
<tvue-form :option="option" @submit="submit" @error="error"></tvue-form>

<script>
export default {
    data() {
      return {
        option:{
          column:[
             {
              label:'姓名',
              prop:'name',
              rules: [{
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }]
            }, {
              label:'性别',
              prop:'sex',
              rules: [{
                required: true,
                message: "请输入性别",
                trigger: "blur"
              }]
            }
          ]
        },
      };
    },
    methods: {
      submit(form,done){
      this.$message.success(JSON.stringify(form));
       done()
      },
      error(err){
        this.$message.success('请查看控制台');
        console.log(err)
      }
    }
}
</script>
```
:::


## 外置验证

:::demo 
```html
<el-button size="small" @click="validate">验证表单</el-button>
<tvue-form ref="form" :option="option" ></tvue-form>

<script>
export default {
    data() {
      return {
        option:{
          column:[
             {
              label:'姓名',
              prop:'name',
              rules: [{
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }]
            }, {
              label:'性别',
              prop:'sex',
              rules: [{
                required: true,
                message: "请输入性别",
                trigger: "blur"
              }]
            }
          ]
        },
      };
    },
    methods: {
      validate(){
        //如果存在验证不通过，msg为错误信息
        this.$refs.form.validate((valid, done,msg) => {
          if (valid) {
            done()
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
}
</script>
```
:::


## 自定义验证

:::demo  
```html
<tvue-form  v-model="obj" :option="option1" @submit="submit" @error="error"></tvue-form>


<script>
export default {
  data() {
    var validatePass = (rule, value, callback)=>{
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback)=>  {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.obj.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      obj:{
        name:'张三',
      },
      option1:{
        column:[
          {
            label:'姓名',
            prop:'name',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          }, {
            label:'性别',
            prop:'sex',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          },
          {
            label:'密码',
            prop:'password',
            type:'password',
            rules: [{ validator: validatePass, trigger: 'blur' }]
          }, {
            label:'确认密码',
            prop:'oldpassword',
            type:'password',
            rules: [{ validator: validatePass2, trigger: 'blur' }]
          }
        ]
      },
    }
  },
  methods: {
    submit(form,done){
      this.$message.success(JSON.stringify(form));
      done()
    },
    error(err){
      this.$message.success('请查看控制台');
      console.log(err)
    }
  }
}
</script>
```
:::

