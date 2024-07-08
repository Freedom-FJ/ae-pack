import React, { useState } from 'react';
import { Uploader } from '@ali/aepay-ui';

const App: React.FC = () => {
  const [value, setValue] = useState<any[]>([
    null,
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
            filename: '20240119114416.png',
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
      uploaderCount={2}
      listType='card'
      placeholder={['上传证件人像面', '上传证件国徽面']}
      style={{ marginBottom: '20px' }}
      customRequest={customRequest}
      onAbort={(f: any) => console.log('onAbort...', f)}
      value={value}
      onChange={(value: File[]) => {
        console.log('onChange...>>', value);
        setValue(value);
      }}
    />
  );
};

export default App;
