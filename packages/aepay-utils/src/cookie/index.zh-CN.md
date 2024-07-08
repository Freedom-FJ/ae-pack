---
nav:
  path: /utils
title: Cookie
date: 2023-12-21 16:05:27
author: 
  - name: 喧和
    workNo: 289242
---

> 常用的`Cookie`相关公共方法

## 引用
```typescript
import { getSellerId } from '@ali/aepay-utils';
```

## 方法

### 获取卖家ID

```typescript
getSellerId();
```

### 获取当前国家Code

```typescript
getCountryCode();
```

### 获取当前语言

```typescript
getLanguage();
```

### 修改当前语言

```typescript
setLanguage(language: string);
```

### getCookie
```typescript
getCookie(key: string): string;
```

#### 入参

| 参数  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| key | key | `string` | -      |

### setCookie
```typescript
setCookie(key: string, value: string): void;
```

#### 入参

| 参数  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| key | key | `string` | -      |
| value | 值 | `string` | -      |
