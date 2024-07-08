---
nav:
  path: /hooks
title: useUuid
date: 2024-02-04 17:10:45
author: 
  - name: 马佳辉
    workNo: 423565
---

> 一个生成唯一uuid标识的hook

## 代码演示

<code src="./demo/index.tsx">用法</code>

## 基础用法
```js
const [uuidList, { setUuid, add, clear, remove, getUuid, reverse }] = useUuid({ init: true })
```

## Params
| 参数	 |  说明	|  类型 |
| -------- | ----------- | -------- |
| init |	初始化是否生成一个 |	`boolean` |


## Result
| 参数	 |  说明	|  类型 |
| -------- | ----------- | -------- |
| uuidList	| 所有id列表(`state`数据)	| `string[]` |
| setUuid	| 设置`uuidList` 方法	| `(string[]) => void` |
| getUuid	| 获取一个随机uuid	| `() => string` |
| add	| 添加一个uuid到`uuidList` 方法, 返回当前添加的id	| `() => string` |
| remove	| 删除一个`uuidList`内的id方法, 返回当前删除的id	| `(index: number) => string` |
| clear	| 清空`uuidList` 方法, 返回当前添加的id	| `() => void` |
| reverse	| 反转`uuidList`方法	| `() => string[]` |