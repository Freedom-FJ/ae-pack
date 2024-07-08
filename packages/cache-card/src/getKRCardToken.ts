import { logger, mtop } from '@ali/aepay-utils';
import { getCardToken } from './getCardToken';
import type { IKRCardParam } from './interface';

const CLIENT_ID = 'kIMJTdfuuWxc5Myk';
const API = 'https://sg-card-wallet.aliexpress.com/api/k01/cacheCard';

let PUBLIC_KEY = '';

// 获取公钥
export const getPublicKey = async () => {
  if (PUBLIC_KEY) {
    return PUBLIC_KEY;
  }

  const res = await mtop({
    url: 'mtop.ae.kr.merchant.onboarding.financial.pk',
    method: 'POST',
  });

  PUBLIC_KEY = res?.data?.data || '';
  return PUBLIC_KEY;
};

export const getKRCardToken = async ({
  accountNo,
  region = 'KR',
  currencies = ['KRW'],
  holderAccountName,
  bankName,
  bankShortName,
  holderAccountType = 'ENTERPRISE',
}: IKRCardParam) => {
  try {
    const publicKey = await getPublicKey();
    const cardToken = await getCardToken({
      accountNo,
      holderAccountName,
      bankName,
      bankShortName,
      region,
      currencies,
      holderAccountType,
      publicKey,
      cacheCardUrl: API,
      clientId: CLIENT_ID,
    });

    return cardToken;
  } catch (error: any) {
    console.error('getCardBinTokenError....', error);
    logger.expose('getCardBinTokenError', { c1: error?.message });
    return null;
  }
};
