---
nav:
  path: /hooks
title: useTitle
date: 2024-01-05 17:11:50
author: 
  - name: 喧和
    workNo: 289242
---

用于设置页面标题。

## 代码演示

<code src="./demo/index.tsx">基础用法</code>

## API

```typescript
useTitle(title: string, options?: Options);
```

### Params

| 参数  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| title | 页面标题 | `string` | -      |

### Options

| 参数             | 说明                               | 类型      | 默认值  |
| ---------------- | ---------------------------------- | --------- | ------- |
| restoreOnUnmount | 组件卸载时，是否恢复上一个页面标题 | `boolean` | `false` |
