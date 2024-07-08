import React, { useState } from 'react';
import { Uploader } from '@ali/aepay-ui';

const App: React.FC = () => {
  const [value, setValue] = useState<any[]>([]);

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
      value={value} 
      onChange={(v: any) => setValue(v)} 
      multiple 
      placeholder='图片上传' 
      customRequest={customRequest} 
    />
  );
};

export default App;
