import { getLocale, getLanguage } from '@ali/aepay-utils';

const locales = {
  zh_CN: {
    'aepay.base.system.error': '系统异常',
  },
  en_US: {
   'aepay.base.system.error': 'System exception'
  },
  ko_KR: {
    'aepay.base.system.error': '시스템 예외'
  },
  pt_BR: {
    'aepay.base.system.error': 'Exceção do sistema'
  }
};

const $i18n = getLocale({
  language: getLanguage() || 'zh_CN',
  locales,
  defaultLocale: 'en_US',
});

export default $i18n;