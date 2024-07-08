---
category: Components
subtitle: 手机号输入框
group: 基础
order: 1
title: PhoneInput
date: 2024-01-17 15:32:23
author:
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

本组件基于 [libphonenumber-js](https://anpm.alibaba-inc.com/package/libphonenumber-js) 开发，数据来源于谷歌 `libphonenumber`。

## 何时使用

- 需要根据不同区号输入手机号时。
- 需要校验手机号合法性时。

## 特点

- 支持根据国家/地区搜索呼叫码
- 支持不同地区手机号格式化展示

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>
<code src="./demo/preview.tsx">预览</code>

## 校验手机号合法性

```js
import { isValidPhoneNumber } from '@ali/aepay-ui';
isValidPhoneNumber('86-17645678234');
```

## API

| 属性            | 说明                       | 类型                | 默认值 |
| --------------- | -------------------------- | ------------------- | ------ |
| value           | 值                         | string              | -      |
| defaultValue    | 默认值                     | string              | -      |
| defaultAreaCode | 默认呼叫码                 | string              | `86`   |
| onChange        | change 事件                | (v: string) => void | -      |
| splitChar       | 分隔符                     | string              | `-`    |
| state           | 状态                       | string              | `-`    |
| isPreview       | 是否预览                   | boolean             | -      |
| disabled        | 是否禁用                   | boolean             | -      |
| placeholder     | 占位符                     | string              | -      |
| showEyeText     | 预览时是否不展示明文       | `boolean`           | true   |
| showFormatted   | 预览时是否展示格式化手机号 | `boolean`           | true   |
| renderPreview   | 预览时渲染                 | (v: string) => void | -      |
