---
category: Components
subtitle: 进度条
group: 基础
order: 1
title: Progress
date: 2024-02-27 10:47:44
author: 
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用

- 在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>
<code src="./demo/disabled.tsx">禁用</code>
<code src="./demo/textRender.tsx">自定义百分比信息</code>
<code src="./demo/color.tsx">自定义进度条颜色</code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percent | 所占百分比 | `number` | - |
| disabled | 是否禁用 | `boolean` | - |
| textRender | 自定义百分比信息 | `null` \| `(percent: number) => React.ReactElement` | `null` |
| color | 自定义进度条颜色 | `(percent: number) => string` | - |
