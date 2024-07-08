---
category: Components
subtitle: 文字拷贝
group: 基础
order: 1
title: CopyText
date: 2024-02-23 15:30:50
author: 
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用

- 文字复制时使用。

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 需要被拷贝的文本 | `string` | - |
| onCopy | 拷贝成功之后的回调 | `(e: any) => void` | - |
| successMessage | 拷贝成功后的提示文本 | `string` \| `React.ReactElement` | - |
| children | 按钮展示的文本 | `React.ReactNode` | - |
| iconProps | 拷贝图标属性 | `IconProps` | - |
| ellipsis | 超出宽度是否隐藏 | `boolean` | `false` |