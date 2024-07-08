import React from 'react';
import { Input } from '@alifd/next';
import type { InputProps } from '@alifd/next/types/input';
import { IBaseComponent } from '../interface';
import { classExprRaw } from '../utils';
import { usePropsValue } from '@ali/aepay-hooks';
import useLocale from '../locale';
import './index.scss';
import CardHelper from './util';
import EyeText from '../eye-text';
import CardLogo from '@ali/fc-design-card-logo';
import defaultCardBrandList from './logo';

interface CreditCardItem {
  icon: string;
  name: string;
}

export interface ICardNumInputProps extends IBaseComponent, InputProps {
  showEyeText?: boolean;
  showFormatted?: boolean;
  showCardLogo?: boolean;
  cardBrandList?: CreditCardItem[];
  renderPreview?: (value: string) => React.ReactNode;
}

const CardNumInput = ({
  placeholder,
  style,
  isPreview,
  value,
  defaultValue,
  onChange,
  renderPreview,
  showFormatted = true,
  showEyeText = true,
  cardBrandList = defaultCardBrandList,
  showCardLogo = true,
  className = '',
}: ICardNumInputProps, ref: any) => {
  const $i18n = useLocale();
  console.log(value, defaultValue, 'value');
  const [cardNo, setCardNo] = usePropsValue<any>({
    value: value,
    defaultValue: defaultValue,
    onChange,
  });

  const handleChange = (v: string) => {
    setCardNo(CardHelper.cardNumFormat(v));
  };

  return (
    <Input
      ref={ref}
      style={style}
      className={`${classExprRaw`card-num-input`} ${className}`}
      value={CardHelper.cardNumFormat(cardNo)}
      onChange={handleChange}
      placeholder={placeholder || $i18n['aepayui.CardNumInput.Placeholder']}
      isPreview={isPreview}
      innerAfter={showCardLogo && (
        <CardLogo
          cardBrand={CardHelper.getBrand(cardNo || '').toUpperCase()}
          cardBrandList={cardBrandList}
          style={{ marginRight: 6 }}
        />
      )}
      renderPreview={(v: any) => {
        if (typeof renderPreview === 'function') {
          return renderPreview(cardNo);
        }

        return <EyeText showAllText={!showEyeText} value={showFormatted ? CardHelper.cardNumFormat(cardNo) : cardNo} />;
      }}
    />
  );
};

export default React.forwardRef(CardNumInput);

// 是否是合法卡号
export function isValidCardNo(value: string) {
  if (typeof value !== 'string') {
    return false;
  }

  const cardNo = (value || '').replace(/\s/g, '');
  if (cardNo.length < 10 || cardNo.length > 19 || !CardHelper.cardNumberValidate(cardNo)) {
    return false;
  } else {
    return true;
  }
}

export { CardHelper };