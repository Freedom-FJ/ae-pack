---
category: Components
group: Data Display
title: Image
description: Preview-able image.
cols: 2
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FbOCS6aFMeUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*LVQ3R5JjjJEAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

- When you need to display pictures.
- Display when loading a large image or fault tolerant handling when loading fail.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Usage</code>
<code src="./demo/preview-group.tsx">Multiple image preview</code>
<code src="./demo/preview-group-visible.tsx">Preview from one image</code>

## API

### Image

| Property | Description                           | Type                                   | Default                                                                                     |
| -------- | ------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------- |
| alt      | Image description                     | string                                 | -                                                                                           |
| fallback | Load failure fault-tolerant src       | string                                 | https://img.alicdn.com/imgextra/i3/O1CN01wK8pkq1qsPKZziHTQ_!!6000000005551-55-tps-60-60.svg |
| height   | Image height                          | string \| number                       | -                                                                                           |
| preview  | preview config, disabled when `false` | boolean \| [PreviewType](#previewtype) | true                                                                                        |
| src      | Image path                            | string                                 | -                                                                                           |
| width    | Image width                           | string \| number                       | -                                                                                           |
| onError  | Load failed callback                  | (event: Event) => void                 | -                                                                                           |

其他属性见 [&lt;img>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

### PreviewType

| Property        | Description                                                   | Type                                             | Default |
| --------------- | ------------------------------------------------------------- | ------------------------------------------------ | ------- |
| visible         | Whether the preview dialog is visible or not                  | boolean                                          | -       |
| src             | Custom preview src                                            | string                                           | -       |
| movable         | whether can be moved                                          | boolean                                          | true    |
| mask            | Thumbnail mask                                                | ReactNode                                        | -       |
| scaleStep       | `1 + scaleStep` is the step to increase or decrease the scale | number                                           | 0.5     |
| minScale        | Min scale                                                     | number                                           | 1       |
| maxScale        | Max scale                                                     | number                                           | 50      |
| closeIcon       | Custom close icon                                             | React.ReactNode                                  | -       |
| forceRender     | Force render preview dialog                                   | boolean                                          | -       |
| onVisibleChange | Callback when `visible` changed                               | (visible: boolean, prevVisible: boolean) => void | -       |

## PreviewGroup

| Property | Description                           | Type                                                    | Default |
| -------- | ------------------------------------- | ------------------------------------------------------- | ------- |
| preview  | Preview config, disabled when `false` | boolean \| [PreviewGroupType](#previewgrouptype)        | true    |
| items    | Preview items                         | string[] \| { src: string, crossOrigin: string, ... }[] | -       |
| fallback | Load failure fault-tolerant src       | string                                                  | -       |

### PreviewGroupType

| Property        | Description                                                   | Type                                                              | Default |
| --------------- | ------------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| visible         | Whether the preview dialog is visible or not                  | boolean                                                           | -       |
| movable         | whether can be moved                                          | boolean                                                           | true    |
| current         | The index of the current preview                              | number                                                            | -       |
| mask            | Thumbnail mask                                                | ReactNode                                                         | -       |
| maskClassName   | The className of the mask                                     | string                                                            | -       |
| rootClassName   | The classname of the preview root DOM                         | string                                                            | -       |
| scaleStep       | `1 + scaleStep` is the step to increase or decrease the scale | number                                                            | 0.5     |
| minScale        | Min scale                                                     | number                                                            | 1       |
| maxScale        | Max scale                                                     | number                                                            | 50      |
| closeIcon       | Custom close icon                                             | React.ReactNode                                                   | -       |
| forceRender     | Force render preview dialog                                   | boolean                                                           | -       |
| countRender     | Custom preview count content                                  | (current: number, total: number) => React.ReactNode               | -       |
| onChange        | Callback when switch preview image                            | (current: number, prevCurrent: number) => void                    | -       |
| onVisibleChange | Callback when `visible` changed                               | (visible: boolean, prevVisible: boolean, current: number) => void | -       |
