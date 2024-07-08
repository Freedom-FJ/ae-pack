
import React from 'react';
import FaceRecognition from '@ali/aepay-ekyc-face';

const App: React.FC = () => {
  return (
    <FaceRecognition
      locale="zh_CN"
      tenant="BG2"
      facialScanApplyId="mid"
      fieldProps={{
        country: {
          disabled: true
        },
        certificate: {
          disabled: true
        }
      }}
    />
  )
};

export default App;