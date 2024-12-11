/**
 * @name 从一维数组中找到节点的父祖节点
 * @param {Object} item 当前节点
 * @param {Array} arr 全部节点数组
 * @param {Object} options 配置项
 */
const findParents = (item, arr, options = { id: 'id', parentId: 'parentId', root: 0 }) => {
  let _parents = [];
  return function findParent(item) {
    if (item[options.parentId] === options.root) return _parents;
    const parent = arr.find(i => i[options.id] === item[options.parentId]);
    if (parent) {
      _parents.push(parent);
      return findParent(parent)
    } else {
      return _parents
    }
  }(item);
}

const arrayToTree = (array = [], options = {id: "id", pid: "pid", children: "children", rootPidVal: null}) => {
    let array_ = []; // 创建储存剔除叶子节点后的骨架节点数组
    let unique = {}; // 创建盒子辅助本轮children合并去重
    let root_pid = options.rootPidVal || [
        0,
        "0",
        undefined,
        "undefined",
        null,
        "null",
        "00000000-0000-0000-0000-000000000000",
        ""
    ]; // 可能存在的根节点pid形式
    array.forEach(item => {
        // 筛选可以插入当前节点的所有子节点
        let children_array = array.filter(
            it => it[options.pid] === item[options.id]
        );
        if (Array.isArray(item[options.children]) && item[options.children].length) {
            // 去重合并数组
            item[options.children].map(i => (unique[i[options.id]] = 1));
            item[options.children].push(
                ...children_array.filter(i => unique[i[options.id]] !== 1)
            );
        } else {
            item[options.children] = children_array;
        }
        // 当children_array有数据时插入下一轮array_，当无数据时将最后留下来的根节点树形插入数组
        let has_children = children_array.length > 0;
        if (
            has_children ||
            (!has_children && root_pid.includes(item[options.pid]))
        ) {
            array_.push(item);
        }
    });
    // 当数组内仅有根节点时退出，否组继续处理 最终递归深度次
    if (!array_.every(item => root_pid.includes(item[options.pid]))) {
        return arrayToTree(array_, options);
    } else {
        return array_;
    }
}
/**
 * 将树形数据向下递归为一维数组
 * @param {*} arr 数据源
 * @param {*} childs  子集key
 */

const flattenDeep = (arr = [], childs = "Children") => {
    return arr.reduce((flat, item) => {
        return flat.concat(
            item,
            item[childs] ? flattenDeep(item[childs], childs) : []
        );
    }, []);
}



export {
  findParents,
  arrayToTree,
  flattenDeep
}
