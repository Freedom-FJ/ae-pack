import React from 'react';
import { Sankey } from '@ali/aepay-chart';
import mockData from './mockData';

interface IAmount {
  currency: string;
  amount: number;
}

function formatAmount(data: IAmount, currencyDisplay: 'symbol' | 'code' = 'code') {
  const { currency, amount } = data;
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency, currencyDisplay 
  }).format(Number(amount));
}

const App: React.FC = () => {
  return (
    <Sankey 
      data={mockData}
      nodeGap={8}
      linkColorRange={['#fdc9ce', '#dec3ff', '#a5d6a7', '#fae3aa', '#bbdefb', '#fbb4e9']}
      formatValue={(data: any) => formatAmount(data.amount, 'symbol')}
      formatLabel={(data: any) => `${data.label}  ${formatAmount(data.amount, 'symbol')}`}
    />
  );
};

export default App;
