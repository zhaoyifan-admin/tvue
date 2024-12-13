# 表单数据字典

:::tip

```js
//使用字典需要引入axios
import axios from "axios";
Vue.use(Tvue, { axios });

//老版本需要使用如下
//main.js
window.axios = axios;
```

::::

## 本地字典

:::tip
2.13.0+ dicData 支持`promise`和`function`类型
::::

:::demo 注意返回的数据必须为`array`数组，返回数据中 value 类型和数据的类型必须要对应，比如都是字符串或者都是数字。

```html
<tvue-form v-model="form" :option="option"></tvue-form>

<script>
  export default {
    data() {
      return {
        form: {
          cascader: [0, 1],
          tree: 1,
        },
        option: {
          column: [
            {
              label: "array",
              prop: "cascader",
              type: "cascader",
              dicData: [
                {
                  label: "一级",
                  value: 0,
                  children: [
                    {
                      label: "一级1",
                      value: 1,
                    },
                    {
                      label: "一级2",
                      value: 2,
                    },
                  ],
                },
              ],
            },
            {
              label: "function",
              prop: "tree",
              type: "tree",
              dicData: (ele) => {
                return [
                  {
                    label: "一级",
                    value: 0,
                    children: [
                      {
                        label: "一级1",
                        value: 1,
                      },
                      {
                        label: "一级2",
                        value: 2,
                      },
                    ],
                  },
                ];
              },
            },
            {
              label: "promise",
              prop: "select",
              type: "select",
              dicData: (ele) => {
                return new Promise((resolve) => {
                  resolve([
                    {
                      label: "一级1",
                      value: 1,
                    },
                    {
                      label: "一级2",
                      value: 2,
                    },
                  ]);
                });
              },
            },
          ],
        },
      };
    },
  };
</script>
```

:::

## 字段配置

:::demo 配置`props`对应的`label`和`value`即可，字典返回的是无任何层级包裹的，如果有层级需要配置`res`字段

```html
<tvue-form v-model="form" :option="option"></tvue-form>

<script>
  export default {
    data() {
      return {
        form: {
          grade: 1,
        },
        option: {
          column: [
            {
              label: "权限",
              prop: "grade",
              type: "select",
              props: {
                label: "name",
                value: "code",
              },
              dicData: [
                {
                  name: "有权限",
                  code: 1,
                },
                {
                  name: "无权限",
                  code: 0,
                },
                {
                  name: "禁止项",
                  code: -1,
                },
              ],
            },
            {
              label: "省份",
              prop: "province",
              type: "select",
              props: {
                label: "name",
                value: "code",
                res: "data.list",
              },
              dicUrl: `https://cli.avuejs.com/api/area/getProvince?isRes=true`,
            },
          ],
        },
      };
    },
  };
</script>
```

:::

## 网络字典

:::demo 网络字典不需要配置`dicData`属性，直接配置`dicUrl`字典接口即可，`dicMethod`指定请求类型,默认为 get 请求,`dicQuery`为请求携带的参数

```html
<tvue-form v-model="form" :option="option"></tvue-form>

<script>
  let baseUrl = "https://cli.avuejs.com/api/area";
  export default {
    data() {
      return {
        form: {
          province: "110000",
          city: "110000",
        },
        option: {
          column: [
            {
              label: "get请求",
              prop: "province",
              type: "select",
              props: {
                label: "name",
                value: "code",
              },
              dicUrl: `${baseUrl}/getProvince`,
            },
            {
              label: "post请求",
              prop: "city",
              type: "tree",
              dicMethod: "post",
              props: {
                label: "name",
                value: "code",
              },
              dicUrl: `${baseUrl}/getProvince`,
            },
          ],
        },
      };
    },
  };
</script>
```

:::

## 字典格式化

:::demo `dicFormatter`为字典数据返回的执行函数，对字典处理完返回即可

```html
<tvue-form v-model="form" :option="option"></tvue-form>

<script>
  let baseUrl = "https://cli.avuejs.com/api/area";
  export default {
    data() {
      return {
        form: {
          province: "110000",
        },
        option: {
          column: [
            {
              label: "城市",
              prop: "province",
              type: "select",
              props: {
                label: "name",
                value: "code",
              },
              dicFormatter: (data) => {
                data.forEach((ele) => {
                  ele.name = ele.name + "字典格式化";
                });
                data.unshift({ name: "追加字典", code: -1 });
                return data;
              },
              dicUrl: `${baseUrl}/getProvince`,
            },
          ],
        },
      };
    },
  };
</script>
```

:::

## 禁止字典某项

:::demo 禁止的项目配置`disabled`为`true`

```html
<tvue-form v-model="form" :option="option"></tvue-form>

