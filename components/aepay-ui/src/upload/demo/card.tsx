import React, { useState } from 'react';
import { Uploader } from '@ali/aepay-ui';

const App: React.FC = () => {
  const [value, setValue] = useState<any[]>([
    {
      name: '特价版.png',
      size: 26553,
      state: 'done',
      url: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
    },
    {
      name: '特价版.png',
      size: 26553,
      state: 'done',
      url: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
    },
    {
      name: '特价版.png',
      size: 26553,
      state: 'done',
      url: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
    },
  ]);

  const customRequest = async (option: any) => {
    console.log('customRequest...', option);
    let count = 1;
    let time: any;

    return await new Promise((resolve) => {
      time = setInterval(() => {
        if (count === 100) {
          resolve({
            url: URL.createObjectURL(option.file),
            filename: 'Sa6f388a661a5493880d197f6d7e6a1e5f.png',
          });
          clearInterval(time);
        } else {
          count++;
          option.onProgress({ percent: count });
        }
      }, 1);
    });
  };

  return (
    <Uploader
      uploaderCount={1}
      limit={3}
      hiddenDownload
      listType='card'
      placeholder={['上传护照']}
      style={{ marginBottom: '20px' }}
      customRequest={customRequest}
      value={value}
      onChange={(value: File[]) => {
        console.log('onChange...>>>>', value);
        setValue(value);
      }}
    />
  );
};

export default App;
