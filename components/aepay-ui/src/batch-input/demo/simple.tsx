import React, { useState } from 'react';
import { BatchInput, Button } from '@ali/aepay-ui';

const App: React.FC = () => {
  const [value, setValue] = useState<any[]>([]);

  return (
    <>
      <BatchInput
        value={value}
        onChange={(v: any[]) => {
          setValue(v);
          console.log('BatchInput...', v);
        }}
        style={{ width: 360 }}
        hasClear
      />
      <Button
        type='primary'
        style={{ display: 'block', marginTop: 12 }}
        onClick={() => setValue([123, 456])}
      >
        修改值
      </Button>
    </>
  );
};

export default App;
