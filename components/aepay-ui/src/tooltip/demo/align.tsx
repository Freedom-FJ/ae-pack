import React from 'react';
import { Tooltip } from '@ali/aepay-ui';

const App: React.FC = () => {
  const tooltip = <span>prompt text</span>;

  return (
    <div className='demo'>
      <div style={{ marginInlineStart: 80, display: 'flex', width: 160, justifyContent: 'space-around', whiteSpace: 'nowrap' }}>
        <Tooltip align='tl' label='TL' tooltip={tooltip} />
        <Tooltip align='t' label='Top' tooltip={tooltip} />
        <Tooltip align='tr' label='TR' tooltip={tooltip} />
      </div>
      <div style={{ width: 80, display: 'flex', flexDirection: 'column', float: 'inline-start' }}>
        <Tooltip align='lt' label='LT' tooltip={tooltip} />
        <Tooltip align='l' label='Left' tooltip={tooltip} />
        <Tooltip align='lb' label='LB' tooltip={tooltip} />
      </div>
      <div style={{ width: 80, display: 'flex', flexDirection: 'column', marginInlineStart: 280 }}>
        <Tooltip align='rt' label='RT' tooltip={tooltip} />
        <Tooltip align='r' label='Right' tooltip={tooltip} />
        <Tooltip align='rb' label='RB' tooltip={tooltip} />
      </div>
      <div style={{ marginInlineStart: 80, display: 'flex', width: 160, justifyContent: 'space-around', clear: 'both', whiteSpace: 'nowrap' }}>
        <Tooltip align='bl' label='BL' tooltip={tooltip} />
        <Tooltip align='b' label='Bottom' tooltip={tooltip} />
        <Tooltip align='br' label='BR' tooltip={tooltip} />
      </div>
    </div>
  );
};

export default App;
