import React from 'react';
import { Card } from '@ali/aepay-ui';

const App: React.FC = () => {
  return (
    <Card
      label="质押金"
      tooltip="质押金业务描述"
      extra={<div>2024-02-19</div>}
      actions={[
        {
          btnText: '管理',
          text: true,
          type: 'primary',
        }
      ]}
      style={{ width: 600 }}
      contentStyle={{ paddingTop: 18 }}
    >
      内容
    </Card>
  );
};

export default App;
