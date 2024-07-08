import { Icon } from '@alifd/next';
import React, { useState } from 'react';
import { classExprRaw } from '../utils';
import { type IBaseComponent } from '../interface';
import './index.scss';

interface IEyeText extends IBaseComponent {
  value: string;
  showAllText?: boolean;
}

function mask(str: string) {
  const len = str.length;
  let res = '';
  for (let i = 0; i < len; i++) {
    let current = str[i];
    if (len <= 6 && i < len - 2) {
      current = '*';
    }
    if (len > 6 && i > 1 && i < len - 2) {
      current = '*';
    }

    res += current;
  }

  return res;
}

const EyeText = (props: IEyeText) => {
  const { className, style, value = '', showAllText = false } = props;
  const [show, setShow] = useState(false);

  return (
    <div className={`${classExprRaw`eyeText`} ${className}`} style={style}>
      <span>{show || showAllText ? value : mask(value.toString())}</span>
      { !showAllText && <Icon size={18} type={show ? 'eye' : 'eye-close'} onClick={() => setShow((v) => !v)} />}
    </div>
  );
};

export default EyeText;
