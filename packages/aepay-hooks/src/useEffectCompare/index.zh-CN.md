---
nav:
  path: /hooks
title: useEffectCompare
date: 2024-02-04 17:10:45
author: 
  - name: 马佳辉
    workNo: 423565
---

> 可以获取到旧值的effect函数

## 代码演示

<code src="./demo/index.tsx">用法</code>

## 基础用法
```js
const [list, setList] = useState([]);
useEffectCompare((oldDeps) => {
  const isSame = JSON.stringify(oldDeps) === JSON.stringify([list]);
  console.log(isSame, '---useEffectCompare');
}, [list]);
```

## Params
| 参数	 |  说明	|  类型 |
| -------- | ----------- | -------- |
| effect |	同useEffect方法, 入参增加上一次的deps值 |	`React.EffectCallback` |
| deps |	useEffect依赖项 |	`React.DependencyList` |