
import React, { useEffect } from 'react';
import { ButtonGroup, PhoneInput, isValidPhoneNumber } from '@ali/aepay-ui';
import { Form, Field } from '@alifd/next';

const App: React.FC = () => {
  const field = Field.useField();

  useEffect(() => {
    console.log('isValidPhoneNumber....', isValidPhoneNumber('86-17645678234'));
  }, [])

  return (
    <Form field={field} onChange={console.log} style={{ width: 300 }}>
      <Form.Item name="phone1" label="手机号（可搜索）">
        <PhoneInput style={{ width: 300 }} defaultValue="86-17645678234" />
      </Form.Item>
      <Form.Item name="phone2" label="手机号（指定地区，不可搜索）">
        <PhoneInput defaultAreaCode={82} areaCodes={[82]} style={{ width: 300 }} placeholder="请输入手机号" />
      </Form.Item>

      <ButtonGroup
        actions={[
          { btnText: '重置', type: 'normal', onClick: () => field.reset() },
          { btnText: '重置默认值', type: 'normal', onClick: () => field.resetToDefault() },
          { btnText: '设值', type: 'primary', onClick: () => field.setValue('phone2', '86-17645678234') },
          { btnText: '保存', type: 'primary', onClick: () => console.log(field.getValues()) }
        ]}
      />
    </Form>
  );
};

export default App;