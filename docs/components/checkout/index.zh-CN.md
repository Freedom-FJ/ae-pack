---
category: Components
subtitle: 收银台支付SDK
group:
  title: 业务组件
  order: 2
title: AEPayCheckout
date: 2024-01-05 15:13:45
author: 
  - name: 喧和
    workNo: 289242
cover: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1704422924333-aa594b3b-aaf3-4cc6-9ee3-afdb9dba4d8a.png
coverDark: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1704422924333-aa594b3b-aaf3-4cc6-9ee3-afdb9dba4d8a.png
# demo:
#   cols: 2
---

## 何时使用

- 提供  Web/Wap 端卡支付/快捷支付 SDK，帮助您快速开始电脑浏览器及手机浏览器内的支付相关页面渲染。 

## 收银台集成
### 引入SDK包
- npm方式引入SDK包（仅内网可用）
```bash
tnpm install @ali/aepay-checkout
```

- 使用CDN资源引入SDK包
```html
<script src="https://assets.alicdn.com/g/code/npm/@ali/aepay-checkout/0.0.3/index.umd.es5.production.js"></script>
```

### 实例化SDK
1. 创建 config 对象：必传，Object 类型。包含所有配置参数：

| 参数  | 是否必填 | 说明     | 类型     | 默认值 |
| ---- | ------- | ------- | ------- | ------ |
| locale | 否 | 语言 | `en_US` \| `pt_BR` \| `ko_KR` \| `es_ES` |  `en_US`   |
| environment | 是 | 环境参数 | `sandbox` \| `prod` |  -   |
| version | 否 | alipaySDK版本 | `string` |  `1.6.1`   |
| analytics | 否 | 用于配置分析数据服务 | `Object` |  -   |
| onLog | 否 | 输出 SDK 运行期间触发的日志、接口异常等错误信息的回调函数 | `({code, message})=> void;` | - |
| onEventCallback | 否 | SDK 运行期间支付发生特定事件触发回调并返回具体事件码 | `({code, message})=> void;` | - |
2. 实例化 AEPayCheckout。

<CodeTabs tabs="NPM,CDN">

```js
import { AEPayCheckout } from "@ali/aepay-checkout";

const checkoutApp = new AEPayCheckout({
  environment: "sandbox",
  locale: "en_US",
  analytics: {
    enabled: true
  },
  onLog: ({code, message})=>{},
  onEventCallback: ({code, result})=>{}
});
```
 
 ```js
const checkoutApp = new window.AEPayCheckout({
  environment: "sandbox",
  locale: "en_US",
  analytics: {
    enabled: true
  },
  onLog: ({code, message})=>{},
  onEventCallback: ({code, result})=>{}
});
 ```
</CodeTabs>

### 创建渲染卡组件

```js
async function create(sessionData) {
  await checkoutApp.createComponent({ 
    sessionData: sessionData, 
    appearance:{
      showLoading: true, // 默认true，允许配置是否展示loading动画
    },
  });
}

//销毁组件
checkoutApp.unmount();
```

## 快捷支付集成
### 引入SDK包
- npm方式引入SDK包（仅内网可用）
```bash
tnpm install @ali/aepay-checkout
```

- 使用CDN资源引入SDK包
```html
<script src="https://assets.alicdn.com/g/code/npm/@ali/aepay-checkout/0.0.3/index.umd.es5.production.js"></script>
```

### 实例化SDK
1. 创建 config 对象：必传，Object 类型。包含所有配置参数：

| 参数  | 是否必填 | 说明     | 类型     | 默认值 |
| ---- | ------- | ------- | ------- | ------ |
| locale | 否 | 语言 | `en_US` \| `in_ID` \| `th_TH` \| `ms_MY` \| `tl_PH` \| `ko_KR` \| `vi_VN` \| `zh_HK` |  `en_US`   |
| environment | 是 | 环境参数 | `sandbox` \| `prod` |  -   |
| version | 否 | alipaySDK版本 | `string` |  `1.6.1`   |
| analytics | 否 | 用于配置分析数据服务 | `Object` |  -   |
| onLog | 否 | 输出 SDK 运行期间触发的日志、接口异常等错误信息的回调函数 | `({code, message})=> void;` | - |
| onEventCallback | 否 | SDK 运行期间支付发生特定事件触发回调并返回具体事件码 | `({code, message})=> void;` | - |
2. 实例化 AEPay。

<CodeTabs tabs="NPM,CDN">

```js
import { AEPay } from "@ali/aepay-checkout";

const checkoutApp = new AEPay({
  environment: "sandbox",
  locale: "en_US",
  analytics: {
    enabled: true
  },
  onLog: ({code, message})=>{},
  onClose:()=>{
    // 半浮层关闭
  },
  onEventCallback: ({code, message})=>{},
});
```
 
 ```js
const checkoutApp = new window.AEPay({
  environment: "sandbox",
  locale: "en_US",
  analytics: {
    enabled: true
  },
  onLog: ({code, message})=>{},
  onClose:()=>{
    // 半浮层关闭
  },
  onEventCallback: ({code, message})=>{},
});
 ```
</CodeTabs>

### 渲染支付页面

```js
async function create(sessionData) {
  await checkoutApp.createComponent({ 
    sessionData: sessionData, 
    appearance:{
      showLoading: true, // 默认true，允许配置是否展示loading动画
    },
  });
}
//销毁组件
checkoutApp.unmount();
```


## Alipay文档
- [Alipay卡支付SDK]：https://global.alipay.com/docs/ac/cashier_payment_cn/card_webwap
- [快捷支付SDK]：https://global.alipay.com/docs/ac/easypay/webwap