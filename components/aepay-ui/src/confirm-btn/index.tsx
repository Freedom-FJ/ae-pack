import { Balloon, Button } from '@alifd/next';
import type { BalloonProps } from '@alifd/next/types/balloon';
import type { ButtonProps } from '@alifd/next/types/button';
import React, { cloneElement, forwardRef, useEffect, useState } from 'react';
import { classExprRaw } from '../utils';
import useLocale from '../locale';
import './index.scss';

export interface ConfirmBtnProps extends BalloonProps {
  btnProps?: ButtonProps;
  submitBtnProps?: ButtonProps;
  cancelBtnProps?: ButtonProps;
  btnText?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  content?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  onVisibleChange?: (v: boolean) => void;
}

const ConfirmBtn = forwardRef((props: ConfirmBtnProps, ref: React.LegacyRef<Balloon>) => {
  const $i18n = useLocale();
  const {
    children,
    className,
    style,
    onConfirm,
    onCancel,
    onClose,
    onVisibleChange,
    visible,
    loading,
    title = $i18n['aepayui.ConfirmBtn.Title'],
    align = 'tr',
    btnProps = {},
    submitBtnProps = {},
    cancelBtnProps = {},
    content,
    btnText = $i18n['aepayui.ConfirmBtn.BtnText'],
    confirmText,
    cancelText = $i18n['aepayui.ConfirmBtn.Cancel'],
    ...rest
  } = props;
  const [confirmation, setConfirmation] = useState(visible);
  const Controlled = typeof visible === 'boolean';

  useEffect(() => {
    Controlled && setConfirmation(visible);
  }, [visible]);
  const changeVisible = () => {
    if (Controlled) return;
    setConfirmation(true);
    onVisibleChange?.(true);
  };

  const childClick = children?.props.onClick;
  const cloneElementClick = (...arg: any) => {
    if (childClick) childClick(...arg);
    changeVisible();
  };

  const currCancel = () => {
    if (onCancel) onCancel();
    if (Controlled) return;
    setConfirmation(false);
    onVisibleChange?.(false);
  };

  const currConfirm = () => {
    if (onConfirm) onConfirm();
    if (Controlled) return;
    setConfirmation(false);
    onVisibleChange?.(false);
  };

  const currClose = () => {
    if (onClose) onClose();
    if (Controlled) return;
    setConfirmation(false);
    onVisibleChange?.(false);
  };

  return (
    <Balloon
      v2
      {...rest}
      autoAdjust
      onClose={currClose}
      className={`${classExprRaw`confirm-btn`} ${className}`}
      style={style}
      ref={ref}
      visible={confirmation}
      title={title}
      align={align}
      trigger={
        children ? (
          cloneElement(children, { onClick: cloneElementClick })
        ) : (
          <Button type="primary" size="large" loading={loading} {...btnProps} onClick={changeVisible}>
            {btnText}
          </Button>
        )
      }
    >
      <div>
        <div className={classExprRaw`confirm-btn-content-text`}>{content}</div>
        <div className={classExprRaw`confirm-btn-btn-box`}>
          <Button onClick={currCancel} {...cancelBtnProps}>{cancelText}</Button>
          <Button type="primary" onClick={currConfirm} {...submitBtnProps}>
            {confirmText || btnText || $i18n['aepayui.ConfirmBtn.OK']}
          </Button>
        </div>
      </div>
    </Balloon>
  );
});
export default ConfirmBtn;
