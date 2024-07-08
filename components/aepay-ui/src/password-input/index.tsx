import { Icon, Input } from '@alifd/next';
import { InputProps } from '@alifd/next/types/input';
import React, { forwardRef, useMemo, useState } from 'react';
import { classExpr } from '../utils';
// 此组建用于防止处罚浏览器的自动填入密码和跳出保存密码，使用text模拟的password组建
export interface PasswordInputProps extends InputProps {
  onChange?: (v: string) => void;
  showToggle?: boolean;
}

export default forwardRef((props: PasswordInputProps, ref: React.LegacyRef<Input>) => {
  const { showToggle = true } = props;
  const [inputValue, setInputValue] = useState('');
  const [rememberValue, setRememberValue] = useState('');
  const [eyesClose, setEyes] = useState(true);
  const inputData = (elValue: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = elValue.target;
    if (!eyesClose) {
      setRememberValue(value);
      setInputValue(value);
      props.onInput && props.onInput(elValue);
      return;
    }
    const newStr = value.replace(/•/g, '');
    const valueLen = value.length;
    const curRemember = newStr ? rememberValue + newStr : rememberValue.slice(0, valueLen - 1);
    setRememberValue(curRemember);
    const showValue = ''.padEnd(valueLen, '•');
    setInputValue(showValue);
    elValue.target.value = curRemember;
    props.onInput && props.onInput(elValue);
  };

  const passChange = (elValue: string) => {
    props?.onChange && props.onChange(elValue);
  };

  const afterIcon = useMemo(() => {
    return (
      showToggle && (
        <Icon
          type={eyesClose ? 'eye-close' : 'eye'}
          size={props.size}
          onClick={() => {
            setInputValue(eyesClose ? rememberValue : ''.padEnd(rememberValue.length, '•'));
            setEyes(!eyesClose);
          }}
          style={{ marginRight: 8 }}
        />
      )
    );
  }, [eyesClose, rememberValue, showToggle, props.size]);

  return (
    <Input
      {...props}
      ref={ref}
      value={inputValue}
      type="text"
      className={`${classExpr}password-input`}
      onInput={inputData}
      onChange={passChange}
      style={{ position: 'relative', ...props.style }}
      innerAfter={afterIcon}
    />
  );
});
