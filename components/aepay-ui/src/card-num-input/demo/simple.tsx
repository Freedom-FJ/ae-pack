import React from 'react';
import { CardNumInput, isValidCardNo, CardHelper } from '@ali/aepay-ui';
import { Form, Field } from '@alifd/next';

const App: React.FC = () => {
  const field = Field.useField({
    values: {
      cardNo: '4444333322221111',
    },
  });

  const verifyCardNum = (_: any, value: string, callback: any) => {
    isValidCardNo(value) ? callback() : callback('请输入正确的卡号');
  };

  console.log(CardHelper.getBrand('4444333322221111').toUpperCase())

  return (
    <Form field={field} onChange={console.log} style={{ width: 300 }}>
      <Form.Item
        name="cardNo"
        label="卡号"
        required
        validatorTrigger={['onBlur', 'onChange']}
        validator={verifyCardNum}>
        <CardNumInput />
      </Form.Item>
    </Form>
  );
};

export default App;
