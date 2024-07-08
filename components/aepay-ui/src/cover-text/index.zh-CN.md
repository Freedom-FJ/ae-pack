---
category: Components
subtitle: 文本收缩隐藏组建
group: 数据展示
title: CoverText
date: 2023-12-21 16:05:27
author:
  - name: 马佳辉
    workNo: 423565
cover: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1719368848422-309f8890-9dd7-482b-8d3e-eaaf82504926.png
coverDark: https://intranetproxy.alipay.com/skylark/lark/0/2024/png/352284/1719368848422-309f8890-9dd7-482b-8d3e-eaaf82504926.png
---

## 何时使用

- 需要文本收缩和隐藏展示时

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/simple.tsx">基本使用</code>

## 受控组建

<!-- prettier-ignore -->
<code src="./demo/value.tsx">受控组件</code>

## API

### CoverTextProps

| 属性      | 说明                 | 类型          | 默认值 |
| --------- | -------------------- | ------------- | ------ |
| height    | 隐藏时的高度         | number/string | -      |
| value     | 控制组建展开还是收缩 | boolean       | -      |
| showBtn   | 是否显示展开收缩按钮 | boolean       | -      |
| onChange  | 收缩展开状态改变     | boolean       | -      |
| openText  | 展开状态按钮文本     | string        | -      |
| closeText | 收缩状态按钮文本     | string        | -      |
