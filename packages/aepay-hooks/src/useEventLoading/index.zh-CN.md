---
nav:
  path: /hooks
title: useEventLoading
date: 2024-02-19 14:21:20
author: 
  - name: 喧和
    workNo: 289242
---

> 用于事件loading处理，如给按钮增加自动loading（通过onClick返回一个`Promise`）。

## 基础用法
```js
const config = useEventLoading(loading, autoLoading, onClick, afterClick, onLog);
```
