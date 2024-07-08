---
nav:
  path: /utils
title: Cache
date: 2024-01-09 10:37:41
author: 
  - name: 喧和
    workNo: 289242
---

> 常用的`Cache`相关公共方法

## 引用
```typescript
import { cacheApi } from '@ali/aepay-utils';
```

## 方法

### 设置缓存

```typescript
cacheApi.set(key: string, cacheTime: number, value: any);
```

### 获取缓存

```typescript
cacheApi.get(key: string);
```

### 清理缓存

```typescript
cacheApi.clear(key?: string | string[]);
```

### 缓存是否存在
```typescript
cacheApi.has(key: string);
```