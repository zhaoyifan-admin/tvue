# treeTransfer属性文档

## treeTransfer

| 参数 | 说明 | 类型 | 默认值 | 补充 |
| ---- | ---- | ---- | ---- | ---- |
| width | 宽度 | String |  100% | 建议在外部盒子设定宽度和位置|
| height | 高度 | String | 320px | - |
| title | 标题 | String |  ["源列表", "目标列表"] | - |
| button_text | 按钮名字 | Array | - | - |
| from_data | 源数据 | Array | - | 数据格式同element-ui tree组件，但必须有id和pid |
| to_data | 目标数据 | Array | - | 数据格式同element-ui tree组件，但必须有id和pid |
| defaultProps | 配置项-同el-tree中props | Object | { label: "label", children: "children", isLeaf: "leaf", disable: "disable" } | 用法和el-tree的props一样 |
| node_key | 自定义node-key的值，默认为id | String | id | 必须与treedata数据内的id参数名一致，必须唯一 |
| pid | 自定义pid的参数名，默认为"pid" | String | pid | 有网友提出后台给的字段名不叫pid，因此增加自定义支持 |
| leafOnly | 废弃 | - | - | - |
| filter | 是否开启筛选功能 | Boolean | false | 根据defaultProps参数的label字段筛选 |
| openAll | 是否默认展开全部 | Boolean | false | 存在性能问题 |
| ~~renderContent~~ renderContentLeft, renderContentRight | 自定义树节点， 用法同element-ui tree | Function | - | 2.2.3版本拆为两个函数分别定义左右两侧自定义节点 |
| mode | 设置穿梭框模式 | String | transfer | mode默认为transfer模式，即树形穿梭框模式，可配置字段为addressList改为通讯录模式，通讯录模式时按钮不可自定义名字，如要自定义标题名在title数组传入四个值即可，addressList模式时标题默认为通讯录、收件人、抄送人、密送人 |
| transferOpenNode | 穿梭后是否展开穿梭的节点 | Boolean | true | 默认为true即展开穿梭的节点，便于视觉查看，增加此参数是因为数据量大时展开会有明显卡顿问题，但注意，如此参数设置为false则穿梭后不展开，毕竟无法确定第几层就会有庞大数据 |
| defaultCheckedKeys | 默认选中节点 | Array | false | 只匹配初始时默认节点，不会在你操作后动态改变默认节点 |
| placeholder | 设置搜索框提示语 | String | 输入关键词进行筛选 | - |
| defaultTransfer | 是否自动穿梭一次默认选中defaultCheckedKeys的节点 | Boolean | false | 用来满足用户不想将数据拆分成fromData和toData的需求 |
| arrayToTree | 是否开启一维数组转化为树形结构 | Boolean | false | 数据必须存在根节点，并且不会断节，数据格式详见github上app.vue，根据id、pid对应关系转化，存在一定的性能问题 |
| addressOptions | 通讯录模式配置项 | Object | {num: Number, suffix: String, connector: String} | num-> 所需右侧通讯录个数,默认3 suffix-> label后想要拼接的字段（如id，即取此条数据的id拼接在后方）默认suffix connector -> 连接符（字符串）默认- |
| lazy | 是否启用懒加载 | Boolean | false | 效果动el-tree懒加载，不可和openAll或默认展开同时使用 |
| lazyFn | 懒加载的回调函数 | Function | - | 当适用lazy时必须传入回调函数，示例:lazyFn='loadNode',返回参数loadNode(node, resolve, from), node->当前展开节点node，resolve->懒加载resolve，from -> left/right 表示回调来自左侧/右侧 |
| high-light | 是否高亮当前选中节点| Boolean | false | - |
| filterNode | 自定义搜索函数 | Function | - | 不传则仍默认根据defaultProps参数的label字段筛选 |
| defaultExpandedKeys | 默认展开节点 | Array | - | 要展开的节点id数组，会自动去重生效在左右两侧 |
| lazyRight |  2.2.9 版本lazy属性只对左侧树生效，如果需要右侧也是用懒加载->lazyRight | Boolean | - | - | - |
| sjr | 通讯录模式，设置右侧收件人数据 | Array | - | - |
| csr | 通讯录模式，设置右侧抄送人数据 | Array | - | - |
| msr | 通讯录模式，设置右侧密送人数据 | Array | - | - |
| rootPidValue | 穿梭框模式，根节点数据pid的值，用于匹配退出循环，重要 | String,Number | 0 | - | - | 插件不再强制将你的数据根节点pid都改为0 |
| checkStrictly | 是否父子不关联 | Boolean | false | 此模式不支持lazy，返回的fromData和toData是最新数据，obj里面的keys，nodes不完整。且对删空子节点后的父节点左右两边处理逻辑有差异：当授权时既然要在右边出现，必然需要左侧父节点，而删除授权时，移除子权限并不代表想移除父权限 |
| renderAfterExpand | 是否在第一次展开某个树节点后才渲染其子节点 | Boolean | true | - |
| expandOnClickNode | 是否在点击节点的时候展开或者收缩节点 | Boolean | true | - |
| checkOnClickNode | 是否在点击节点的时候选中节点 | Boolean | false | - |
| indent | 相邻级节点间的水平缩进，单位为像素 | Number | 16 | - |
| icon-class | 自定义树节点的图标 | String | - | - |
| draggable | 是否开启拖拽节点功能 | Boolean | false | - |
| allow-drag | 判断节点能否被拖拽 | Function(node) | - | - |
| allow-drop | 拖拽时判定目标节点能否被放置 | Function(draggingNode, dropNode, type) | - | type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后 |
| checkStrictlyType | 父子不关联的三种模式:authorization授权模式,puppet木偶模式modular积木模式 | String | authorization:左侧选择子节点自动带着父节点；右侧选择父节点自动带着子节点；此模式两侧可能存在相同的非叶子节点;puppet:纯父子不关联穿梭，但要保持完整的树形结构，只自动带上穿梭到对面拼接所需的骨架结构；此模式两侧可能存在相同的非叶子节点;modular纯父子不关联穿梭，也不保持完整的树形结构，像积木一样右侧要形成树形则需要把左侧拆除，左侧拆的越多右侧形成的树结构越完整；此模式左右两侧保证严格的唯一性 |
> -----------------------------------------------------------

