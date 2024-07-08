import React, { useRef } from 'react';
import { Input, Button } from '@alifd/next';
import { useEventDelegation } from '@ali/aepay-hooks';

export default () => {
  const divRef = useRef<HTMLDivElement>(null);

  const run = (e: any) => {
    console.log(e, 'input....');
  }

  const { destroy, isDestroy } = useEventDelegation(run, {
    ref: divRef,
    matches: '.step-form-box input,.step-form-box textArea',
    event: 'input',
  });

  const onCheck = () => {
    destroy?.()
  };



  return (
    <div className='step-form-box' ref={divRef}>
      <h3>状态：{isDestroy ? '已销毁' : '正常'}</h3>
      <div>
        基本输入框：<Input></Input>
      </div>
      <div>
        文案输入框：<Input.TextArea></Input.TextArea>
      </div>
      <Button onClick={onCheck}>销毁</Button>
    </div>
  );
};