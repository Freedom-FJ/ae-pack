import React, { useState } from 'react';
import { useMemoFunc } from '@ali/aepay-hooks';

export default () => {
  const [number] = useState(1);
  const getNumberMemo = useMemoFunc(
    (total: number) => {
      return (
          <ul>
            {new Array(total).fill('').map((item, index) => <li>{index * number}</li>) }
          </ul>
        )
    },
    [number]
  );

  return (
    <div className='step-form-box' >
     {getNumberMemo(10)}
    </div>
  );
};