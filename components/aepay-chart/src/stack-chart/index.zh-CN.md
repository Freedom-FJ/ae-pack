---
category: Components
subtitle: 堆叠图
group:
  title: 图表
  order: 2
title: StackChart
date: 2024-03-07 17:53:56
type: all
author:
  - name: 喧和
    workNo: 289242
cover: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1710144820464-812e6dcd-bc6b-4567-8cb1-079061667cb5.png
coverDark: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1710144820464-812e6dcd-bc6b-4567-8cb1-079061667cb5.png
---

## 何时使用

- 堆叠图表展示时。

## 代码演示

<code src="./demo/simple.tsx">基础用法</code>
<code src="./demo/legend.tsx">图例属性实例</code>
<code src="./demo/width.tsx">列宽度调整</code>

## API

### StackChartProps

| 属性            | 说明                 | 类型                                   | 默认值                       |
| --------------- | -------------------- | -------------------------------------- | ---------------------------- |
| data            | 数据                 | `any[]`                                | -                            |
| width           | 宽度                 | `number`                               | -                            |
| height          | 高度                 | `number`                               | `240`                        |
| colorRange      | 颜色配置             | `string[]`                             | -                            |
| showZeroLine    | 是否显示 0 分割线    | `boolean`                              | `true`                       |
| itemPadding     | 柱子间间距(取值 0-1) | `number`                               | `1 / 3`                      |
| xAxis           | x 轴对应 key         | `string`                               | `date`                       |
| yAxis           | y 轴对应 key         | `string`                               | `value`                      |
| legends         | 图例列表             | `string[]`                             | `[]`                         |
| legendKey       | 图例对应的 key 值    | `string`                               | `type`                       |
| legendAlign     | 图例位置             | `flex-start` \| `center` \| `flex-end` | `flex-start`                 |
| legendSize      | 图例大小             | `number`                               | `8`                          |
| legendPosition  | 图例位置             | `top` \| `bottom` \| `left` \| `right` | `top`                        |
| formatValue     | 格式化值展示         | `(value: any) => string`               | `(value: any) => value`      |
| formatXAxisText | 格式化 x 轴文本展示  | `(data: any) => string`                | `(data: any) => data[xAxis]` |
