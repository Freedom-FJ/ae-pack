---
category: Components
subtitle: 数据指标
group: 数据展示
order: 1
title: Statistic
date: 2024-02-19 16:30:57
author:
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用

- 卡片展示时。

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>

## API

| 属性       | 说明                      | 类型      | 默认值 |
| ---------- | ------------------------- | --------- | ------ |
| divided    | 等分                      | `number`  | 4      |
| showSymbol | 显示 symbol 还是 currency | `boolean` | false  |

### IStatisticItem

| 属性            | 说明      | 类型                   | 默认值 |
| --------------- | --------- | ---------------------- | ------ |
| label           | 标题      | `string`               | -      |
| tooltip         | 描述      | `string`               | -      |
| amount          | 金额      | `IAmountValue`         | -      |
| amountClassName | 金额样式  | `string`               | -      |
| currencyCode    | 货币 Code | `string`               | -      |
| amountClassName | 金额样式  | `string`               | -      |
| date            | 日期展示  | `string` \| `string[]` | -      |
| extra           | 额外信息  | `React.ReactNode`      | -      |
