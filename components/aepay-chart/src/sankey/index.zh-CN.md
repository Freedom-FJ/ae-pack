---
category: Components
subtitle: 桑基图
group:
  title: 图表
  order: 2
title: Sankey
date: 2024-03-05 14:57:55
type: desktop
author:
  - name: 喧和
    workNo: 289242
cover: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1709622301159-439264ab-5d9a-4eaa-a73e-f10e768ed7b9.png
coverDark: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1709622301159-439264ab-5d9a-4eaa-a73e-f10e768ed7b9.png
---

## 何时使用

- 桑基图表展示时。

:::info{title="桑基图介绍"}

> [桑基图 (Sankey Diagram)](https://antv.vision/old-site/vis/doc/chart/details/sankey.html)，是一种特定类型的流图，用于描述一组值到另一组值的流向。通常应用于能源、材料成分、金融等数据的可视化分析。

桑基图的特点如下：

- 起始流量和结束流量相同，所有主支宽度的总和与所有分出去的分支宽度总和相等，保持能量的平衡；
- 在内部，不同的线条代表了不同的流量分流情况，它的宽度成比例地显示此分支占有的流量；
- 节点不同的宽度代表了特定状态下的流量大小。
  :::

## 代码演示

<code src="./demo/simple.tsx">组件方式</code>
<code src="./demo/format.tsx">格式化内容展示</code>

## API

### SankeyProps

| 属性           | 说明           | 类型                          | 默认值               |
| -------------- | -------------- | ----------------------------- | -------------------- |
| data           | 数据           | `IDataItem[]`                 | -                    |
| width          | 宽度           | `number`                      | -                    |
| height         | 高度           | `number`                      | `240`                |
| linkColorRange | 连线颜色配置   | `string[]`                    | -                    |
| nodeColorRange | 节点颜色配置   | `string[]`                    | -                    |
| nodeGap        | 节点间距       | `number`                      | `12`                 |
| nodeWidth      | 节点宽度       | `number`                      | `16`                 |
| nodeKey        | 节点对应的 key | `(data: IDataItem) => string` | `data => data.label` |
| nodeValue      | 节点对应的值   | `(data: IDataItem) => number` | `data => data.value` |
| formatValue    | 格式化值展示   | `(data: IDataItem) => string` | `data => data.value` |
| formatLabel    | 格式化标签展示 | `(data: IDataItem) => string` | `nodeKey`            |

### IDataItem

| 属性     | 说明       | 类型          | 默认值 |
| -------- | ---------- | ------------- | ------ |
| label    | 标签       | `string`      | -      |
| value    | 值         | `number`      | -      |
| children | 子节点集合 | `IDataItem[]` | -      |
