/*
 * @Author: mjh
 * @Date: 2024-05-20 15:25:43
 * @LastEditors: mjh
 * @LastEditTime: 2024-05-20 16:45:45
 * @Description: 
 */
import React, { useState } from 'react';
import { useEffectOnce } from '@ali/aepay-hooks';
import { Button } from '@alifd/next';

export default () => {
  const [list, setList] = useState([
    { name: 'no-check' }
  ]);
  
  useEffectOnce(() => {
    console.log('useEffectOnce内部函数被执行');
    setList((pre) => {
      pre[0].name = 'check-once';
      return [...pre];
    });
  }, [list], () => list[0]?.name === 'check');

  return (
    <>
      <div className='step-form-box' >
        {list.map(item => <div>{item.name}</div>)}
      </div>
      <Button onClick={() =>
        setList(list => [{ name: 'check' }, ...list,])
      }>点击增加一个</Button>
    </>
  );
};