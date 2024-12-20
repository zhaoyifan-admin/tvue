# 快速上手

## 简要介绍

开箱即用！

## 使用方式

```vue
<script>
import {
  deepClone,
  bd09Togps84,
  gcj02ToBd09,
  gcj02ToGps84,
  gps84Tobd09,
  ...
} from '@zhaoyifannan/tvue'
</script>
```

## 常用工具函数

Name | Description            | Type
:--- |:-----------------------| :---
deepClone | 对象深拷贝                  | (value: array &#124; object) => array &#124; object
deleteField | 将冗余空字段进行删除             | (value: object) => object
detailDataType | 字符串数据类型转化             | (value: any,type: any ) => result: any
gps84ToGcj02 | GPS-84 坐标转换成 GCJ-02 坐标 | (lon: any,lat: any) => array
gps84Tobd09 | GPS-84 坐标转换成 BD-09 坐标  | (lon: any,lat: any) => array
gcj02ToGps84 | GCJ-02 坐标转换成 GPS-84 坐标 | (lon: any,lat: any) => array
gcj02ToBd09 | GCJ-02 坐标转换成 BD-09 坐标  | (lon: any,lat: any) => array
bd09ToGcj02 | BD-09 坐标转换成 GCJ-02 坐标  | (lon: any,lat: any) => array
bd09Togps84 | BD-09 坐标转换成 GPS-84 坐标  | (lon: any,lat: any) => array
isJson | 是否为json对象  | (str: any) => boolean
