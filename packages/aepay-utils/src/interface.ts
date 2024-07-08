export type etKey = 'EXP' | 'CLK' | 'SLD' | 'INPUT' | 'SYS' | 'OTHER';
export type IObject<T = any> = Record<string, T>;

export interface Params {
  et?: etKey;
  c1?: any;
  c2?: any;
  c3?: any;
  c4?: any;
  c5?: any;
  c6?: any;
}

declare interface Window {
  sendAESEvent?: (eventId: string, params?: Params) => void;
  ChcRenderCore?: {
    getCountry: () => string;
    getLanguage: () => string;
  };
}
