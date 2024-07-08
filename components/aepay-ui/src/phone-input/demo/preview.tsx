
import React, { useState } from 'react';
import { PhoneInput } from '@ali/aepay-ui';
import { Switch } from '@alifd/next';

const App: React.FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        是否全部展示：<Switch checked={checked} onChange={(v) => setChecked(v)} />
      </div>
      <PhoneInput showEyeText={!checked} isPreview value="86-17645678234" />
    </>
  );
};

export default App;