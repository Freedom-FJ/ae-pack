---
nav:
  path: /hooks
title: useEffectOnce
date: 2024-02-04 17:10:45
author: 
  - name: 马佳辉
    workNo: 423565
---

> 在符合条件时，只会执行一次的 `useEffect` 

## 代码演示

<code src="./demo/index.tsx">用法</code>

## 基础用法
```js
const [list, setList] = useState([]);
useEffectOnce(() => {
  console.log('useEffectOnce');
}, [list], !!list.length);
```

## Params
| 参数	 |  说明	|  类型 |
| -------- | ----------- | -------- |
| effect |	同useEffect方法 |	`React.EffectCallback` |
| deps |	useEffect依赖项 |	`React.DependencyList` |
| judge |	useEffect的方法是否会被执行的前置条件 |	`() => void / boolean` |