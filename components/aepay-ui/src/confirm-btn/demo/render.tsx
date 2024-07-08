import React, { useState } from 'react';
import { ConfirmBtn } from '@ali/aepay-ui';
import { Button } from '@alifd/next';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const btnClick = () => {
    console.log('自定义按钮点击');
  };
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
    onConfirm={onConfirm}
    onCancel={onCancel}
    onClose={onClose}
    content="确定要提交此组表单信息吗？"
  >
    <Button
      loading={loading}
      type="primary"
      size="large"
      className="ml-12"
      onClick={btnClick}
    >
      提交
    </Button>
  </ConfirmBtn>);
};

export default App;