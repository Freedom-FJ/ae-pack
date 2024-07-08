---
category: Components
subtitle: OTP输入框
group: 基础
order: 1
title: OtpInput
date: 2024-01-30 16:50:33
author: 
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用

- otp验证时，如邮箱、手机号、密码等。

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 值 | `string` | - |
| defaultValue | 默认值 | `string` | - |
| length | 长度 | `number` | 6 |
| onChange | change事件 | `(v: string) => void` | - |
| isPreview | 是否预览 | `boolean` | - |
| disabled | 是否禁用 | `boolean` | - |
| onItemKeyDown | 输入框keydown事件 | `(event: React.KeyboardEvent<Element>, index: number) => void` | - |
| otpRef | 用于外部控制(如聚焦、清空等) | `React.Ref<any>` | - | 