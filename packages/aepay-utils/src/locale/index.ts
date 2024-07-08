import { getLanguage } from "../cookie";

export type ILanguage = 'zh_CN' | 'en_US';

type Locale<K extends ILanguage, T = any> = {
  [P in K]?: {
    [Q in keyof T]: T[Q] | string;
  };
};

export type PartialWithGet<T> = Partial<T> & {
  get: (param: keyof T | { id: keyof T; dm?: string; placeholderValues?: any[] | Record<string, any> }) => string;
};

export interface ILocaleOption<T> {
  language?: ILanguage;
  locales: Locale<ILanguage, T>;
  defaultLocale?: ILanguage;
  mdsKey?: string;
  alias?: Record<string, string>;
  mdsLangs?: any;
}


export function getLocale<T>({
  locales,
  defaultLocale = 'zh_CN',
  language,
  mdsLangs,
  alias = {},
}: ILocaleOption<T>): PartialWithGet<T> {
  const aliasKeys = Object.keys(alias);
  const _lang: ILanguage = language || getLanguage() || defaultLocale;
  const _$i18n = <PartialWithGet<T>>{
    get(param) {
      let id: string, dm, placeholderValues: any;
      if (typeof param !== 'object') {
        id = param as string;
        dm = (locales[defaultLocale] as any)[param];
      } else {
        id = param.id as string;
        dm = param.dm || (locales[defaultLocale] as any)[id];
        placeholderValues = param.placeholderValues;
      }

      const aliasKey = aliasKeys.find(key => id && id.startsWith(`${key}.`));
      let aliasId = id;
      if (aliasKey) {
        aliasId = id.replace(aliasKey, alias[aliasKey]);
      }

      const langs = {
        ...locales[_lang],
        ...mdsLangs,
      };

      if (location.search.indexOf('_language=mds_key') >= 0) {
        return aliasId;
      } else {
        if (placeholderValues && typeof placeholderValues === 'object') {
          return (langs[aliasId] || langs[id] || dm || '').replace(/\{{1,2}(\w+)\}{1,2}/g, (match: string, index: number) => {
            return placeholderValues[index] || match;
          });
        }

        return langs[aliasId] || langs[id] || dm;
      }
    },
  };

  const proxyObj = new Proxy(_$i18n, {
    get(obj, prop) {
      if (prop === 'get') {
        return obj[prop];
      } else {
        return obj.get({ id: prop as keyof T });
      }
    },
  });

  return proxyObj;
}
