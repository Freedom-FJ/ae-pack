import React from 'react';
import { CopyText } from '@ali/aepay-ui';

const App: React.FC = () => {
  return (
    <div>
      <CopyText successMessage="文本拷贝1成功">
        文本拷贝1
      </CopyText>
      
      <div style={{ marginTop: 12 }}>
        <CopyText
          successMessage={<div>文本拷贝2成功</div>} 
          text="文本拷贝文本拷贝文本拷贝文本拷贝2" 
          style={{ width: 120 }} 
        />
        <CopyText
          successMessage={<div>文本拷贝2成功</div>} 
          text="文本拷贝文本拷贝文本拷贝文本拷贝2" 
          style={{ width: 120, marginLeft: 36 }}
          ellipsis 
        />
      </div>
    </div>
  );
};

export default App;
