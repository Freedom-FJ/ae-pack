---
nav:
  path: /hooks
title: usePropsValue
date: 2024-04-07 19:45:19
author: 
  - name: 喧和
    workNo: 289242
---

> 用于处理受控组件的value、defaultValue、onChange以及值的转换。

## 基础用法
```js
const [curValue, setCurValue] = usePropsValue<any>({
  value: value,
  defaultValue: defaultValue,
  onChange,
  transformer: {      
    getValueFormatter: (v: string) => {
      return typeof v === 'string' ? v.split(',').map((item: string) => item.trim()).filter(Boolean) : [];
    },
    setValueFormatter: (v: any[]) => {
      return v.filter(Boolean).join(',');
    }
  }
});
```
