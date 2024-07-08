export interface ICardParam {
  publicKey: string; // 公钥
  cacheCardUrl: string; // 缓存卡url
  accountNo: string; // 账号
  region: string; // 地区
  currencies: string[]; // 币种
  holderAccountName: string; // 持卡人姓名
  bankName: string; // 银行名称
  bankShortName?: string; // 银行简称
  clientId: string; // 客户端ID
  holderAccountType?: 'ENTERPRISE' | 'INDIVIDUAL'; // 持卡人类型
}

export interface IKRCardParam extends Omit<ICardParam, 'region' | 'currencies' | 'publicKey' | 'cacheCardUrl' | 'clientId'> {
  region?: string;
  currencies?: string[];
}
