---
category: Components
subtitle: 富文本展示组件
group: 数据展示
title: RichText
date: 2023-12-21 16:05:27
author:
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

富文本展示组件，避免点击`a`标签跳转时未配置`target`。

## 何时使用

- 富文本展示时。
- 需要劫持 a 标签点击事件时。
- `\n` 自动换行处理。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/simple.tsx">基本使用</code>

## API

### RichText

| 属性        | 说明           | 类型                   | 默认值 |
| ----------- | -------------- | ---------------------- | ------ |
| html        | 富文本字符串   | string                 | -      |
| onLinkPress | a 标签点击事件 | (href: string) => void | -      |
