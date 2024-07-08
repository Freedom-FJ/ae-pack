import React, { useMemo } from 'react';
import { classExprRaw } from '../utils';
import momenyConfig from './config';
import './index.scss';
import { IBaseComponent } from '../interface';
// import { getLanguage } from '@ali/aepay-utils';

export type IAmountValue = {
  amount: string;
  formatAmount: string;
  currency: string;
  currencyCode?: string;
  desc?: string;
  tips?: string;
};

export interface IMoneyValue extends IBaseComponent {
  value?: number | string | IAmountValue;
  defaultValue?: string;
  showFormatAmount?: boolean;
  showAmountType?: 'currencyValue' | 'symbolValue' | 'value';
  currencyPosition?: 'front' | 'back';
  currencyClassName?: string;
  currencyStyle?: React.CSSProperties;
  symbolClassName?: string;
  symbolStyle?: React.CSSProperties;
}

/**
 * 金额格式化
 */
export function formatAmount(value: number | string, format: (num: number) => string): string {
  if (typeof value === 'number') {
    return format(value);
  }

  if (typeof value === 'string' && !Number.isNaN(Number(value))) {
    return format(Number(value));
  }

  return value.toString();
}

function MoneyValue({
  value,
  defaultValue = '',
  showFormatAmount = true,
  currencyPosition: position,
  showAmountType = 'value',
  className = '',
  currencyClassName = '',
  symbolClassName = '',
  style,
  currencyStyle,
  symbolStyle
}: IMoneyValue) {
  const currency = typeof value === 'object' ? value.currency || value.currencyCode : '';
  const {
    symbol,
    currencyPosition: _currencyPosition = 'back',
    symbolPosition = 'front',
    symbolSpacing = true,
    currencySpacing = true,
    thousand = ',',
    precision = 2,
  } = momenyConfig[currency] || {};

  const currencyPosition = position || _currencyPosition;
  // if (!momenyConfig[currency] && typeof value === 'object' && !Number.isNaN(Number(value.amount))) {
  //   const lang = getLanguage().replace('_', '-');
  //   return new Intl.NumberFormat(lang, {
  //     style: "currency",
  //     currency,
  //     currencyDisplay: showAmountType === 'currencyValue' ? "code" : "symbol"
  //   }).format(Number(value.amount));
  // }

  const format = (num: number) => {
    const str = num.toFixed(precision);
    let decimal = '';
    if (str.includes('.')) {
      decimal = '.' + str.split('.')[1];
    }
    const integer = str.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
    return integer + decimal;
  };

  const valueStr = useMemo(() => {
    if (value === undefined) {
      return defaultValue;
    } else if (typeof value === 'number' || typeof value === 'string') {
      return formatAmount(value || 0, format);
    } else if (value && typeof value === 'object' && 'amount' in value) {
      return showFormatAmount && 'formatAmount' in value ? value.formatAmount : formatAmount(value.amount || 0, format);
    } else {
      return value;
    }
  }, [value, defaultValue, precision, showFormatAmount]);

  return (
    <span className={`${classExprRaw`money-value`} ${className}`} style={style}>
      {!!currency && showAmountType === 'symbolValue' && symbolPosition === 'front' && (
        <span style={symbolStyle} className={`${symbolClassName} ${symbolSpacing ? 'mr1' : ''}`}>{symbol}</span>
      )}
      {!!currency && showAmountType === 'currencyValue' && currencyPosition === 'front' && (
        <span style={currencyStyle} className={`${currencyClassName} ${currencySpacing ? 'mr1' : ''}`}>{currency}</span>
      )}
      <span>{valueStr?.toString()}</span>
      {!!currency && showAmountType === 'symbolValue' && symbolPosition === 'back' && (
        <span style={symbolStyle} className={`${symbolClassName} ${symbolSpacing ? 'ml1' : ''}`}>{symbol}</span>
      )}
      {!!currency && showAmountType === 'currencyValue' && currencyPosition === 'back' && (
        <span style={currencyStyle} className={`${currencyClassName} ${currencySpacing ? 'ml1' : ''}`}>{currency}</span>
      )}
    </span>
  );
}

export default React.memo(MoneyValue);
