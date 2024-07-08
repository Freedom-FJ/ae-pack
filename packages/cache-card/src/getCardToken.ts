import { encryptForCard } from './encrypt';
import { logger } from '@ali/aepay-utils';
import type { ICardParam } from './interface';

/**
 * cacheCard 接口：https://aliyuque.antfin.com/global.finnet/kv3sfm/vbce2l3mlo03ypsa
 */
export const getCardToken = async ({
  accountNo,
  region,
  currencies,
  holderAccountName,
  bankName,
  bankShortName,
  holderAccountType = 'ENTERPRISE',
  publicKey,
  cacheCardUrl,
  clientId
}: ICardParam) => {
  try {
    if (!publicKey || !cacheCardUrl || !clientId) {
      throw new Error('params is villegal');
    }

    const payload: any = {
      userId: undefined,
      paymentMethodDetail: {
        paymentMethodDetailType: 'BANK_ACCOUNT',
        bankAccount: {
          region,
          currencies,
          holderAccountName: {
            fullName: holderAccountName,
          },
          accountNo,
          bankName,
          bankShortName,
          holderAccountType,
        },
      },
    };

    const { key, body } = await encryptForCard(publicKey, JSON.stringify(payload));
    const cacheCardData: any = await fetch(cacheCardUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'client-Id': clientId,
        Signature: 'algorithm=RSA256, keyVersion=2, signature=testing_signature',
        'cache-control': 'no-cache',
        encrypt: `algorithm=RSA_AES,keyVersion=1,symmetricKey=${key}`,
      },
      body,
    }).then((res) => res.json());

    const cardToken = cacheCardData?.paymentMethodDetail?.bankAccount?.accountToken;
    return cardToken;
  } catch (error: any) {
    console.error('getCardBinTokenError....', error);
    logger.expose('getCardBinTokenError', { c1: error?.message });
    return null;
  }
};
