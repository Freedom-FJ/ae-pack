import React, { useState } from 'react';
import { Button, NumberPicker } from '@ali/aepay-ui';

const App: React.FC = () => {
  const [value, setValue] = useState(23.12);

  console.log(value, '.....>>value');

  return (
    <>
      <NumberPicker
        value={value}
        onChange={setValue}
        min={-10}
        max={100}
      />
      <Button style={{ marginLeft: 10 }} onClick={() => setValue(12.12)}>修改值</Button>
    </>
  );
};

export default App;
