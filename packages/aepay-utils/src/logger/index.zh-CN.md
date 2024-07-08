---
nav:
  path: /utils
title: Logger
date: 2023-12-21 16:05:27
author: 
  - name: 喧和
    workNo: 289242
---

> 埋点相关方法，如点击、曝光等

## 引用
```typescript
import { logger } from '@ali/aepay-utils';
const { click, expose } = logger;
```

## 方法

### 点击事件上报

```typescript
click(eventId: string, params?: Params): void;
```

### 曝光事件上报

```typescript
expose(eventId: string, params?: Params): void;
```

:::warning{title=注意事项}

在使用前请确保 `window.sendAESEvent` 方法存在，如不存在参考下面方法接入
```html
<!-- 确保上报的数据到国际站 -->
<meta name="aplus-rhost-g" content="sg.mmstat.com" />
<!-- 埋点上报依赖aplus上报 -->
<script>
(function(w, d, s, q, i) {
  w[q] = w[q] || [];
  var f = d.getElementsByTagName(s)[0],j = d.createElement(s);
  j.async = true;
  j.id = 'beacon-aplus';
  j.setAttribute('exparams',`clog=o&aplus&sidx=aplusSidex&ckx=aplusCkx`);
  j.src = "//g.alicdn.com/alilog/mlog/aplus_v2.js";
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'aplus_queue');
  </script>
<!-- 埋点上报的相关资源 -->
<script src="https://g.alicdn.com/aes/??tracker/3.0.5/index.js,tracker-plugin-pv/3.0.2/index.js,tracker-plugin-event/3.0.0/index.js,tracker-plugin-jserror/3.0.3/index.js,tracker-plugin-api/3.0.7/index.js,tracker-plugin-resourceError/3.0.2/index.js,tracker-plugin-perf/3.0.7/index.js,tracker-plugin-eventTiming/3.0.0/index.js,tracker-plugin-longtask/3.0.1/index.js,tracker-plugin-blank/3.0.1/index.js,tracker-plugin-animFluency/3.0.0/index.js,tracker-plugin-emogine/3.0.5/index.js,tracker-plugin-autolog/3.0.3/index.js,tracker-plugin-survey/3.0.10/index.js"></script>
<!-- 将埋点数据上报到指定的pid上 -->
<script>
  const aes = new AES({
    pid: "aepay-merchant-wallet",
    user_type: "13",
    env: 'pre',
  });
  const pluginArr = aes.use([
    AESPluginPV,AESPluginEvent,AESPluginJSError,AESPluginAPI,AESPluginResourceError,AESPluginPerf,AESPluginEventTiming,AESPluginLongTask,AESPluginBlank,AESPluginAnimFluency,AESPluginEmogine,AESPluginAutolog,AESPluginSurvey
  ]);
  window.sendAesEvent = pluginArr[1];
  window.aes = aes;
</script>
```
:::


#### 入参

| 参数  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| eventId | 事件名称 | `string` | -      |
| params | 事件参数 | `Params` | -      |


#### Params
| 参数  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| c1 | 参数值1 | `string` | -      |
| c2 | 参数值2 | `string` | -      |
| c3 | 参数值3 | `string` | -      |
| c4 | 参数值4 | `string` | -      |
| c5 | 参数值5 | `string` | -      |