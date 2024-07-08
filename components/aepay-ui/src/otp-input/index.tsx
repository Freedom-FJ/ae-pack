import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { IBaseComponent } from '../interface';
import { Input } from '@alifd/next';
import { classExprRaw } from '../utils';
import './index.scss';

enum EnumKeyBoard {
  Backspace = 'Backspace',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
}

export interface IOtpInputProps extends IBaseComponent {
  isPreview?: boolean;
  defaultValue?: string;
  value?: string;
  length: number;
  onChange: (value: string) => void;
  onItemKeyDown?: (event: React.KeyboardEvent<Element>, index: number) => void;
  state?: any;
  otpRef?: React.Ref<any>;
  disabled?: boolean;
}

function OtpInput(props: IOtpInputProps, ref: any) {
  const {
    isPreview,
    value,
    disabled,
    style,
    otpRef,
    onChange,
    state,
    onItemKeyDown,
    length = 6,
    defaultValue = '',
    className = '',
  } = props;
  const inputRef = useRef([]);
  // 这里没直接用ref是为了避免嵌入form中ref报错
  const containerRef = otpRef || useRef<any>();
  const cursorRef = useRef<number>(0);
  const [valueList, setValueList] = useState([]);

  useEffect(() => {
    const v = value !== undefined ? value : defaultValue;
    if (v) {
      const list = v.split('').map(item => parseInt(item));
      setValueList(list);
    }
  }, [value, defaultValue]);

  useEffect(() => {
    const newValue = valueList.filter(Boolean).length === length ? valueList.join('') : '';
    if ((value || '') !== newValue) {
      onChange(newValue);
    }
  }, [value, defaultValue, valueList, length]);

  useImperativeHandle(containerRef, () => {
    return {
      focus: (index: number) => {
        onFocus(index);
      },
      reset: () => {
        setValueList([]);
      }
    }
  }, []);

  const onItemChange = (value: string, index: number) => {
    if (/^\d+$/.test(value)) {
      onFocus(index + 1);
      let list: any[] = [...valueList];
      list[index] = value.slice(-1);
      setValueList(list);
    }
  }

  const onkeyDown = (e: React.KeyboardEvent<Element>, index: number) => {
    const keyCode = e.code;
    if (keyCode === EnumKeyBoard.Backspace) {
      // 如果光标与当前距离小于等于1，则光标前移
      if (Math.abs(cursorRef.current - index) <= 1) {
        onFocus(index - 1);
      }

      valueList[index] = undefined;
      setValueList([...valueList]);
    } else if (keyCode === EnumKeyBoard.ArrowLeft && index > 0) {
      onFocus(index - 1);
    } else if (keyCode === EnumKeyBoard.ArrowRight && index < length - 1) {
      onFocus(index + 1);
    }

    onItemKeyDown?.(e, index);
  }

  const onFocus = (index: number) => {
    cursorRef.current = index;
    const curInput = inputRef.current[index];
    if (curInput) {
      if (valueList[index]) {
        setTimeout(() => {
          curInput.focus(0, 1);
        }, 0);
      } else {
        curInput.focus();
      }
    }
  }

  return (
    <div className={`${classExprRaw`otp-input`} ${className}`} style={style} ref={ref}>
      {
        Array(length).fill('').map((_, index) => (
          <Input
            ref={ref => inputRef.current[index] = ref}
            className={classExprRaw`otp-input-item`}
            type="number"
            key={index}
            state={state}
            // maxLength={1}
            isPreview={isPreview}
            disabled={disabled}
            value={valueList[index] ? valueList[index].toString() : ''}
            min={0}
            max={9}
            onChange={(v) => onItemChange(v, index)}
            onKeyDown={(e) => onkeyDown(e, index)}
            onFocus={() => onFocus(index)}
            style={index === length - 1 ? { marginRight: 0 } : {}}
          />
        ))
      }
    </div>
  );
}

export default React.forwardRef(OtpInput);
