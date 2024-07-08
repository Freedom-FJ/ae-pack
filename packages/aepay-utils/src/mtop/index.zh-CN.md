---
nav:
  path: /utils
title: Mtop
date: 2024-01-09 11:35:50
order: 1
author: 
  - name: 喧和
    workNo: 289242
---

> Mtop请求方法

:::info{title="为什么不用 @alife/global-request-common ?"}
1. 相较于直接基于 `@ali/lib-mtop` 封装，`@alife/global-request-common` 嵌套层级过深、包体积更大且不易维护
2. 无法满足金融业务多租户共存调用问题
> 原因： `@alife/global-request-common` 引入了一个中间件导致 `mtopConfig` 配置永远取的是 `ctx` 里面，从而无法再通过 `window` 修改 `mtopConfig`。 <a target="_blank" href="https://code.alibaba-inc.com/global-util/requests/blob/master/packages/common-request/src/index.ts#L10">问题代码</a>
:::

## 全局配置
```js
window.mtopConfig = {
  prefix: '',
  mainDomain: 'aliexpress.com',
  subDomain: 'aepay-sg-acs',
  appKey: "12574478"
};
```

## 拦截器
提供了类似于 `axios` 的拦截器，可以在请求或响应被 `then` 或 `catch` 处理前拦截它们。
```js
// 添加请求拦截器
mtop.interceptors.request.use(function (config) {
  config.headers = { tenant };

  let mtopConfig: MtopConfig = {
    mainDomain: "aliexpress.com",
  };

  if (tenant === 'BG2') {
    mtopConfig.subDomain = `${isPreEnv() ? 'pre-' : ''}aepay-sg-bg2-acs`;
  } else if (tenant === 'B1X' || tenant === 'BE4') {
    mtopConfig.subDomain = `${isPreEnv() ? 'pre-' : ''}aepay-sg-acs`;
  }

  config.mtopConfig = mtopConfig;
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
mtop.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
```

如果你稍后需要移除拦截器，可以这样：
```js
const myInterceptor = mtop.interceptors.request.use(function () {/*...*/});
mtop.interceptors.request.eject(myInterceptor);
```

## 用法
```typescript
import { mtop } from '@ali/aepay-utils';

const response = await mtop({
  url: 'mtop.aepay.ekyc.face.country.list',
  method: 'GET',
  data: {
    locale:"zh_CN"
  },
  headers: {}
});
```

## 参数
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | mtop地址 | `string` | - |
| method | 请求方法 | `string` | `GET` \| `POST` |
| data | 请求参数 | `object` | - |
| headers | 请求头 | `object` | - |
| timeout | 超时时间 | `number` | `30000` |
| mtopConfig | mtop配置 | `MtopConfig` | - |
| ignoreInterceptors | 是否忽略拦截器 | `boolean` | `false` |
