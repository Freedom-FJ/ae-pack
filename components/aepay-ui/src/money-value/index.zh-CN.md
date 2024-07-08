---
category: Components
subtitle: 金额展示组件
group: 基础
order: 1
title: MoneyValue
date: 2024-02-19 16:34:52
author: 
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用

- 金额个性化展示时。

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showAmountType | 展示类型 | `currencyValue` \| `symbolValue` \| `value` | `value` |
| value | 值 | `number` \| `string` \| `IAmountValue` | - |
| defaultValue | 默认值 | `string` | '' |
| currencyClassName | 货币样式 | `string` | - |
| currencyStyle | 货币style | `React.CSSProperties` | - |
| symbolClassName | 货币符号样式 | `string` | - |
| symbolStyle | 货币符号style | `React.CSSProperties` | - |

