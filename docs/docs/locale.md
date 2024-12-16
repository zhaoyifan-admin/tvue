# 国际化
### 介绍
Tvue 采用中文作为默认语言，同时支持多语言切换，请按照下方教程进行国际化设置。


### 使用方法

##### 多语言切换

``` javascript
// 完整引入 Tvue
import Vue from 'vue'
import Tvue from '@zhaoyifannan/tvue'
import zhLocale from '@zhaoyifannan/tvue/lib/locale/lang/zh'
import enLocale from '@zhaoyifannan/tvue/lib/locale/lang/en'

Vue.use(Tvue, { locale:enLocale })

```

### 语言包
目前支持的语言:
| 语言     | 文件名 |
| -------- | ------ |
| 简体中文 | zh     |
| 英语     | en     |

### 常见问题

#### Tvue-cli中的引入
``` javascript
//参考文件
//https://gitee.com/zhaoyifannan/tvue-cli/blob/2.x/src/lang/index.js
import zhLocale from '@zhaoyifannan/tvue/lib/locale/lang/zh'
import enLocale from '@zhaoyifannan/tvue/lib/locale/lang/en'
const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}
```

##### 找不到所需的语言包？
如果上方列表中没有你需要的语言，欢迎给我们提 Pull Request 来增加新的语言包

##### 业务代码如何实现国际化？
可以使用 [vue-i18n](https://github.com/kazupon/vue-i18n) 来实现。

##### 以 CDN 形式引入时，如何使用语言包？
目前没有提供 CDN 形式的语言包，可以手动拷贝语言包的内容来使用。