import React from 'react';
import { Image } from '@ali/aepay-ui';
import { Button } from '@alifd/next';

const App: React.FC = () => {
  const onOpenAlbum = () => {
    Image.showAlbum({
      items: [
        'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
        'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
      ],
      current: Math.floor(Math.random() * 3),
    });
  }

  return (
    <Button type="primary" onClick={onOpenAlbum}>打开相册</Button>
  )
}

export default App;
