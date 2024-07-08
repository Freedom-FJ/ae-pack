import React from 'react';
import { ButtonGroup } from '@ali/aepay-ui';

const App: React.FC = () => {
  const actions = [
    {
      btnText: '按钮一',
    },
    {
      btnText: '按钮二',
    },
    {
      btnText: '按钮三',
    },
    {
      btnText: '按钮四',
      disabled: true
    },
    {
      btnText: '按钮五按钮五按钮五按钮五',
      onClick: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('按钮五...');
            resolve(true);
          }, 3000);
        });
      },
    },
    {
      btnText: '按钮六',
      onClick: () => {
        console.log('按钮六...');
      },
    },
  ];

  return (
    <>
      <ButtonGroup
        actions={actions}
        maxCount={2}
        moreBtnType="normal"
        moreBtnText="更多操作"
        style={{ marginBottom: 16 }}
        moreBtnStyle={{ width: 160 }}
      />
      <ButtonGroup
        actions={actions}
        maxCount={3}
        size='small'
        text
      />
    </>
  );
};

export default App;
