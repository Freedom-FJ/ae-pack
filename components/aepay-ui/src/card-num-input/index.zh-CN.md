---
category: Components
subtitle: 银行卡输入组件
group: 基础
order: 1
title: CardNumInput
date: 2024-04-18 15:59:20
author:
  - name: 喧和
    workNo: 289242
cover: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1719369069435-57705340-45fb-4315-b86d-745ab10bdb68.png
coverDark: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1719369069435-57705340-45fb-4315-b86d-745ab10bdb68.png
---

## 何时使用

- 输入银行卡号时使用。

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>

## 方法

```js
import { isValidCardNo, CardHelper, getCardBinToken } from '@ali/aepay-ui';

// 校验卡号是否合法
isValidCardNo(value: string): boolean;

// 获取卡号的品牌
CardHelper.getBrand(value: string): string;

// 将卡号转换为 token
getCardBinToken(params: ICardBinParam): string | null;
```

## API

| 属性          | 说明                     | 类型                               | 默认值 |
| ------------- | ------------------------ | ---------------------------------- | ------ |
| showEyeText   | 预览时是否不展示明文     | `boolean`                          | true   |
| showFormatted | 预览时是否展示格式化卡号 | `boolean`                          | true   |
| renderPreview | 预览时渲染               | (v: string) => void                | -      |
| showCardLogo  | 是否显示卡品牌 logo      | `boolean`                          | true   |
| maxLineLength | 最大所支持的行的数量     | `number`                           | 500    |
| defaultValue  | 输入框默认值             | `any[]` \| `string`                | -      |
| value         | 输入框的值               | `any[]` \| `string`                | -      |
| onChange      | 输入框的值变化时的回调   | `(value: any[] \| string) => void` | -      |

### ICardBinParam

| 属性              | 说明       | 类型       | 示例                            |
| ----------------- | ---------- | ---------- | ------------------------------- |
| accountNo         | 卡号       | `string`   | `48104084201017`                |
| region            | 发卡地区   | `string`   | `KR`                            |
| currencies        | 币种       | `string[]` | `['KRW']`                       |
| holderAccountName | 持卡人信息 | `string`   | `(주)옵튜코리아`                |
| bankName          | 银行卡名称 | `string`   | `Industrial Bank of Korea(IBK)` |
| holderAccountType | 持卡人类型 | `string`   | `ENTERPRISE`                    |
