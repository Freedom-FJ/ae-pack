import React from 'react';
import { classExprRaw } from '../utils';
import './index.scss';
import { type IBaseComponent } from '../interface';
import { logger } from '@ali/aepay-utils';

export interface RichTextProps extends IBaseComponent {
  /** html富文本 */
  html?: string;
  // a标签点击事件
  onLinkPress?: (url: string) => void;
  'data-log'?: string;
}

const RichText = (props: RichTextProps) => {
  const { style, html = '', className = '', onLinkPress } = props;

  const onPress = (e: any) => {
    const href: string = (e.target.getAttribute('href') || '').replace(/^"/, "").replace(/"$/, "");
    if (e.target.tagName === 'A' && e.target.getAttribute('href')) {
      e.preventDefault();
      e.stopPropagation();

      // 埋点
      logger.click('linkClk', {
        c1: props['data-log'] || e.target.innerText,
        c2: href,
      });

      if (onLinkPress) {
        onLinkPress?.(href);
      } else {
        window.open(href, '_blank');
      }
    }
  };

  if (!html || html.trim() === '') {
    return null;
  }

  return (
    <div
      data-spm-protocol="i" // https://yuque.alibaba-inc.com/tqigeb/gnryrq/mmga5t
      style={style}
      className={`${classExprRaw`richText`} ${className}`}
      dangerouslySetInnerHTML={{ __html: html.replace(/\n/g, '<br/>') }}
      onClick={onPress}
    />
  );
};

export default RichText;
