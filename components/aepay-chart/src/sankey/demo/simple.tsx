import React from 'react';
import { Sankey } from '@ali/aepay-chart';
import mockData from './mockData';

const App: React.FC = () => {
  return (
    <Sankey data={mockData} />
  );
};

export default App;
