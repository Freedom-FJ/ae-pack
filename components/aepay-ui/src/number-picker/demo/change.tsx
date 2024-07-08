import React, { useState } from 'react';
import { NumberPicker } from '@ali/aepay-ui';

const App: React.FC = () => {
  const [value, setValue] = useState<string>();
  const inputChange = (v: string) => {
    console.log('onInputChange...', v);
  };

  const onChange = (v: string) => {
    console.log('onChange...', v);
    setValue(v);
  };

  return <NumberPicker value={value} min={1} max={100} onInputChange={inputChange} onChange={onChange} />;
};

export default App;
