type IMoneyPosition = 'front' | 'back';

export interface IMoneyConfig {
  decimal: string;
  thousand: string;
  precision: number;
  symbol: string;
  symbolPosition: IMoneyPosition;
  symbolSpacing: boolean;
  currencyCode: string;
  currencyPosition: IMoneyPosition;
  currencySpacing: boolean;
  isFormat?: boolean;
}
