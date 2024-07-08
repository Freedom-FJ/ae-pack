
import React, { useEffect, useState } from 'react';
import FaceRecognition from '@ali/aepay-ekyc-face';
import { Button } from '@alifd/next';

const App: React.FC = () => {
  const [facialScanApplyId, setFacialScanApplyId] = useState('');
  const [disabled, setDisabled] = useState(true);

  const onCallback = (params: any) => {
    console.log('onCallback....', params);

    if (!params.redirect) {
      setDisabled(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFacialScanApplyId('mid');
    }, 1000);
  }, [])

  return (
    <>
      <FaceRecognition 
        locale="zh_CN"
        tenant="BG2"
        facialScanApplyId={facialScanApplyId}
        onCallback={onCallback}
        onlyShowFace
        initValue={{
          country: 'CN',
          certificate: 'ID_CARD'
        }}
      />
      <Button type="primary" disabled={disabled}>下一步</Button>
    </>
  )
};

export default App;