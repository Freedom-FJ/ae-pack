---
category: Components
subtitle: 表格
group: 基础
order: 1
title: Table
date: 2024-02-21 19:35:52
author: 
  - name: 喧和
    workNo: 289242
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用

- 表格展示时，多语言已处理。

## 代码演示

<code src="./demo/simple.tsx">基本使用</code>

## API
支持全部 `Fusion Table` 属性  

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标题 | `string` | - |
| tooltip | 描述 | `string` | - |
| extra | 扩展信息 | `string` \| `React.ReactElement` | - |
| children | 内容 | `React.ReactNode` \| `React.ReactNode[]` | - |
| actions | 右侧按钮组 | `IButtonItem[]` | - |
| contentStyle | content样式 | `React.CSSProperties` | - |

### IColumn
支持 `Fusion` 全部`Table.Column`,  `Table.ColumnGroup` 属性   

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| column | 多级表头嵌套展示 | `IColumn[]` | - |
| dataIndex | 指定列对应的字段 | `string` | - |
| title | 列标题 | `string` | - |
| titleEllipsis | 标题是否省略 | `boolean` | `false` |
| tooltip | 列描述 | `string` | - |
| valueType | 列的值类型，自带默认渲染方法 | `copyText` \| `text` \| `date` \| `dateRange` \| `money` \| `labelTip` \| `enum` \| `product`  | - |
| width | 宽度 | `number` | - |
| fieldProps | 传递给内部的 valueType 映射到的组件的属性 | `Record<string, any>` | - |
| render | 自定义渲染 | ` (record: T, value?: any, index?: number) => any` | - |