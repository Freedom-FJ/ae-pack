import React, { useState } from 'react';
import { useTimeout } from '@ali/aepay-hooks';

export default () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState<number | undefined>(1000);

  const { clear, resetTime } = useTimeout(() => {
    setCount(count + 1);
  }, delay);

  return (
    <div>
      <p> count: {count} </p>
      <p style={{ margin: '16px 0' }}> Delay: {delay} </p>
      <button onClick={() => setDelay((t) => (!!t ? t + 1000 : 1000))} style={{ marginRight: 8 }}>
        延时 + 1000
      </button>
      <button
        style={{ marginRight: 8 }}
        onClick={() => {
          resetTime();
        }}
      >
        重置倒计时
      </button>
      <button onClick={clear}>清理计时器</button>
    </div>
  );
};