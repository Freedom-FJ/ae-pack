---
category: Components
subtitle: 数字输入组建
group: 基础
order: 1
title: NumberPicker
date: 2024-02-02 11:50:00
author:
  - name: 马佳辉
    workNo: 423565
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用

- 需要输入数字且限制用户输入只能为数字时
- 本质是一个加上了一些输入限制和回显的输入框

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>
<code src="./demo/unit.tsx">含单位输入/输出</code>
<code src="./demo/change.tsx">事件区别</code>

## API

| 属性             | 说明                                                 | 类型                                                       | 默认值  |
| ---------------- | ---------------------------------------------------- | ---------------------------------------------------------- | ------- |
| value            | 值                                                   | `string`                                                   | -       |
| formatInteger    | 处理整数逻辑, 传`false`默认不处理,`true`默认千分隔符 | `boolean｜(integer: number｜string) => string`             | `false` |
| maxDecimalPlaces | 最大小数位数                                         | `number`                                                   | 2       |
| min              | 最大值                                               | `number`                                                   | -       |
| max              | 最小值                                               | `number`                                                   | -       |
| width            | 宽度                                                 | `string`                                                   | -       |
| onInputChange    | 输入变化事件                                         | `(v?: number) => void`                                     | -       |
| onChange         | change 事件                                          | `(v?: number \| string) => void`                           | -       |
| onFocus          | 聚焦事件                                             | `(e: React.FocusEvent<HTMLInputElement, Element>) => void` | -       |
| onBlur           | 失焦事件                                             | `(val?: number, e?: any) => void`                          | -       |
| unit             | 单位                                                 | `string`                                                   | -       |
