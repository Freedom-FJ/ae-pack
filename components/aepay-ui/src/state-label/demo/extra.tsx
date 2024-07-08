import React from 'react';
import { StateLabel } from '@ali/aepay-ui';
import { Box } from '@alifd/next';

const App: React.FC = () => {
  return (
    <Box spacing={12} direction="column">
      <StateLabel type="error" text="错误态" extra="查看原因查看原因查看原因" />
      <StateLabel
        type="warning"
        text="警告态"
        extra={<a href="https://www.aliexpress.com/">查看详情</a>}
      />
      <div>
        <StateLabel
          style={{ width: 200 }}
          type="success"
          text="文本换行文本换行文本换行文本换行"
          extra="备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息"
        />
      </div>
    </Box>
  );
};

export default App;
