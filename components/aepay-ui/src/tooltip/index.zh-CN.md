---
category: Components
subtitle: 文字提示
group: 数据展示
order: 1
title: Tooltip
date: 2024-02-06 18:00:59
author:
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用

- 鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。
- 可用来代替系统默认的 title 提示，提供一个 按钮/文字/操作 的文案解释。

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>
<code src="./demo/align.tsx">提示位置</code>
<code src="./demo/customTooltip.tsx">自定义提示信息或 Icon</code>

## API

| 属性      | 说明                                   | 类型                                                                                                                    | 默认值 |
| --------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------ |
| label     | 文本信息                               | `string` \| `React.ReactNode`                                                                                           | -      |
| tooltip   | 提示信息                               | `string` \| `React.ReactNode`                                                                                           | -      |
| align     | 弹出层位置                             | `t(上)` `r(右)` `b(下)` `l(左)` `tl(上左)` `tr(上右)` `bl(下左)` `br(下右)` `lt(左上)` `lb(左下)` `rt(右上)` `rb(右下)` | -      |
| iconProps | 图标属性                               | `IconProps`                                                                                                             | -      |
| type      | 触发类型，是图标、下划线还是文本和图标 | `icon` \| `underline` \| `text`                                                                                         | `icon` |
