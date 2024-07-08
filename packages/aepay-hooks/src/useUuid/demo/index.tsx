import React from 'react';
import { Button } from '@alifd/next';
import { useUuid } from '@ali/aepay-hooks';

export default () => {
  const [uuidList, { add, remove, clear }] = useUuid({ init: true })

  return (
    <div className='step-form-box' >
      <Button onClick={add} >添加一个id</Button>
      <Button onClick={() => uuidList.length && remove(uuidList.length - 1)} >删除最后一个id</Button>
      <Button onClick={clear} >清空id</Button>
      <br />
      {uuidList.map((item, index) => <div>{index + 1}、{item}</div>)}
    </div>
  );
};