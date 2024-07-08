import { usePropsValue } from '@ali/aepay-hooks';
import { Input } from '@alifd/next';
import { InputProps } from '@alifd/next/types/input';
import React, { forwardRef, LegacyRef, useEffect, useMemo, useState } from 'react';

export interface INumberPickerProps extends Omit<InputProps, 'onChange' | 'onBlur'> {
  value: number | string;
  formatInteger: boolean | ((integer: number | string) => string);
  maxDecimalPlaces: number;
  min: number;
  max: number;
  unit?: string;
  width: string;
  onChange: (val?: number | string) => void;
  onInputChange: (val?: number) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur: (val: number | undefined, e?: React.FocusEvent<HTMLInputElement, Element>) => void;
  // 转换器
  transformer?: {
    getValueFormatter: (value: string | number) => string;
    setValueFormatter: (value: number) => string | number;
  };
}

const NumberPicker = forwardRef((props: Partial<INumberPickerProps>, ref: LegacyRef<Input> | undefined) => {
  const {
    style,
    width,
    min,
    max,
    onChange,
    onBlur,
    onFocus,
    onInputChange,
    defaultValue,
    value: _value,
    transformer,
    maxDecimalPlaces = 2,
    formatInteger = false,
    unit = '',
    ...rest
  } = props;
  const [valueState, setValueState] = useState<any>();

  useEffect(() => {
    setValue(formatValue(Number(parseInt(_value)), false));
  }, [_value]);

  const [value, setValue] = usePropsValue<any>({
    value: valueState,
    defaultValue,
    onChange: (v, isBlur) => {
      setValueState(v);

      if (isBlur) {
        onChange?.(unit ? v : Number(v));
      } else {
        onInputChange?.(Number(formatValue(v)));
      }
    },
    transformer: (transformer || !!unit) && {
      getValueFormatter: (v: string) => {
        if (unit) {
          if (!v) return '';
          return typeof v === 'string' ? v.replace(unit, '') : v;
        } else {
          return transformer?.getValueFormatter(v);
        }
      },
      setValueFormatter: (v: any) => {
        if (unit) {
          return v ? `${v}${unit}` : '';
        } else {
          return transformer?.setValueFormatter(v);
        }
      }
    }
  });

  const parseInt = (val: string | number) => {
    let nextValue = `${val ?? ''}`;
    const hasSymbol = nextValue.startsWith('-');
    nextValue = nextValue.replace(/[^0-9.]/g, '');

    if (hasSymbol) {
      nextValue = `-${nextValue}`;
    }

    return nextValue;
  }

  const formatValue = useMemo(() => {
    let format = (v: string) => Number(v).toLocaleString('US');
    if (typeof formatInteger === 'function') {
      format = formatInteger;
    }

    if (formatInteger === false) {
      format = (v: string) => v;
    }

    return (v: number, forceFormat = true) => {
      const val = parseInt(v);
      let [integer, decimal = ''] = val.split('.');
      const decimalStr = maxDecimalPlaces ? `.${decimal}${'0'.repeat(maxDecimalPlaces)}`.slice(0, maxDecimalPlaces + 1) : '';

      if (forceFormat) {
        if (val === '-' || !val) {
          return val || '';
        }

        if (val.indexOf('.') === -1) {
          return format(integer);
        } else {
          return `${format(integer)}${decimal.length > maxDecimalPlaces ? decimalStr : `.${decimal}`}`;
        }
      }

      return `${integer === '-' ? '-0' : (integer || 0)}${decimalStr}`;
    }
  }, [formatInteger]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    let val = value ? Number(value) : undefined;
    if (val) {
      if (min !== undefined && val < min) {
        val = min;
      }

      if (max && val > max) {
        val = max;
      }
    }
    onBlur?.(val, e);
    const newValue = formatValue(val, false);
    setValue(newValue, true);
  };

  const handleChange = (val: string) => {
    let nextValue = parseInt(val);

    if (!nextValue) {
      setValue(undefined);
      return;
    }

    // 小数点位数超出不触发更新
    if (nextValue === valueState || val.split('.')[1]?.length > maxDecimalPlaces) {
      return;
    }

    let num = Number(nextValue);
    if (typeof max === 'number' && num > max) {
      num = max;
      nextValue = max.toString();
    }

    if (value !== num) {
      setValue(nextValue);
    }
  };

  const handleFocus = (e?: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocus?.(e);
  };

  return (
    <Input
      {...rest}
      style={{ width, ...style }}
      value={formatValue(value)}
      type="number"
      ref={ref}
      // onInput={(e: any) => handleChange(e && (e.value || e.target.value))}
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
});


export default NumberPicker;