## 事件

| 事件名称 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| add-btn | 点击添加按钮时触发的事件(2.4.0以前为addBtn) | function(fromData,toData,obj),树形穿梭框transfer模式分别为1.移动后左侧数据，2.移动后右侧数据，3.移动的节点keys、nodes、halfKeys、halfNodes对象；通讯录addressList模式时返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表 |
| remove-btn | 点击移除按钮时触发的事件(2.4.0以前为removeBtn) | function(fromData,toData,obj),树形穿梭框transfer模式分别为1.移动后左侧数据，2.移动后右侧数据，3.移动的节点keys、nodes、halfKeys、halfNodes对象；通讯录addressList模式时返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表 |
| left-check-change | 左侧源数据勾选事件 | function(nodeObj, treeObj, checkAll)见el-tree组件check事件返回值, 新增checkAll参数表示是否全部选中 |
| right-check-change | 右侧目标数据勾选事件 | function(nodeObj, treeObj, checkAll)见el-tree组件check事件返回值, 新增checkAll参数表示是否全部选中 |
| node-drag-start | 节点开始拖拽时触发的事件 | 共3个参数，依次为："left"/"right"、被拖拽节点对应的 Node、event |
| node-drag-enter | 拖拽进入其他节点时触发的事件 | 共4个参数，依次为："left"/"right"、被拖拽节点对应的 Node、所进入节点对应的 Node、event |
| node-drag-leave | 拖拽离开某个节点时触发的事件 | 	共4个参数，依次为："left"/"right"、被拖拽节点对应的 Node、所离开节点对应的 Node、event |
| node-drag-over | 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件） | 共4个参数，依次为："left"/"right"、被拖拽节点对应的 Node、当前进入节点对应的 Node、event |
| node-drag-end | 拖拽结束时（可能未成功）触发的事件 | 共5个参数，依次为："left"/"right"、被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event |
| node-drop | 拖拽成功完成时触发的事件 | 共5个参数，依次为："left"/"right"、被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event |

> --------------------------------------------------------

## 方法

| 名称 | 说明 |
| ---- | ---- |
| addToAims | 手动调用添加穿梭，用于调整初始数据默认穿梭 function(useCallBack: Boolean) 本次穿梭是否需要触发@add-btn的emit回调 |
| clearChecked | 清除选中节点，默认清除全部 function(type: String) left左边 right右边 all全部 默认all |
| getChecked | 获取选中数据 |
| setChecked | 设置选中数据 function(leftKeys = [], rightKeys = []) |
| clearFilter | 清除搜索框条件，默认清除全部 function(type: String) left左边 right右边 all全部 默认all |

> --------------------------------------------------------

## slot

| 名字 | 说明 |
| ---- | ---- |
| left-footer | 穿梭框左侧、右侧底部slot |
| right-footer | 穿梭框左侧、右侧底部slot |
| title-left | 穿梭框标题区左侧、右侧自定义内容 |
| title-right | 穿梭框标题区左侧、右侧自定义内容 |
| from | 左侧内容区上部slot |
| to | 右侧内容区上部slot |
| content-left | 自定义左侧树节点 |
| content-right | 自定义右侧树节点 |
