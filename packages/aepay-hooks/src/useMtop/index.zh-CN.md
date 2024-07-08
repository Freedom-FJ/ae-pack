---
nav:
  path: /hooks
title: useMtop
date: 2024-01-05 17:11:50
author: 
  - name: 喧和
    workNo: 289242
---

> 用于接口请求。

## 基础用法
```js
const { loading, error, data, run } = useMtop<IExportListDTO>(APIS.queryFileExportRecord);
```

## 支持重试逻辑
> 例如：查询报表记录页面当第一条处于生成中时会重试刷新接口。

```js
const { data, run } = useMtop<IExportListDTO>(APIS.queryFileExportRecord, {
  manual: true,
  // 如果在下载中重新尝试刷新接口
  autoRetry: (res) => {
    return res?.fileRecords?.[0]?.downType === EnumExportStatus.Processing;
  },
});
```

## 支持接口数据缓存
> 对于一些不怎么更新的接口我们可以对数据进行缓存，减少接口请求量。例如费用项列表接口缓存。
```js
const { data } = useMtop<IFeeItemOption[]>(APIS.queryPeriodFeeItem, {
	cache: true,
  cacheTime: 60 * 1000
});
```