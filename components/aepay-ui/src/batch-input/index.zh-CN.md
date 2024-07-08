---
category: Components
subtitle: 批量输入组件
group: 基础
order: 1
title: BatchInput
date: 2024-04-07 11:02:04
author: 
  - name: 喧和
    workNo: 289242
cover: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1712491017989-8eb5f0c4-bdf0-4cbe-8f4c-842f029397c5.png
coverDark: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1712491017989-8eb5f0c4-bdf0-4cbe-8f4c-842f029397c5.png
---

## 何时使用

- 批量输入时，如批量ID查询等场景。

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>
<code src="./demo/trigger.tsx">自定义trigger示例</code>
<code src="./demo/validate.tsx">validate示例</code>
<code src="./demo/transformer.tsx">值转换示例</code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 自定义 trigger | `React.ReactElement` | - |
| popupProps | 弹层的属性，详见Overlay组件属性 | `PopupProps` | - |
| maxLineLength | 最大所支持的行的数量 | `number` | 500 |
| type | 输入框的类型 | `number` \| `string` | `string` |
| validator | 每一行的校验器，校验不通过返回false，则会阻断用户此次输入 | `(value: string) => boolean \| undefined` | - |
| parseToString | 是否转换为字符串 | `boolean` | false |
| defaultValue | 输入框默认值 | `any[]` \| `string` | - |
| value | 输入框的值 | `any[]` \| `string` | - |
| onChange | 输入框的值变化时的回调 | `(value: any[] \| string) => void` | - |