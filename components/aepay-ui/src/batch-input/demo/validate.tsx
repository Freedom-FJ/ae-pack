import React, { useState } from 'react';
import { BatchInput } from '@ali/aepay-ui';
import { Message } from '@alifd/next';

const App: React.FC = () => {
  const [value, setValue] = useState<any[]>([]);

  return (
    <BatchInput
      type='number'
      value={value}
      style={{ width: 360 }}
      maxLineLength={10}
      hasClear
      onChange={(v: any[]) => {
        setValue(v);
        console.log('BatchInput...', v);
      }}
      validator={(item: string) => {
        if (!(item.length <= 8)) {
          Message.error('每行最多只能输入八位数字');
          return false;
        }

        return true;
      }}
    />
  );
};

export default App;
