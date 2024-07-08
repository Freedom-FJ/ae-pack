---
nav:
  path: /utils
title: Time
date: 2023-12-26 16:05:27
order: 1
author: 
  - name: 喧和
    workNo: 289242
---

> 时间相关操作方法

## 引用
```typescript
import { getTimezone, getPSTNow, parseTimezoneTime, getTimezoneAbbreviation } from '@ali/aepay-utils';
```

## 方法

### 获取当前美西时间

```typescript
function getPSTNow(): void;
```

### 时区转换

```typescript
function parseTimezoneTime(time: dayjs.Dayjs | string, timezone: string = getTimezone()):  dayjs.Dayjs;
```

### 获取时区缩写

```typescript
function getTimezoneAbbreviation(): 'PST' | 'CEST' | string;
```