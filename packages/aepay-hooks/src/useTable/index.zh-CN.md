---
nav:
  path: /hooks
title: useTable
date: 2024-02-20 14:52:15
author: 
  - name: 喧和
    workNo: 289242
---

> 一个处理 table 切换页码、页大小的 Hook。

## 代码演示

<code src="./demo/index.tsx">进阶用法</code>

## 基础用法
```js
const { onQuery, pagination } = useTable({
  onSearch: (params: any) => {
    setParams(params);
  },
});
```

## Params
| 参数	 |  说明	|  类型 | 默认值 |
| -------- | ----------- | -------- | -------- |
| onSearch	| 触发的查询方法	| `(params: any) => void` | - |
| pageSize	| 默认页大小	| `number` | 10 |
| pagination	| 是否分页	| `boolean` | true |