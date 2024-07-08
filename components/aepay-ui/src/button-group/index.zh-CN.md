---
category: Components
subtitle: 按钮组
group: 基础
order: 1
title: ButtonGroup
date: 2024-02-19 14:52:25
author:
  - name: 喧和
    workNo: 289242
cover: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1719369014040-3c518b2a-19b2-4bf4-89b7-b4b4795772c1.png
coverDark: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1719369014040-3c518b2a-19b2-4bf4-89b7-b4b4795772c1.png
---

## 何时使用

- 多个按钮处理时，可以统一设置子按钮的属性，如大小、类型等。

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>
<code src="./demo/maxCount.tsx">最大容许按钮数</code>

## API

| 属性                  | 说明                | 类型                                 | 默认值    |
| --------------------- | ------------------- | ------------------------------------ | --------- |
| actions               | 按钮组列表          | `IButtonItem[]`                      | -         |
| data                  | 数据                | `any`                                | -         |
| text                  | 是否是文本          | `boolean`                            | -         |
| size                  | 按钮的尺寸          | `small` \| `medium` \| `large`       | `medium`  |
| maxCount              | 最大容许按钮数      | `number`                             | -         |
| maxHideStart          | 超出隐藏方向        | `left` \| `right`                    | `right`   |
| moreBtnType           | 更多按钮类型        | `primary` \| `secondary` \| `normal` | `primary` |
| moreBtnText           | 更多按钮文案        | `string`                             | -         |
| moreBtnPopupClassName | 更多按钮 Popup 样式 | `string`                             | -         |
| moreBtnStyle          | 更多按钮样式        | `React.CSSProperties`                | -         |

### IButtonItem

| 属性        | 说明       | 类型                       | 默认值 |
| ----------- | ---------- | -------------------------- | ------ |
| btnText     | 按钮文本   | `string`                   | -      |
| icon        | 按钮图标   | `string`                   | -      |
| onClick     | 点击事件   | `() => void`               | -      |
| render      | 自定义渲染 | `(...args: any[]) => void` | -      |
| hidden      | 是否隐藏   | `() => boolean`            | -      |
| data-log-c1 | 埋点 c1    | `string`                   | -      |
| data-log-c2 | 埋点 c2    | `string`                   | -      |
