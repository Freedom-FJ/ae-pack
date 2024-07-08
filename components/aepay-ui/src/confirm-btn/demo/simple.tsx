
import React, { useState } from 'react';
import { ConfirmBtn } from '@ali/aepay-ui';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const onConfirm = () => {
    console.log('确认');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const onCancel = () => {
    console.log('取消');
  };
  const onClose = () => {
    console.log('非确认和取消关闭');
  };

  return (<ConfirmBtn
    title="操作提示"
    content="确定要删除此组表单信息吗？"
    onConfirm={onConfirm}
    onCancel={onCancel}
    onClose={onClose}
    loading={loading}
    btnProps={{ type: 'normal', size: 'medium' }}
    btnText="删除"
  />);
};

export default App;