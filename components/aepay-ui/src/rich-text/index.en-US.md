---
category: Components
group: Base
title: RichText
date: 2023-12-21 16:05:27
author: 
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

富文本展示组件，避免点击`a`标签跳转时未配置`target`。

## When To Use

- 富文本展示时。
- 需要劫持a标签点击事件时。

## Examples

<!-- prettier-ignore -->
<code src="./demo/simple.tsx">Base</code>


## API

### RichText

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| html | 富文本字符串 | string | - |
| onLinkPress | a标签点击事件 | (href: string) => void | - |
| data-log | 埋点名称 | `string` | - |