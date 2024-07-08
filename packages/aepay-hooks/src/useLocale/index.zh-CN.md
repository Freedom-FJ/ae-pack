---
nav:
  path: /hooks
title: useLocale
date: 2024-01-23 14:16:13
author: 
  - name: 喧和
    workNo: 289242
---

> 可通过 `useLocale` 异步获取cdn配置数据
```js
const $i18n = useLocale({
  language: 'en_US',
  locales,
  defaultLocale: 'zh_CN',
  mdsConfig: {
    appName: 'aepay-risk-app',
    version: '0.0.1',
    label: 'Frontside',
  }
});
```


## 示例
<code src="./demo/index.tsx">基本用法</code>


### Params
> 其它参数同 [`locale`](../utils/locale-cn#iparams) 配置

#### IMdsConfig

| 参数  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| appName | 应用名 | string |  - |
| version | 应用版本 | string | -  |
| label | 美杜莎标签 | string | -  |
| daily | 是否是日常环境 | boolean | false  |
