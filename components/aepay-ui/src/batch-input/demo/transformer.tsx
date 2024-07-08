import React, { useState } from 'react';
import { BatchInput } from '@ali/aepay-ui';

const App: React.FC = () => {
  const [value, setValue] = useState<string>('123,456,789');

  return (
    <BatchInput
      value={value}
      onChange={(v: string) => {
        setValue(v);
        console.log('BatchInput...', v);
      }}
      style={{ width: 360 }}
      parseToString
      hasClear
    />
  );
};

export default App;
