---
nav:
  path: /hooks
title: useMemoFunc
date: 2024-02-04 17:09:45
author: 
  - name: 马佳辉
    workNo: 423565
---

> useMemo的function版本，会通过记录方法每一次执行的入参进行缓存

## 代码演示

<code src="./demo/index.tsx">用法</code>
<code src="./demo/promise.tsx">异步用法</code>

## 基础用法
```js
const [number, setNumber] = useState(1);
const getNumberMemo = useMemoFunc(
  (key: number) => {
    return <div>{key * number}</div>
  },
  [number]
);

getNumberMemo(2)
getNumberMemo(1)
```

## Params
| 参数	 |  说明	|  类型 |
| -------- | ----------- | -------- |
| fn	| 执行函数	| `(...deps: I) => T` |
| memoDeps |	缓存清除依赖项 |	`any[]` |

## Result
| 参数	 |  说明	|  类型 |
| -------- | ----------- | -------- |
| fn	| 执行函数	| `(...deps: I) => T` |