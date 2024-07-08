---
nav:
  path: /utils
title: CacheCard SDK
group:
  title: 业务方法
  order: 2
date: 2024-04-23 14:07:15
order: 1
author:
  - name: 喧和
    workNo: 289242
---

## 何时使用

- 银行卡号合规传输时。
  > 接入文档：https://aliyuque.antfin.com/global.finnet/kv3sfm/vbce2l3mlo03ypsa

:::info{title="cacheCard 介绍"}
由于 PCI 的合规限制，信用卡的传输必须在 PCI 域内。当用户使用信用卡进行支付时，会从客户端侧输入信用卡信息，接着就会调用 cacheCard 接口，该接口会通过 HTTPS 协议将卡明文信息直接传输到卡资产中心，并将其放入缓存中，并返回给端侧一个支付凭证，该凭证可以在非 PCI 域内流转，并代表这张卡。

cacheCard 接口作为资产的门面，只传递跟卡相关的信息，与业务相关的信息卡中心该接口均不进行解释与存储。该接口存在的原因是用户的信用卡信息不能过非 PCI 域，因此只能从用户的端侧加密直接打到卡资产中心，并换取一个 token 凭证，该凭证就代表了这张卡的信息。
:::

## 如何使用

### 引入 SDK 包

```bash
tnpm install @ali/aepay-cache-card
```

### 调用方法

```js
import { encryptForCard, getCardToken, getKRCardToken } from '@ali/aepay-cache-card';

interface CacheCard {
  /**
   * 加密卡片
   * @param publicKey 公钥
   * @param payload 待加密数据
   * @returns 加密后数据
   */
  encryptForCard(publicKey: string, payload: string): IEncryptCardDTO;

  /**
   * 获取银行卡token
   * @param param
   */
  getCardToken(param: ICardParam): Promise<string>;

  /**
   * 获取韩国银行卡token
   * @param param
   */
  getKRCardToken(param: IKRCardParam): Promise<string>;
}
```

#### IEncryptCardDTO

| 参数 | 说明         | 类型   |
| ---- | ------------ | ------ |
| key  | AES 加密 key | string |
| body | 加密后数据   | string |

#### ICardParam

| 参数              | 说明       | 类型                         | 默认值       |
| ----------------- | ---------- | ---------------------------- | ------------ |
| publicKey         | 公钥       | string                       |              |
| cacheCardUrl      | 缓存卡 url | string                       |              |
| accountNo         | 账号       | string                       |              |
| region            | 地区       | string                       |              |
| currencies        | 币种       | string[]                     |              |
| holderAccountName | 持卡人姓名 | string                       |              |
| bankName          | 银行名称   | string                       |              |
| bankShortName     | 银行简称   | string                       |              |
| clientId          | 客户端 ID  | string                       |              |
| holderAccountType | 持卡人类型 | `ENTERPRISE` \| `INDIVIDUAL` | `ENTERPRISE` |

#### IKRCardParam

| 参数              | 说明       | 类型                         | 默认值       |
| ----------------- | ---------- | ---------------------------- | ------------ |
| accountNo         | 账号       | string                       |              |
| holderAccountName | 持卡人姓名 | string                       |              |
| bankName          | 银行名称   | string                       |              |
| bankShortName     | 银行简称   | string                       |              |
| region            | 地区       | string                       | `KR`         |
| currencies        | 币种       | string[]                     | `['KRW']`    |
| holderAccountType | 持卡人类型 | `ENTERPRISE` \| `INDIVIDUAL` | `ENTERPRISE` |
