---
category: Components
group: 数据展示
title: Image
subtitle: 图片
description: 可预览的图片。
cols: 2
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FbOCS6aFMeUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*LVQ3R5JjjJEAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用

- 需要展示图片时使用。
- 加载显示大图或加载失败时容错处理。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本用法</code>
<code src="./demo/sdk.tsx">SDK模式</code>
<code src="./demo/preview-group.tsx">多张图片预览</code>
<code src="./demo/preview-group-visible.tsx">相册模式</code>

## API

### Image

| 属性     | 说明                        | 类型                                   | 默认值                                                                                      |
| -------- | --------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------- |
| alt      | 图像描述                    | string                                 | -                                                                                           |
| fallback | 加载失败容错地址            | string                                 | https://img.alicdn.com/imgextra/i3/O1CN01wK8pkq1qsPKZziHTQ_!!6000000005551-55-tps-60-60.svg |
| height   | 图像高度                    | string \| number                       | -                                                                                           |
| preview  | 预览参数，为 `false` 时禁用 | boolean \| [PreviewType](#previewtype) | true                                                                                        |
| src      | 图片地址                    | string                                 | -                                                                                           |
| width    | 图像宽度                    | string \| number                       | -                                                                                           |
| onError  | 加载错误回调                | (event: Event) => void                 | -                                                                                           |

其他属性见 [&lt;img>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

### PreviewType

| 参数            | 说明                                 | 类型                                             | 默认值 |
| --------------- | ------------------------------------ | ------------------------------------------------ | ------ |
| visible         | 是否显示                             | boolean                                          | -      |
| src             | 自定义预览 src                       | string                                           | -      |
| movable         | 是否可移动                           | boolean                                          | true   |
| mask            | 缩略图遮罩                           | ReactNode                                        | -      |
| scaleStep       | `1 + scaleStep` 为缩放放大的每步倍数 | number                                           | 0.5    |
| minScale        | 最小缩放倍数                         | number                                           | 1      |
| maxScale        | 最大放大倍数                         | number                                           | 50     |
| closeIcon       | 自定义关闭 Icon                      | React.ReactNode                                  | -      |
| forceRender     | 强制渲染预览图                       | boolean                                          | -      |
| onVisibleChange | 当 `visible` 发生改变时的回调        | (visible: boolean, prevVisible: boolean) => void | -      |

## PreviewGroup

| 参数     | 说明                        | 类型                                                    | 默认值 |
| -------- | --------------------------- | ------------------------------------------------------- | ------ |
| preview  | 预览参数，为 `false` 时禁用 | boolean \| [PreviewGroupType](#previewgrouptype)        | true   |
| items    | 预览数组                    | string[] \| { src: string, crossOrigin: string, ... }[] | -      |
| fallback | 加载失败容错地址            | string                                                  | -      |

### PreviewGroupType

| 参数            | 说明                                 | 类型                                                              | 默认值 |
| --------------- | ------------------------------------ | ----------------------------------------------------------------- | ------ |
| visible         | 是否显示                             | boolean                                                           | -      |
| movable         | 是否可移动                           | boolean                                                           | true   |
| current         | 当前预览图的 index                   | number                                                            | -      |
| mask            | 缩略图遮罩                           | ReactNode                                                         | -      |
| maskClassName   | 缩略图遮罩类名                       | string                                                            | -      |
| rootClassName   | 预览图的根 DOM 类名                  | string                                                            | -      |
| scaleStep       | `1 + scaleStep` 为缩放放大的每步倍数 | number                                                            | 0.5    |
| minScale        | 最小缩放倍数                         | number                                                            | 1      |
| maxScale        | 最大放大倍数                         | number                                                            | 50     |
| closeIcon       | 自定义关闭 Icon                      | React.ReactNode                                                   | -      |
| forceRender     | 强制渲染预览图                       | boolean                                                           | -      |
| countRender     | 自定义预览计数内容                   | (current: number, total: number) => React.ReactNode               | -      |
| onChange        | 切换预览图的回调                     | (current: number, prevCurrent: number) => void                    | -      |
| onVisibleChange | 当 `visible` 发生改变时的回调        | (visible: boolean, prevVisible: boolean, current: number) => void | -      |
