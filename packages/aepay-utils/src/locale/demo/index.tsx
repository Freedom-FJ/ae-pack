import React from 'react';
import { getLocale } from '@ali/aepay-utils';

const locales = {
  zh_CN: {
    'ekyc.face.title': '人脸认证',
    'ekyc.face.country': '国籍',
    'ekyc.face.certificate': '证件类型',
    'ekyc.face.validDate': '有效期{0}分{1}秒，请在有效期内完成实名认证',
    'ekyc.face.maxSize': '最大不超过 {{maxSize}}，当前图片尺寸 {{currentSize}}',
  },
  en_US: {
    'ekyc.face.title': 'Face Verification',
    'ekyc.face.country': 'Country',
    'ekyc.face.certificate': 'Certificate Type',
    'ekyc.face.validDate': 'Valid Date {0}m {1}s, please complete real name authentication within the valid period',
    'ekyc.face.maxSize': 'Maximum {{maxSize}}, current image size {{currentSize}}',
  },
};

const $i18n = getLocale({
  language: 'zh_CN',
  locales,
  defaultLocale: 'en_US',
});

export default () => {
  return (
    <div>
      <p>{$i18n['ekyc.face.title']}</p>
      <p>{$i18n.get({ id: 'ekyc.face.country' })}</p>
      <p>{$i18n.get('ekyc.face.certificate')}</p>
      <p>{$i18n['ekyc.face.realPersonVerification']}</p>
      <p>{$i18n.get({ id: 'ekyc.face.validDate', placeholderValues: [29, 59] })}</p>
      <p>{$i18n.get({ id: 'ekyc.face.maxSize', placeholderValues: { currentSize: '8MB', maxSize: '10MB' } })}</p>
    </div>
  );
};
