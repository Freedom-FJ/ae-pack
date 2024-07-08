---
nav:
  path: /hooks
title: useEventDelegation
date: 2024-02-02 17:09:45
author: 
  - name: 马佳辉
    workNo: 423565
---

> 一个可以处理事件委托的hook

## 代码演示

### 1. 用法
<code src="./demo/index.tsx">用法</code>

### 2. 销毁和组建状态
<code src="./demo/destroy.tsx">销毁</code>

## 基础用法
```js
const { destroy } = useEventDelegation(run, {
  ref: divRef,
  matches:
    '.step-form-box input,!.step-form-box .not-event-delegation input',
  event: 'blur',
  time: 2000,
  addEventListenerOptions: true,
});
```

## Params
| 参数	 |  说明	|  类型 |
| -------- | ----------- | -------- |
| fn	| 待执行函数	| `(e: Event) => void` |
| option |	事件委托函数配置 |	`Partial<useEventDelegationOption>` |

## useEventDelegationOption
| 参数	 |  说明	|  类型 |
| -------- | ----------- | -------- |
| ref	| useRef返回值或dom节点	| `React.MutableRefObject<any> \| HTMLElement` |
| matches |	matches 匹配字符串，多个用`,`分割，排除用`!`开头 |	`string` |
| event |	委托事件名称 |	`string` |
| time |	委托初始化延迟时间 |	`number` |
| addEventListenerOptions |	addEventListener配置 |	`boolean \| EventListenerOptions` |

## Result
| 参数	 |  说明	|  类型 |
| -------- | ----------- | -------- |
| destroy	| 销毁事件委托	| `() => void` |
| isDestroy	| 当前事件委托运行状态	| `boolean` |