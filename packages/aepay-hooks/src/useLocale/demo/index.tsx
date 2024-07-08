import React from 'react';
import { useLocale } from '@ali/aepay-hooks';

const locales = {
  zh_CN: {
    'ekyc.face.title': '人脸认证',
    'ekyc.face.maxSize': '最大不超过 {{maxSize}}，当前图片尺寸 {{currentSize}}',
  },
};


export default () => {
  const $i18n = useLocale({
    language: 'en_US',
    locales,
    defaultLocale: 'zh_CN',
    mdsConfig: {
      appName: 'aepay-risk-app',
      version: '0.0.1',
      label: 'Frontside',
    }
  });

  return (
    <div>
      <p>{$i18n['ekyc.face.title']}</p>
      <p>{$i18n.get('ekyc.face.h5.face.title')}</p>
      <p>{$i18n.get({ id: 'ekyc.face.authInfo', placeholderValues: [4]})}</p>
      <p>{$i18n.get({ id: 'ekyc.face.maxSize', placeholderValues: { currentSize: '8MB', maxSize: '10MB' } })}</p>
    </div>
  );
};
