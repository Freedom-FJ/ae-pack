/*
 * @Author: mjh
 * @Date: 2024-05-20 15:25:43
 * @LastEditors: mjh
 * @LastEditTime: 2024-05-22 11:59:02
 * @Description: 
 */
import React, { useState } from 'react';
import { useEffectCompare } from '@ali/aepay-hooks';
import { Button } from '@alifd/next';

export default () => {
  const [list, setList] = useState([
    { name: 'no-check' }
  ]);
  const [isListChange, setListChange] = useState(false);
  
  useEffectCompare((oldDeps) => {
    const isSame = JSON.stringify(oldDeps) === JSON.stringify([list]);
    setListChange(!isSame)
    console.log(isSame, '---useEffectCompare');
  }, [list] as const);

  return (
    <>
      <div className='step-form-box' >
        {list.map(item => <div>{item.name}</div>)}
      </div>
      <div>list { isListChange ? '' : '未'} 改变</div>
      <Button onClick={() =>
        setList(list => [...list])
      }>点击改变list</Button>
    </>
  );
};