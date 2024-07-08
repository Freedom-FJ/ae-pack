import React, { useState } from 'react';
import { Uploader } from '@ali/aepay-ui';
import { Message } from '@alifd/next';

const App: React.FC = () => {
  const [value, setValue] = useState<any[]>([    {
    name: '特价版.png',
    size: 26553,
    state: 'done',
    url: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
    uploadedSuccess: true
  }]);

  const customRequest = async (option: any) => {
    console.log('customRequest...', option);

    return {
      url: URL.createObjectURL(option.file),
      filename: '20240119114416.xls',
    };
  };

  const handleRemove = (file: any) => {
    if (file.uploadedSuccess) {
      Message.warning('该文件已提交审核，无法删除');
      return false;
    }

    return true;
  }

  return (
    <Uploader.Excel
      customRequest={customRequest}
      value={value}
      onChange={(value: File[]) => {
        console.log('onChange...>>>>', value);
        setValue(value);
      }}
      onRemove={handleRemove}
    />
  );
};

export default App;
