
import React, { useRef, useState } from 'react';
import { OtpInput } from '@ali/aepay-ui';
import { Button } from '@alifd/next';

const App: React.FC = () => {
  const [value, setValue] = useState<string>();
  const otpRef = useRef<any>();
  const onChange = (v: string) => {
    console.log('onChange...', v);
    setValue(v);
  }

  const onClear = () => {
    otpRef.current?.reset();
  }

  return (
    <div>
      <div>验证码：{value}</div>
      <OtpInput 
        defaultValue={'123456'} 
        value={value} 
        onChange={onChange} 
        otpRef={otpRef} 
        style={{ marginTop: 10, marginBottom: 10 }} 
      />
      <Button type="primary" onClick={onClear}>清空</Button>
    </div>
  );
};

export default App;