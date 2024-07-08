import React, { useState } from 'react';
import { MultiBarChart } from '@ali/aepay-chart';
import { Button } from '@alifd/next';
import { legends, mockData } from './mockData';

const style: React.CSSProperties = {
  border: '1px solid #ccc',
  margin: 16,
  padding: 16,
  borderRadius: 6,
  wordBreak: 'break-all'
}

const App: React.FC = () => {
  const [data, setData] = useState(mockData());
  console.log('data...', legends, data);

  return (
    <>
      <MultiBarChart data={data} legends={legends} />

      <div style={style}>
        <Button type="primary" onClick={() => setData(mockData())}>修改数据</Button>
        <div>{JSON.stringify(data)}</div>
      </div >
    </>
  );
};

export default App;
