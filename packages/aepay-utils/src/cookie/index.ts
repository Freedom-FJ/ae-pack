import Cookies from 'js-cookie';

// @ts-ignore
const ChcRenderCore = window.ChcRenderCore;

/**
 * 获取cookie值
 * @param key 
 * @returns 
 */
export function getCookie(key: string) {
  return Cookies.get(key) || '';
}

/**
 * 设置cookie值
 * @param key 
 * @returns 
 */
export function setCookie(key: string, value: string) {
  return Cookies.set(key, value);
}

/**
 * 获取卖家ID
 */
export function getSellerId() {
  return getCookie('gmp_sid') || '';
}

/**
 * 获取当前国家
 */
export function getCountryCode() {
  if (ChcRenderCore && typeof ChcRenderCore.getCountry === 'function') {
    const country = ChcRenderCore.getCountry();
    if (country) {
      return country;
    }
  }

  return getCookie('_country') || '';
}

/**
 * 获取当前语言
 */
export function getLanguage() {
  if (ChcRenderCore && typeof ChcRenderCore.getLanguage === 'function') {
    return ChcRenderCore.getLanguage();
  }

  return getCookie('_lang') || getCookie('intl_locale') || '';
}

/**
 * 设置语言
 * @param language
 * @returns
 */
export function setLanguage(language: string) {
  return setCookie('_lang', language);
}
