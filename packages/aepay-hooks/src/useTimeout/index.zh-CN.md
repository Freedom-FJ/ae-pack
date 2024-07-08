---
nav:
  path: /hooks
title: useTimeout
date: 2024-01-09 10:09:45
author: 
  - name: 喧和
    workNo: 289242
---

> 一个可以处理 setTimeout 计时器函数的 Hook。

## 代码演示

<code src="./demo/index.tsx">进阶用法</code>

## 基础用法
```js
useTimeout(fn: () => void, delay?: number | null): {
  clear: () => void;
  resetTime: () => void;
};
```

## Params
| 参数	 |  说明	|  类型 |
| -------- | ----------- | -------- |
| fn	| 待执行函数	| `() => void` |
| delay |	定时时间（单位为毫秒），支持动态变化，当取值为`undefined`时会停止计时器 |	`number` \| `undefined` |

## Result
| 参数	 |  说明	|  类型 |
| -------- | ----------- | -------- |
| clear	| 清除计时器	| `() => void` |
| resetTime	| 重置计时器	| `() => void` |