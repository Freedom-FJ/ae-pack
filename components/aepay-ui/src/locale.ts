import { useLocale as getLocale } from '@ali/aepay-hooks';
import { getLanguage } from '@ali/aepay-utils';
import locales from './i18n.json';

const useLocale = () => {
  return getLocale({
    language: getLanguage(),
    locales: {
      zh_CN: locales,
    },
    defaultLocale: 'zh_CN',
    mdsConfig: {
      appName: 'AEPAY_MERCHANT_WALLET',
      version: '0.0.4',
      label: 'aepayui',
    },
  });
};

export default useLocale;