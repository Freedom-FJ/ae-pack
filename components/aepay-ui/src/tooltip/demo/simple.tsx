
import React from 'react';
import { Tooltip } from '@ali/aepay-ui';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Tooltip 
        label="结算时间"
        tooltip="正常发货且已经完成结算的时间点"
        align="t"
      />
      <Tooltip 
        label="文本溢出文本溢出文本溢出"
        tooltip="正常发货且已经完成结算的时间点"
        align="t"
        style={{ width: '100px' }}
      />
      <Tooltip 
        label="结算时间"
        tooltip="正常发货且已经完成结算的时间点"
        align="t"
        type="underline"
      />
      <Tooltip 
        label="文本溢出文本溢出文本溢出"
        tooltip="正常发货且已经完成结算的时间点"
        align="t"
        style={{ width: '100px' }}
        type="underline"
      />
      <Tooltip 
        label="触发文本或图标显示"
        tooltip="正常发货且已经完成结算的时间点"
        align="t"
        style={{ width: '100px' }}
        type="text"
      />
    </div>
  );
};

export default App;