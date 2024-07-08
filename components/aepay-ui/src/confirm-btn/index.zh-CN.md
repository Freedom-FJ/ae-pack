---
category: Components
subtitle: 按钮二次确认组建
group: 基础
order: 1
title: ConfirmBtn
date: 2024-02-19 15:28
author:
  - name: 佳辉
    workNo: 423565
cover: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1719369138064-939734d9-11b9-4894-ae22-cd28ed57d4fe.png
coverDark: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1719369138064-939734d9-11b9-4894-ae22-cd28ed57d4fe.png
---

按钮二次确认组建,可以给按钮增加二次确认功能

## 何时使用

- 当我们的按钮需要触发二次确认时触发

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>

<code src="./demo/render.tsx">自定义插入按钮</code>

## API

### ConfirmBtn

> 本组建继承了 fusion 的 [Balloon](https://fusion.design/pc/component/balloon?themeid=2#demo-api) 全部 api。

| 属性            | 说明                                                            | 类型                                                                                            | 默认值   |
| --------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------- |
| btnProps        | 默认无插槽时的按钮属性对象                                      | [ButtonProps](https://fusion.design/pc/component/button?themeid=2#Button) 继承 fusion 的 Button | -        |
| submitBtnProps  | 二次确认按钮属性                                                | [ButtonProps](https://fusion.design/pc/component/button?themeid=2#Button) 继承 fusion 的 Button | -        |
| cancelBtnProps  | 二次确认取消属性                                                | [ButtonProps](https://fusion.design/pc/component/button?themeid=2#Button) 继承 fusion 的 Button | -        |
| btnText         | 无插槽时默认按钮文案                                            | string                                                                                          | `'提交'` |
| confirmText     | 二次确认按钮文案，默认不传时取`btnText`的值，再为空则为`'提交'` | string                                                                                          | -        |
| cancelText      | 二次确认取消按钮文案                                            | string                                                                                          | `'取消'` |
| loading         | 默认无插槽时的按钮 loading 属性                                 | boolean                                                                                         | -        |
| content         | 二次确认提示文案                                                | string                                                                                          | -        |
| onConfirm       | 二次确认确认回调                                                | () => void                                                                                      | -        |
| onCancel        | 二次确认取消回调                                                | () => void                                                                                      | -        |
| onClose         | 二次确认弹框非点击确认或者取消关闭回调                          | () => void                                                                                      | -        |
| onVisibleChange | 二次确认弹框变化回调                                            | (visible: boolean) => void                                                                      | -        |
