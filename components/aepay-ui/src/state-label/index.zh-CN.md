---
category: Components
subtitle: 状态标签
group: 数据展示
order: 1
title: StateLabel
date: 2024-02-27 15:52:27
author:
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用

- 状态标签展示时。

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>
<code src="./demo/extra.tsx">额外描述</code>

## API

| 属性  | 说明         | 类型                                                           | 默认值 |
| ----- | ------------ | -------------------------------------------------------------- | ------ |
| type  | 状态类型     | `success` \| `error` \| `warning` \| `unavailable` \| `prompt` | -      |
| text  | 标签显示文案 | `string` \| `React.ReactElement`                               | -      |
| extra | 扩展信息     | `string` \| `React.ReactElement`                               | -      |
