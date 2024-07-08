import React, { useEffect, useState } from 'react';
import { Progress } from '@ali/aepay-ui';

const App: React.FC = () => {
  const [percent, setPercent] = useState(20);

  useEffect(() => {
    let interval = setInterval(() => {
      setPercent((p) => (p < 100 ? p + 10 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: 300 }}>
      <Progress
        percent={percent}
        color={(p: number) => {
          if (p <= 20) return '#ffeb3b';
          if (p <= 40) return '#cddc39';
          if (p <= 60) return '#ffc107';
          if (p <= 80) return '#ff9800';
          return '#ff5722';
        }}
      />
    </div>
  );
};

export default App;
