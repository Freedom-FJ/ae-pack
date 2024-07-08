import React, { useMemo } from 'react';
import { MultiBarChart } from '@ali/aepay-chart';
import { legends, mockData } from './mockData';

const App: React.FC = () => {
  const data = useMemo(() => mockData(), []);
  console.log('data...', data);

  return (
    <MultiBarChart 
      data={data} 
      legends={legends} 
      legendPosition="left" 
      legendAlign="center" 
      legendSize={12}
      itemPadding={0.1}
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
