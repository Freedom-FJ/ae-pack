/*
 * @Author: mjh
 * @Date: 2024-05-08 11:05:44
 * @LastEditors: mjh
 * @LastEditTime: 2024-05-24 14:33:00
 * @Description:
 */
import { Icon } from '@alifd/next';
import React, { useEffect, useRef, useState } from 'react';
import { classExprRaw } from '../utils';
import className from 'classnames';
import useLocale from '../locale';
import './index.scss';
export interface CoverTextProps {
  children: React.ReactNode;
  height?: number | string;
  value?: boolean;
  showBtn?: boolean;
  closeText?: string;
  openText?: string;
  onChange?: (value: boolean) => void;
}
const preName = (name?: string) => classExprRaw`${`cover-text-${name}`}`;
export default function CoverText(props: CoverTextProps) {
  const $i18n = useLocale();
  const {
    children,
    height = 20,
    showBtn = true,
    value,
    closeText = $i18n['aepayui.CoverText.closeText'],
    openText = $i18n['aepayui.CoverText.openText'],
    onChange } = props;
  const [isLaunch, setLaunch] = useState(!!value);
  const [isLaunchText, setLaunchText] = useState(!!value);
  const [maxHeight, setMaxHeight] = useState(0);
  const hiddenBodyRef = useRef<HTMLDivElement>(null);
  const checkBtn = () => {
    setLaunch((pre) => !pre);
    onChange?.(!isLaunch);
    setTimeout(() => {
      setLaunchText((pre) => !pre);
    }, 500);
  };

  useEffect(() => {
    setLaunch(value);
  }, [value]);

  useEffect(() => {
    setMaxHeight(hiddenBodyRef.current?.scrollHeight ?? 200);
  }, [children]);

  const iconClass = className(preName('rolling-arrow'), {
    [preName('rolling-arrow-down')]: isLaunch,
  });

  return (
    <div className={preName()}>
      <div className={preName('box')} ref={hiddenBodyRef} style={{ maxHeight: isLaunch ? maxHeight : height }}>
        {children}
      </div>
      {showBtn && (
        <div className={preName('check')} onClick={checkBtn}>
          {isLaunchText ? openText : closeText}
          <Icon className={iconClass} type="arrow-down" />
        </div>
      )}
    </div>
  );
}
