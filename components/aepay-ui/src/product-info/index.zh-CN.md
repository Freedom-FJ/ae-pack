---
category: Components
subtitle: 商品信息
group: 数据展示
order: 1
title: ProductInfo
date: 2024-02-27 19:05:34
author:
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用

- 商品信息展示时。

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>

## API

| 属性          | 说明              | 类型         | 默认值 |
| ------------- | ----------------- | ------------ | ------ |
| data          | 数据              | `IProduct`   | -      |
| hiddenSKUDesc | 是否隐藏 SKU 详情 | `boolean`    | false  |
| idLabel       | ID 标签           | `string`     | -      |
| skuLabel      | SKU 标签          | `string`     | -      |
| onImageClick  | 图片点击回调      | `() => void` | -      |

## IProduct

| 属性            | 说明             | 类型     | 默认值 |
| --------------- | ---------------- | -------- | ------ |
| skuDesc         | SKU 详情         | `string` | -      |
| productId       | 商品 ID          | `string` | -      |
| productTitle    | 商品标题         | `string` | -      |
| productUrl      | 商品图片地址     | `string` | -      |
| previewImageUrl | 商品预览图片地址 | `string` | -      |
