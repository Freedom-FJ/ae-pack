## Install

```bash
$ npm i @ali/aepay-ekyc-face --save
```

## Usage

```jsx
import FaceRecognition, { FaceRecognitionSDK } from '@ali/aepay-ekyc-face';

FaceRecognitionSDK.show({
  locale: '',  // 当前语言
  facialScanApplyId: '',  // 商户申请扫脸ID，由商服生成，前端透传
  onCallback: ({ status, faceRecognitionId,  facialScanApplyId }) => {},
});

<FaceRecognition locale="" facialScanApplyId="" onCallback={console.log} />
```

## 问答
1. 退回扫脸阶段（有重新扫脸按钮）：4分钟超时弹框逻辑是否需要？ 
点了重新扫脸，要；不点已有结果的不要。

2. 4分钟超时弹框弹出后，点击重新尝试，4分钟后是否还会触发超时弹框？
需要

3. 触发降级弹框，是否需要中断轮询？
需要

4. 轮询间隔时间3秒

## 接口mock地址
https://oneapi.alibaba-inc.com/eapi/interface-manager?projectCode=ekyc-face

**接口代理**
```
https://pre-aepay-sg-bg2-acs.aliexpress.com/h5/  https://oneapi.alibaba-inc.com/mock/ekyc-face/
```