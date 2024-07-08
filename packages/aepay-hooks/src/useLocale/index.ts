import { useState, useEffect } from "react";
import { loadScript, getLocale, getLanguage } from '@ali/aepay-utils';
import type { ILanguage, ILocaleOption, PartialWithGet } from '@ali/aepay-utils';

// https://lang.alicdn.com/daily/aepay-risk-app/0.0.1/aepay-risk-app_Frontside.json
// https://lang.alicdn.com/mcms/aepay-risk-app/0.0.1/aepay-risk-app_Frontside.json

type IMdsConfig = {
  appName: string;
  version: string;
  label: string;
  daily?: boolean;
}

async function getMdsLangs(mdsConfig?: IMdsConfig, language?: ILanguage) {
  if (mdsConfig) {
    const { appName, version, label, daily = false } = mdsConfig;
    const _language = language ? '_' + language.toLowerCase().replace('_', '-') : '_zh-cn';
    const _label = label ? `_${label}` : '';
    const mds_key = `${appName}${_label}${_language}`;

    if (appName && version && !(window as any)[mds_key]) {
      const link = `https://lang.alicdn.com/${daily ? 'daily' : 'mcms'}/${appName}/${version}/${mds_key}.json`;
      try {
        const res = await loadScript(link);
        return (window as any)[mds_key] || res || {};
      } catch (error) {
        return {};
      }
    }

    return (window as any)[mds_key] || {};
  }

  return {};
}

// 异步获取
export function useLocale<T>({ mdsConfig, ...params }: ILocaleOption<T> & { mdsConfig: IMdsConfig }) {
  const [$i18n, setI18n] = useState<PartialWithGet<T>>(getLocale(params));
  
  useEffect(() => {
    (async () => {
      const _lang: ILanguage = params.language || getLanguage() || params.defaultLocale;
      const mdsLangs = await getMdsLangs(mdsConfig, _lang);
      const i18n = await getLocale({ ...params, mdsLangs });
      setI18n(i18n);
    })();
  }, []);

  return $i18n;
}

export type { PartialWithGet };