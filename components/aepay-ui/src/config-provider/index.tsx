import React from 'react';

export type DirectionType = 'ltr' | 'rtl' | undefined;

export interface Locale {
  locale: string;
}

export interface ConfigConsumerProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  rootPrefixCls?: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  locale?: Locale;
  direction?: DirectionType;
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return suffixCls ? `aep-${suffixCls}` : 'aep';
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
});

export const ConfigProvider = ({ children, direction, locale }: any) => {
  return (
    <ConfigContext.Provider value={{ locale, direction, getPrefixCls: defaultGetPrefixCls }}>
      {children}
    </ConfigContext.Provider>
  );
};