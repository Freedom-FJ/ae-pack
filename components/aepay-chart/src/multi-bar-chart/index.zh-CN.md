---
category: Components
subtitle: 分组柱形图
group:
  title: 图表
  order: 2
title: MultiBarChart
date: 2024-03-11 11:28:36
type: mobile
author:
  - name: 喧和
    workNo: 289242
cover: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1710144923933-b8857bd2-3b70-43c6-aec4-07050e978493.png
coverDark: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1710144923933-b8857bd2-3b70-43c6-aec4-07050e978493.png
---

## 何时使用

- 多列条形图表展示时。

## 代码演示

<code src="./demo/simple.tsx">基础用法</code>
<code src="./demo/legend.tsx">图例属性实例</code>

## API

### MultiBarChartProps

| 属性            | 说明                 | 类型                                   | 默认值                       |
| --------------- | -------------------- | -------------------------------------- | ---------------------------- |
| data            | 数据                 | `any[]`                                | -                            |
| width           | 宽度                 | `number`                               | -                            |
| height          | 高度                 | `number`                               | `240`                        |
| colorRange      | 颜色配置             | `string[]`                             | -                            |
| showZeroLine    | 是否显示 0 分割线    | `boolean`                              | `true`                       |
| itemPadding     | 柱子间间距(取值 0-1) | `number`                               | `0`                          |
| xAxis           | x 轴对应 key         | `string`                               | `date`                       |
| yAxis           | y 轴对应 key         | `string`                               | `value`                      |
| legends         | 图例列表             | `string[]`                             | `[]`                         |
| legendKey       | 图例对应的 key 值    | `string`                               | `type`                       |
| legendAlign     | 图例位置             | `flex-start` \| `center` \| `flex-end` | `flex-start`                 |
| legendSize      | 图例大小             | `number`                               | `8`                          |
| legendPosition  | 图例位置             | `top` \| `bottom` \| `left` \| `right` | `top`                        |
| formatValue     | 格式化值展示         | `(value: any) => string`               | `(value: any) => value`      |
| formatXAxisText | 格式化 x 轴文本展示  | `(data: any) => string`                | `(data: any) => data[xAxis]` |
