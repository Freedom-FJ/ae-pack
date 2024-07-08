import React, { useRef } from 'react';
import { Input } from '@alifd/next';
import { useEventDelegation } from '@ali/aepay-hooks';

export default () => {
  const divRef = useRef<HTMLDivElement>(null);

  const run = (e: any) => {
    console.log(e, 'blur....');
  }

  useEventDelegation(run, {
    ref: divRef,
    matches:
      '.step-form-box input,!.step-form-box .not-event-delegation input',
    event: 'blur',
    addEventListenerOptions: true, // blur事件只能在捕获阶段委托，因为其没有冒泡事件
  });

  return (
    <div className='step-form-box' ref={divRef}>
      可以被事件委托监听到的输入框：<Input></Input>
      <br />
      <br />
      无法被事件委托监听到的输入框：<Input className='not-event-delegation'></Input>
    </div>
  );
};