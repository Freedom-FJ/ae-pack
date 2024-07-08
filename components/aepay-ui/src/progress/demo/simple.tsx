import React from 'react';
import { Progress } from '@ali/aepay-ui';

const App: React.FC = () => {
  return (
    <div style={{ maxWidth: 300 }}>
      <Progress percent={0} style={{ marginBottom: 8 }} />
      <Progress percent={30} style={{ marginBottom: 8 }} />
      <Progress percent={100} style={{ marginBottom: 8 }} />
    </div>
  );
};

export default App;
