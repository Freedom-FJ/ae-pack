---
category: Components
subtitle: 卡片
group: 数据展示
order: 1
title: Card
date: 2024-02-19 14:52:25
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

| 属性         | 说明         | 类型                                     | 默认值 |
| ------------ | ------------ | ---------------------------------------- | ------ |
| label        | 标题         | `string`                                 | -      |
| tooltip      | 描述         | `string`                                 | -      |
| extra        | 扩展信息     | `string` \| `React.ReactElement`         | -      |
| children     | 内容         | `React.ReactNode` \| `React.ReactNode[]` | -      |
| actions      | 右侧按钮组   | `IButtonItem[]`                          | -      |
| contentStyle | content 样式 | `React.CSSProperties`                    | -      |
