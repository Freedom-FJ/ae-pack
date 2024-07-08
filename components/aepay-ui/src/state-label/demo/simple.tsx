import React from 'react';
import { StateLabel } from '@ali/aepay-ui';
import { Box } from '@alifd/next';

const App: React.FC = () => {
  return (
    <Box spacing={12} direction="row">
      <StateLabel type="success" text="成功态" />
      <StateLabel type="error" text="错误态" />
      <StateLabel type="warning" text="警告态" />
      <StateLabel type="unavailable" text="置灰态" />
      <StateLabel type="prompt" text="提示态" />
    </Box>
  );
};

export default App;
