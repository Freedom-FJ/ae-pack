import React from 'react';
import { Progress } from '@ali/aepay-ui';
import { Icon } from '@alifd/next';

const App: React.FC = () => {
  return (
    <div style={{ maxWidth: 300 }}>
      <Progress percent={30} style={{ marginBottom: 8 }} textRender={(percent: number) => `${percent}%`} />
      <Progress percent={100} textRender={() => <Icon type="select" size="medium" />} />
    </div>
  );
};

export default App;
