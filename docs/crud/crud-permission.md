# 权限控制

:::tip
 2.6.0+
::::

## 普通用法
:::demo 
```html
权限开关
<el-switch :active-value="false" :inactive-value="true" v-model="text" active-color="#13ce66" inactive-color="#ff4949">
</el-switch>
</br></br>
<tvue-crud :option="option" :permission="permission" :data="data"></tvue-crud>
<script>
export default {
 data() {
      return {
        text: false,
        permission: {},
        option: {
          column: [{
            label: '姓名',
            prop: 'name'
          }, {
            label: '年龄',
            prop: 'sex'
          }]
        },
        data: [{
          id: 1,
          name: '张三',
          sex: 12,
        }, {
          id: 2,
          name: '李四',
          sex: 20,
        }]
      }
    },
    watch: {
      text() {
        if (this.text === true) {
          this.permission = {
            delBtn: false,
            addBtn: false,
            menu:false,
          }
        } else {
          this.permission = {
            delBtn: true,
            addBtn: true,
            menu:true,
          }
        }
      }
    }
}
</script>

```
:::

## 函数用法
:::demo 
```html
<tvue-crud :option="option" :permission="getPermission" :data="data"></tvue-crud>
<script>
export default {
 data() {
      return {
        option: {
          column: [{
            label: '姓名',
            prop: 'name'
          }, {
            label: '年龄',
            prop: 'sex'
          }]
        },
        data: [{
          id: 1,
          name: '张三',
          sex: 12,
        }, {
          id: 2,
          name: '李四',
          sex: 20,
        }]
      }
    },
    methods: {
      getPermission(key, row, index){
        if(key==='editBtn' && index==0){
            return false;
        }else if(key==='delBtn' && index==1){
          return false;
        }
         return true;
      }
    }
}
</script>

```
:::

## 自定义用法

:::tip
- [自定义按钮](/crud/crud-btn-slot.html#自定义弹窗内按钮)
- [按钮方法](/crud/crud-fun.html)
::::

:::demo 
```html
<tvue-crud :option="option1"  ref="crud" :data="data">
  <div slot="menu" slot-scope="{size,type,row,index}">
    <el-button :type="type" :size="size" icon="el-icon-edit" :disabled="index==0" @click="$refs.crud.rowEdit(row,index)">编辑</el-button>
    <el-button :type="type" :size="size" icon="el-icon-delete">删除</el-button>
  </div>
</tvue-crud>
<script>
export default {
 data() {
      return {
        option1: {
          editBtn:false,
          delBtn:false,
          column: [{
            label: '姓名',
            prop: 'name'
          }, {
            label: '年龄',
            prop: 'sex'
          }]
        },
        data: [{
          id: 1,
          name: '张三',
          sex: 12,
        }, {
          id: 2,
          name: '李四',
          sex: 20,
        }]
      }
    },
    methods: {
     
    }
}
</script>
```
:::
