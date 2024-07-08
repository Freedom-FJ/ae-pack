import React, { useState } from 'react';
import { BatchInput, Button } from '@ali/aepay-ui';

const App: React.FC = () => {
  const [value, setValue] = useState<any[]>([]);

  return (
    <BatchInput
      value={value}
      trigger={<Button style={{ display: 'inline-block', width: 200 }}>批量输入</Button>}
      onChange={(v: any[]) => {
        setValue(v);
        console.log('BatchInput...', v);
      }}
      style={{ width: 360 }}
    />
  );
};

export default App;
