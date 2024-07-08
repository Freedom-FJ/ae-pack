import React, { useState } from 'react';
import type { IBaseComponent } from '../interface';
import { MenuButton, Icon } from '@alifd/next';
import Button, { IButton } from '../button';
import './index.scss';
import { classExprRaw } from '../utils';

export interface IButtonItem extends Omit<IButton, 'hidden'>, Record<string, any> {
  btnText?: string;
  icon?: string;
  onClick?: any;
  render?: (...args: any[]) => React.ReactElement;
  hidden?: (data?: any) => boolean;
}

interface IButtonGroupProps extends IBaseComponent {
  actions: IButtonItem[];
  data?: any;
  text?: boolean;
  size?: 'small' | 'medium' | 'large'; // 按钮的尺寸
  maxCount?: number; // 最大容许按钮数
  maxHideStart?: 'left' | 'right' | 'l' | 'r'; // 超出隐藏方向
  moreBtnType?: 'primary' | 'secondary' | 'normal';
  moreBtnText?: string;
  moreBtnPopupClassName?: string;
  moreBtnStyle?: React.CSSProperties;
}

function ButtonGroup(props: IButtonGroupProps) {
  const {
    actions,
    maxCount,
    data,
    text,
    size,
    style,
    moreBtnStyle,
    className = '',
    maxHideStart = 'right',
    moreBtnType = 'primary',
    moreBtnText = '更多',
    moreBtnPopupClassName = '',
  } = props;

  const [loading, setLoading] = useState(false);

  const handleClick = (btn: IButtonItem) => {
    if (btn.onClick) {
      const res = btn.onClick();

      if (res && res.then) {
        setLoading(true);
        res.then().finally(() => {
          setLoading(false);
        });
      }
    }
  };

  const btns = actions
    ?.filter(({ hidden }: any) => {
      if (hidden === true || (typeof hidden === 'function' && hidden(data))) {
        return false;
      }

      return true;
    })
    .map((btnProps, index) => {
      const { btnText, icon, hidden, render, onClick, ...restActionProps } = btnProps;

      if (typeof render === 'function') {
        return <React.Fragment key={index}>{render(data)}</React.Fragment>;
      }

      return (
        <Button
          key={index}
          text={text}
          size={size}
          autoLoading
          onClick={() => onClick?.(data)}
          data-btn-text={btnText}
          {...restActionProps}
        >
          {icon && <Icon type={icon} />} {btnText}
        </Button>
      );
    });

  if (!btns || btns.length === 0) {
    return null;
  }

  const len = btns.length;
  const isLeft = !['right', 'r'].some((val) => val === maxHideStart);
  const shouldHide = maxCount > -1 && maxCount < len;
  let moreBtn: React.ReactNode;

  // 截断
  if (shouldHide) {
    const cutCount = len - maxCount;
    const arr = isLeft ? btns.splice(0, cutCount) : btns.splice(maxCount);
    moreBtn = (
      <MenuButton
        key='more'
        label={moreBtnText}
        text={text}
        size={size}
        type={moreBtnType}
        loading={loading}
        style={moreBtnStyle}
        popupClassName={`${classExprRaw`button-group-more-popup`} ${moreBtnPopupClassName}`}
      >
        {arr.map((iBtn: { props: IButtonItem }, i) => {
          return (
            <MenuButton.Item
              key={i}
              title={iBtn.props['data-btn-text']}
              onClick={() => handleClick(iBtn.props)}
              disabled={iBtn.props.disabled}
            >
              {iBtn.props.children}
            </MenuButton.Item>
          );
        })}
      </MenuButton>
    );

    isLeft ? btns.unshift(moreBtn) : btns.push(moreBtn);
  }

  return (
    <div className={`${classExprRaw`button-group`} ${className}`} style={style}>
      {btns}
    </div>
  );
}

export default ButtonGroup;
