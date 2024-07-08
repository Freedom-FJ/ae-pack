---
nav:
  path: /utils
title: Locale
date: 2023-12-21 16:05:27
author: 
  - name: 喧和
    workNo: 289242
---

> 用于获取多语言文案方法


## 示例
<code src="./demo/index.tsx">基本用法</code>

```typescript
import { getLocale } from '@ali/aepay-utils';

const locales = {
  zh_CN: {
    'ekyc.face.title': '人脸认证',
    'ekyc.face.country': '国籍',
    'ekyc.face.certificate': '证件类型',
    'ekyc.face.validDate': '有效期{0}分{1}秒，请在有效期内完成实名认证',
    'ekyc.face.maxSize': '最大不超过 {{maxSize}}，当前图片尺寸 {{currentSize}}',
  },
  en_US: {
    'ekyc.face.title': 'Face Verification',
    'ekyc.face.country': 'Country',
    'ekyc.face.certificate': 'Certificate Type',
    'ekyc.face.realPersonVerification': 'Real Person Verification',
    'ekyc.face.maxSize': 'Maximum {{maxSize}}, current image size {{currentSize}}',
  },
};

const $i18n = getLocale({
  language: 'zh_CN',
  locales,
  defaultLocale: 'en_US',
});
$i18n['ekyc.face.title'];
$i18n.get({ id: 'ekyc.face.country' });
$i18n.get('ekyc.face.certificate');
$i18n.get({ id: 'ekyc.face.validDate', placeholderValues: [29, 59] });
$i18n.get({ id: 'ekyc.face.maxSize', placeholderValues: { currentSize: '8MB', maxSize: '10MB' } });
```

## 方法

### 获取多语言文案

```typescript
const $i18n = getLocale(params: IParams);

// 数组方式获取
$i18n['ekyc.face.title']; 

// 方法对象方式获取
$i18n.get({ id: 'ekyc.face.country', dm: '国籍' }); 

// 方法字符串方式获取
$i18n.get('ekyc.face.country'); 

// 带变量获取：`placeholderValues` 为变量值
$i18n.get({ id: 'ekyc.face.validDate', placeholderValues: [29, 59] });

// 带变量获取：`placeholderValues` 为变量值，指定key
$i18n.get({ id: 'ekyc.face.maxSize', placeholderValues: { currentSize: '8MB', maxSize: '10MB' } });
```

### 高阶用法
> 我们可以用过 `alias` 方式精简本地配置，如下示例：
1. 我们优先取 `window[mdsKey]` 里面 `AEPAY_MERCHANT_WALLET.page.component.uploader.UpToMaxsizeCurrentImage` 对应的文案
2. 当文案不存在时，取 `$.UpToMaxsizeCurrentImage` 对应的文案
3. 如果文案还是不存在，最后取 `dm` 里面配置的文案

```js
export const locales = {
  'zh_CN': {
    '$.UpToMaxsizeCurrentImage': '最大不超过 {{maxSize}}，当前图片尺寸 {{currentSize}}',
  },
}

export default getLocale({
  locales,
  defaultLocale: 'zh_CN',
  alias: {
    $: 'AEPAY_MERCHANT_WALLET.page.component.uploader'
  }
});

$i18n.get({ 
  id: '$.UpToMaxsizeCurrentImage',
  placeholderValues: {
    maxSize:formatSize(maxSize), 
    currentSize: formatSize(file.size)
  },
  dm: '最大不超过 {{maxSize}}，当前图片尺寸 {{currentSize}}'
})
```

### 如何查看美杜莎对应的key？
> 在url上拼接 `_language=mds_key` 即可显示 `key`

#### IParams

| 参数  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| language | 当前语言 | ILanguage |  取cookie里面 `_lang`，没有取 `defaultLocale` |
| locales | 本地语言配置 | Locale<ILanguage, T> | -  |
| defaultLocale | 默认语言 | ILanguage | zh_CN  |
| mdsKey | `window`上美杜莎`key`，`csp`中值为`_APP_LANG__` | string | -  |
| alias | 别名 | Record<string, string> | -  |


```ts
type ILanguage = 'zh_CN' | 'en_US';

type Locale<K extends ILanguage, T = any> = {
  [P in K]: {
    [Q in keyof T]: T[Q] | any;
  };
};
```