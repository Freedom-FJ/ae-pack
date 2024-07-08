---
category: Components
subtitle: 密码输入框
group: 基础
order: 1
title: PasswordInput
date: 2023-11-29 10:54:25
author: 
  - name: 佳辉
    workNo: 423565
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

不会被谷歌浏览器识别的密码输入组建。

## 何时使用

- 不希望谷歌浏览器自动填充密码时。
- 不希望我们输入密码成功后谷歌浏览器跳出保存密码弹框。 

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/simple.tsx">基本使用</code>


## API

### PasswordInput
> 本组建使用api和 fusion的 [Input](https://fusion.design/pc/component/input?themeid=2#demo-api) 组建没有区别，其继承了全部的api。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showToggle | 是否显示眼睛图标 | boolean | false |
| onChange | change事件 | (v: string) => void | - |