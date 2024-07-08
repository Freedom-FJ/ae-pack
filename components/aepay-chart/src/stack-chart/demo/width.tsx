import React, { useMemo } from 'react';
import { StackChart } from '@ali/aepay-chart';
import { legends, mockData } from './mockData';

const App: React.FC = () => {
  const data = useMemo(() => mockData(), []);
  console.log('data...', data);

  return (
    <>
      {
        [0.1, 0.5, 0.9].map((ratio, index) => (
          <div key={ratio}>
            <h3 
              style={{ 
                fontSize: 14, 
                marginTop: index === 0 ? 0 : 30, 
                backgroundColor: '#f5f5f5', 
                padding: '4px 8px', 
                borderLeft: '4px solid #7a89dd'
              }}
            >
              itemPadding: {ratio}
            </h3>
            <StackChart legends={legends} data={data} itemPadding={ratio} />
          </div>
        ))
      }
    </>
  );
};

export default App;
