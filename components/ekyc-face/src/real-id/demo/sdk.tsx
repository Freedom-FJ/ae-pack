
import React from 'react';
import { FaceRecognitionSDK } from '@ali/aepay-ekyc-face';
import { Button } from '@alifd/next';

const App: React.FC = () => {
  const openSDK = () => {
    FaceRecognitionSDK.show({
      locale: 'zh_CN',
      tenant: "BG2",
      facialScanApplyId: 'mid',
      onCallback: ({ status, faceRecognitionId,  facialScanApplyId }: any) => {
        console.log('onCallback....', status, faceRecognitionId,  facialScanApplyId);
      }
    })
  };

  return (
    <Button type="primary" onClick={openSDK}>SDK方式唤起</Button>
  )
};

export default App;