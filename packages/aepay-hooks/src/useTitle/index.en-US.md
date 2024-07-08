---
nav:
  path: /hooks
title: useTitle
date: 2024-01-05 17:11:50
author: 
  - name: 喧和
    workNo: 289242
---

A hook that set title of the page.

## Examples

### Default usage

<code src="./demo/index.tsx">Default usage</code>

## API

```typescript
useTitle(title: string, options?: Options);
```

### Params

| Property | Description | Type     | Default |
| -------- | ----------- | -------- | ------- |
| title    | Page title  | `string` | -       |

### Options

| Property         | Description                                                                | Type      | Default |
| ---------------- | -------------------------------------------------------------------------- | --------- | ------- |
| restoreOnUnmount | Whether to restore the previous page title when the component is unmounted | `boolean` | `false` |
