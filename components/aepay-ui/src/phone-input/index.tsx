import EyeText from '../eye-text';
import { Input, Select } from '@alifd/next';
import { InputProps } from '@alifd/next/types/input';
import React, { useEffect, useMemo, useState } from 'react';
import type { IBaseComponent } from '../interface';
import PhoneCore from './util';
import { usePropsValue } from '@ali/aepay-hooks';

const SPLIT_CHAR = '-';

export interface IPhoneInputProps extends IBaseComponent, InputProps {
  isPreview?: boolean;
  renderPreview?: (v: string) => React.ReactNode;
  defaultValue?: string;
  value?: string;
  defaultAreaCode?: string;
  onChange?: (v: string) => any;
  splitChar?: string;
  disabled?: boolean;
  showEyeText?: boolean;
  showFormatted?: boolean;
  areaCodes?: string[];
  placeholder?: string;
}

function PhoneInput(props: IPhoneInputProps, ref: any) {
  const {
    value,
    defaultValue,
    defaultAreaCode = '86',
    placeholder,
    onChange,
    state,
    isPreview,
    renderPreview,
    areaCodes: areaCodesList,
    splitChar = SPLIT_CHAR,
    disabled = false,
    showEyeText = true,
    showFormatted = true,
    className = '',
    style,
  } = props;
  const [areaCodes, setAreaCodes] = useState(areaCodesList ? areaCodesList : PhoneCore.getCountryCallingCodes());
  const [areaCode, setAreaCode] = useState(defaultAreaCode);
  const [phone, setPhone] = useState('');
  const asYouType = useMemo(() => PhoneCore.asYouType(areaCode), [areaCode]);
  const phoneStr = useMemo(() => {
    asYouType.reset();
    return asYouType.input(phone);
  }, [phone]);

  const dataSource = useMemo(() => areaCodes.map((n) => ({
    label: PhoneCore.formatCountryCallingCodePrefix(n),
    value: n
  })), [areaCodes]);

  const [displayValue, setValue] = usePropsValue({ value, defaultValue, onChange });

  useEffect(() => {
    if (displayValue) {
      const [_areaCode, _phone] = displayValue.split(splitChar);
      setAreaCode(PhoneCore.getCallingCode(_areaCode));
      setPhone(_phone);
    } else {
      setAreaCode(defaultAreaCode);
      setPhone('');
    }
  }, [displayValue])

  const handleAreaCodeChange = (v: string) => {
    setAreaCode(v);
    setPhone('');
  };

  const handleMobileInputChange = (v: string) => {
    const nextValue = `${areaCode}${splitChar}${v.replace(/\D/g, '') || ''}`;
    setValue?.(nextValue);
  };

  return (
    <div className={className} style={style}>
      <Input
        value={phoneStr}
        ref={ref}
        state={state}
        isPreview={isPreview}
        renderPreview={() => {
          if (typeof renderPreview === 'function') {
            return renderPreview(value);
          }

          return (
            <EyeText
              showAllText={!showEyeText}
              value={showFormatted ? PhoneCore.formatNumber(value, splitChar) : value}
            />
          )
        }}
        addonBefore={
          <Select
            showSearch={!areaCodesList?.length}
            trim
            autoHighlightFirstItem={false}
            filterLocal={false}
            width={90}
            value={areaCode}
            onChange={handleAreaCodeChange}
            dataSource={dataSource}
            onSearch={(v) => {
              const ds = PhoneCore.getCountryCallingCodes(v);
              setAreaCodes(ds);
            }}
            disabled={disabled}
          />
        }
        onChange={handleMobileInputChange}
        showLimitHint
        disabled={disabled}
        trim
        placeholder={placeholder}
      />
    </div>
  );
}

export default React.forwardRef(PhoneInput);

export function isValidPhoneNumber(value: string, splitChar = SPLIT_CHAR) {
  if (typeof value !== 'string') {
    return false;
  }

  const [areaCode, phone] = value.split(splitChar);
  const callingCode = PhoneCore.getCallingCode(areaCode);

  return PhoneCore.isValidPhoneNumber(callingCode, phone);
}
