import React from 'react';
import type { IBaseComponent } from '../interface';
import { Icon, Message } from '@alifd/next';
import { classExprRaw } from '../utils';
import type { IconProps } from '@alifd/next/types/icon';
import './index.scss';
import useLocale from '../locale';

interface ICopyTextProps extends IBaseComponent {
  iconProps?: IconProps; // 拷贝图标的 props
  children?: React.ReactNode; // 按钮展示的文本
  onCopy?: (e: any) => void; // 拷贝成功之后的回调
  text?: any; // 需要被拷贝的文本
  successMessage?: string | React.ReactElement; // 拷贝成功后的提示文本
  ellipsis?: boolean;
  /**
 * 文字前附加内容
 */
  innerBefore?: React.ReactNode;
}

function copyToClipboard(str: string) {
  const el = document.createElement('textarea');
  el.innerText = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  el.remove();
}

function CopyText(props: ICopyTextProps) {
  const $i18n = useLocale();

  const {
    style,
    ellipsis,
    children,
    innerBefore,
    iconProps = {},
    className = '',
    successMessage = $i18n['aepayui.CopyText.CopySuccess']
  } = props;

  const ref = React.useRef<HTMLSpanElement>(null);
  const handleCopy = (e: any) => {
    props.onCopy?.(e);
    return new Promise((res) => {
      try {
        copyToClipboard(props.text || ref.current?.innerText);
        Message.success({
          content: successMessage,
        });
        res(null);
      } catch (e) {
        res(null);
        Message.error((e as any).message);
      }
    });
  };

  return (
    <span
      ref={ref}
      className={`${classExprRaw`copy-text`} ${className}`}
      style={style}
      onClick={handleCopy}
    >
      <div className={classExprRaw`copy-text-val ${ellipsis ? 'copy-text-ellipsis' : ''}`}>
        {innerBefore}{children || props.text}
      </div>
      <Icon type="copy" className={classExprRaw`copy-text-icon`} {...iconProps} />
    </span>
  );
}

export default CopyText;
