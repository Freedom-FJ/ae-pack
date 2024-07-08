import React from 'react';
import { Image } from '@ali/aepay-ui';

const App: React.FC = () => (
  <Image.PreviewGroup
    preview={{
      onChange: (current: number, prev: number) => console.log(`current index: ${current}, prev index: ${prev}`),
    }}
  >
    <Image
      width={200}
      src='https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
    />
    <Image
      width={200}
      src='https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp'
    />
  </Image.PreviewGroup>
);

export default App;
