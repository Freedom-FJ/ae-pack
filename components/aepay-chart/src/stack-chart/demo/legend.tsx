import React, { useMemo } from 'react';
import { StackChart } from '@ali/aepay-chart';
import { legends, mockData } from './mockData';

const App: React.FC = () => {
  const data = useMemo(() => mockData(), []);
  console.log('data...', legends, data);

  return (
    <StackChart 
      data={data} 
      legends={legends} 
      legendPosition="left" 
      legendAlign="center" 
      legendSize={12}
      formatXAxisText={(d: any) => {
        return d.date.replace(/-/g, '');
      }}
      formatValue={(value: any) => {
        return `${value / 50}pt`;
      }}
    />
  );
};

export default App;
