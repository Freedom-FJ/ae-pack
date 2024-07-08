import React, { useEffect, useState } from 'react';
import { StackChart } from '@ali/aepay-chart';
import { Button, Loading } from '@alifd/next';
import { legends, mockData } from './mockData';
import { useRequest } from '@ali/aepay-hooks';

const style: React.CSSProperties = {
  border: '1px solid #ccc',
  margin: 16,
  padding: 16,
  borderRadius: 6,
  wordBreak: 'break-all'
}

const onModifyData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData());
    }, 1000);
  })
}

const App: React.FC = () => {
  const [currency, setCurrency] = useState('USD');
  const [dateType, setDateType] = useState('day');

  const { data = [], loading, run } = useRequest(onModifyData, {
    manual: true,
  });

  useEffect(() => {
    run();
  }, [currency, dateType]);

  return (
    <>
      <StackChart loading={loading} renderLoading={() => <Loading visible />} data={data} legends={legends} />

      <div style={style}>
        <Button type="primary" onClick={() => setCurrency(currency === 'USD' ? 'CNY' : 'USD')}>修改数据</Button>
        <Button type="primary" onClick={() => setDateType(dateType === 'day' ? 'week' : 'day')}>修改数据</Button>
        <div>{JSON.stringify(data)}</div>
      </div>
    </>
  );
};

export default App;
