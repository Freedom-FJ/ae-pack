
import React, { useState } from 'react';
import { FaceRecognitionDialog } from '@ali/aepay-ekyc-face';
import { Button } from '@alifd/next';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const onCallback = ({ status, faceRecognitionId,  facialScanApplyId }: any) => {
    console.log('onCallback....', status, faceRecognitionId,  facialScanApplyId);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>弹框唤起</Button>
      <FaceRecognitionDialog 
        visible={visible}
        onClose={() => setVisible(false)}
        locale="zh_CN"
        tenant="BG2"
        facialScanApplyId="mid"
        title="人脸识别"
        onCallback={onCallback}
      />
    </>
  )
};

export default App;