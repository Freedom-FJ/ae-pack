import { IMoneyConfig } from "./interface";

const momenyConfig: Record<string, IMoneyConfig> = {
  BRL: {
    decimal: '.',
    thousand: ',',
    precision: 2,
    symbol: 'R$',
    symbolPosition: 'front',
    symbolSpacing: true,
    currencyCode: 'BRL',
    currencyPosition: 'back',
    currencySpacing: true,
    isFormat: true,
  },
  KRW: {
    decimal: '.',
    thousand: ',',
    precision: 0,
    symbol: '₩',
    symbolPosition: 'front',
    symbolSpacing: false,
    currencyCode: 'KRW',
    currencyPosition: 'back',
    currencySpacing: true,
  },
  USD: {
    decimal: '.',
    thousand: ',',
    precision: 2,
    symbol: '$',
    symbolPosition: 'front',
    symbolSpacing: true,
    currencyCode: 'USD',
    currencyPosition: 'back',
    currencySpacing: true,
  },
  CNY: {
    decimal: '.',
    thousand: ',',
    precision: 2,
    symbol: '¥',
    symbolPosition: 'front',
    symbolSpacing: false,
    currencyCode: 'CNY',
    currencyPosition: 'front',
    currencySpacing: true,
  },
};

export default momenyConfig;
