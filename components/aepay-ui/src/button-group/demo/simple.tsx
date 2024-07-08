import React from 'react';
import { ButtonGroup } from '@ali/aepay-ui';

const App: React.FC = () => {
  return (
    <div>
      <ButtonGroup
        actions={[
          {
            btnText: '查看',
            type: 'primary',
            onClick: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve('');
                  console.log('onClick...查看');
                }, 1000);
              });
            },
          },
          {
            btnText: '编辑',
            hidden: () => true,
            onClick: () => {
              console.log('onClick...编辑');
            },
          },
          {
            btnText: '清除',
            onClick: () => {
              console.log('onClick...清除');
            },
          },
        ]}
        style={{ marginBottom: 12 }}
      />
      <ButtonGroup
        text
        data={{ type: 2 }}
        actions={[
          {
            btnText: '查看',
            autoLoading: true,
            onClick: (data: any) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve('');
                  console.log('onClick...查看', data);
                }, 1000);
              });
            },
          },
          {
            btnText: '编辑',
            hidden: (data: any) => data.type !== 2,
            onClick: (data: any) => {
              console.log('onClick...编辑', data);
            },
          },
          {
            btnText: '清除',
            hidden: (data: any) => data.type === 2,
            onClick: (data: any) => {
              console.log('onClick...清除', data);
            },
          },
        ]}
      />
    </div>
  );
};

export default App;
