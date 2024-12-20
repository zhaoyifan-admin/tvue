# 通讯录模式

## 普通用法

:::demo  `el-tree-fransfer`是一个基于 VUE 和 element-ui 的树形穿梭框组件，使用前请确认已经引入element-ui！ 此组件功能类似于element-ui的transfer组件，但是里面的数据是树形结构！
```html

<tvue-tree-transfer :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}"
                    @add-btn='add' @remove-btn='remove' :mode='mode' height='540px' filter openAll>
</tvue-tree-transfer>
<script>
  export default {
    data() {
      return {
        mode: 'addressList',
        fromData: [
          {
            id: "1",
            pid: 0,
            label: "一级 1",
            children: [
              {
                id: "1-1",
                pid: "1",
                label: "二级 1-1",
                disabled: true,
                children: []
              },
              {
                id: "1-2",
                pid: "1",
                label: "二级 1-2",
                children: [
                  {
                    id: "1-2-1",
                    pid: "1-2",
                    children: [],
                    label: "二级 1-2-1"
                  },
                  {
                    id: "1-2-2",
                    pid: "1-2",
                    children: [],
                    label: "二级 1-2-2"
                  }
                ]
              }
            ]
          },
        ],
        toData: []
      }
    },
    methods: {
      // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
      changeMode() {
        if (this.mode == "transfer") {
          this.mode = "addressList";
        } else {
          this.mode = "transfer";
        }
      },
      // 监听穿梭框组件添加
      add(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log("fromData:", fromData);
        console.log("toData:", toData);
        console.log("obj:", obj);
      },
      // 监听穿梭框组件移除
      remove(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log("fromData:", fromData);
        console.log("toData:", toData);
        console.log("obj:", obj);
      }
    }
  }
</script>
```
:::