---
category: Components
subtitle: 上传组件
group: 基础
order: 1
title: Uploader
date: 2024-01-18 15:28:02
author: 
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用

- 身份证、护照、附件等上传时使用。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/simple.tsx">基本使用</code>
<code src="./demo/card.tsx">卡片模式</code>
<code src="./demo/muti-uploader.tsx">多组件模式</code>
<code src="./demo/excel.tsx">Excel上传</code>


## API

### Uploader

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | `boolean` | false |
| isPreview | 是否预览 | `boolean` | false |
| multiple | 是否支持多选 | `boolean` | false |
| accept | 文件类型 | `IFileExt[]` |  ['.jpg', '.jpeg', '.png'] |
| limit | 文件数量限制 | `number` | 5 |
| maxSize | 文件最大尺寸限制 | `number` | '5M' |
| minSize | 文件最小尺寸限制 | `number` | '10KB' |
| allMaxSize | 全部文件大小限制 | `number` | '60MB' |
| limit | 文件数量限制 | `number` | 5 |
| uploaderCount | 上传组件数量，当有多个上传组件时，`limit` 为1 | `number` | 1 |
| tipPlacement | 提示文案展示位置 | `'top' \| 'bottom'` | `bottom` |
| renderTip | 自定义提示文案 | `() => React.ReactElement` | - |
| listType | 上传列表的样式 | `'text' \| 'card' \| 'image'` | 'text' |
| btnType | 按钮类型 | `'normal' \| 'primary' \| 'secondary'` | 'primary' |
| placeholder | 按钮显示内容 | `string \| string[]` | - |
| customRequest | 自定义请求 | `(option: IReqParam) => Promise<IFileData>` | - |
| onProgress | 上传中回调 | `() => void` | - |
| onAbort | 中断回调 | `(file: File) => void` | - |
| onChange | change事件 | `(files: File[]) => void` | - |
| value | 值 | `File[]` | [] |