<script>
  export default {
    data() {
      return {
        form: {
          grade: 1,
        },
        option: {
          column: [
            {
              label: "权限",
              prop: "grade",
              type: "select",
              dicData: [
                {
                  label: "有权限",
                  value: 1,
                },
                {
                  label: "无权限",
                  value: 0,
                },
                {
                  label: "禁止项",
                  disabled: true,
                  value: -1,
                },
              ],
            },
          ],
        },
      };
    },
  };
</script>
```

:::

## 字典联动

:::tip
2.9.0+
::::

:::tip
2.9.0 以下的老版本使用的属性是 cascaderItem
::::

:::demo `cascader`为需要联动的子选择框`prop`值，填写多个就会形成一对多的关系,`cascaderIndex`设置默认选择第几项

```html
<tvue-form v-model="form" :option="option"></tvue-form>

<script>
  let baseUrl = "https://cli.avuejs.com/api/area";
  export default {
    data() {
      return {
        form: {
          province: "110000",
          city1: "110100",
          city2: "110100",
          area: "110101",
        },
        option: {
          column: [
            {
              label: "省份",
              prop: "province",
              type: "select",
              cascader: ["city1", "city2"],
              cascaderIndex: 1,
              props: {
                label: "name",
                value: "code",
              },
              dicUrl: `${baseUrl}/getProvince`,
            },
            {
              width: 120,
              label: "城市1",
              prop: "city1",
              type: "select",
              cascader: ["area"],
              cascaderIndex: 1,
              cell: true,
              props: {
                label: "name",
                value: "code",
              },
              dicUrl: `${baseUrl}/getCity/{{key}}`,
              rules: [
                {
                  required: true,
                  message: "请选择城市1",
                  trigger: "blur",
                },
              ],
            },
            {
              width: 120,
              label: "城市2",
              prop: "city2",
              type: "select",
              cascaderIndex: 2,
              cell: true,
              props: {
                label: "name",
                value: "code",
              },
              dicUrl: `${baseUrl}/getCity/{{key}}`,
              rules: [
                {
                  required: true,
                  message: "请选择城市2",
                  trigger: "blur",
                },
              ],
            },
            {
              width: 120,
              label: "地区",
              prop: "area",
              cell: true,
              props: {
                label: "name",
                value: "code",
              },
              type: "select",
              dicUrl: `${baseUrl}/getArea/{{key}}?province={{province}}`,
              rules: [
                {
                  required: true,
                  message: "请选择地区",
                  trigger: "blur",
                },
              ],
            },
          ],
        },
      };
    },
  };
</script>
```

:::

## 修改类型

:::demo 调用内置方法`findObject`查找对应`prop`的属性序号 ,同时你也可以更新字典

```html
<el-button type="primary" size="small" @click="updateOption">更改配置</el-button
><br /><br />
<tvue-form ref="form" :option="option" v-model="form"></tvue-form>
<script>
  export default {
    data() {
      return {
        form: {},
        option: {
          column: [
            {
              label: "字典",
              prop: "checkbox",
              span: 24,
              type: "checkbox",
              dicData: [
                {
                  label: "单选字典1",
                  value: 1,
                },
                {
                  label: "单选字典0",
                  value: 2,
                },
              ],
            },
          ],
        },
      };
    },
    methods: {
      updateOption() {
        var column = this.findObject(this.option.column, "checkbox");
        column.type = "radio";
        column.dicData = [
          {
            label: "下拉框字典1",
            value: 1,
          },
          {
            label: "下拉框字典0",
            value: 2,
          },
        ];
      },
    },
  };
</script>
```

:::

## 修改数据

:::demo 和上面方法一样，只是再调用`updateDic`时不需要传新的字典，他会自己调用`dicUrl`去请求字典

```html
<el-button type="primary" size="small" @click="updateUrlDic">更新字典</el-button
><br /><br />
<tvue-form ref="form" :option="option" v-model="form"></tvue-form>
<script>
  export default {
    data() {
      return {
        form: {},
        option: {
          column: [
            {
              label: "字典",
              span: 24,
              type: "checkbox",
              prop: "checkbox",
              dicUrl: "https://cli.avuejs.com/api/area/getProvince",
              props: {
                label: "name",
                value: "code",
              },
            },
          ],
        },
      };
    },
    methods: {
      updateUrlDic() {
        var form = this.$refs.form;
        this.$message.success("先设置本地字典1s后请求url");
        form.updateDic("checkbox", [
          {
            name: "字典1",
            code: 1,
          },
          {
            name: "字典0",
            code: 2,
          },
        ]);
        setTimeout(() => {
          form.updateDic("checkbox");
        }, 1000);
      },
    },
  };
</script>
```

:::
