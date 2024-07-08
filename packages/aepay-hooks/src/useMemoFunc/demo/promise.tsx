/*
 * @Author: majiahui
 * @Description: 
 * @Date: 2024-02-04 11:37:48
 * @LastEditTime: 2024-02-04 11:50:37
 * @FilePath: /aepay-pkg/packages/aepay-hooks/src/useMemoFunc/demo/promise.tsx
 */
import React, { useEffect, useState } from 'react';
import { useMemoFunc } from '@ali/aepay-hooks';

export default () => {
  const [number] = useState(1);
  const [showNumber, setShowNumber] = useState(1);
  
  const getNumberMemo = useMemoFunc(
    (total: number): Promise<{ total: number }> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('执行了 getNumberMemo 方法');
          resolve({
            total: total + 1
          });
        }, 1000);
      });
    },
  );
  
  useEffect(() => {
    getValue()
  }, [number])

  const getValue = async () => {
    // 只会执行一次
    const data = await Promise.all([getNumberMemo(10), getNumberMemo(10)])
    setShowNumber(data[0].total)
  }
  return (
    <div className='step-form-box' >
      {showNumber}
    </div>
  );
};