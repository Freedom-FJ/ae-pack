import { useEventLoading } from '@ali/aepay-hooks';
import { logger } from '@ali/aepay-utils';
import { Button as OriginButton } from '@alifd/next';
import type { ButtonProps } from '@alifd/next/types/button';
import React from 'react';

export interface IButton extends ButtonProps {
  autoLoading?: boolean;
  afterClick?: () => void;
  'data-log-c1'?: string;
  'data-log-c2'?: string;
}

function Button(props: IButton) {
  const { loading, autoLoading, onClick, children, afterClick, ...other } = props;
  const loadConfig = useEventLoading(loading, autoLoading, onClick, afterClick, () => {
    const c1 = props['data-log-c1'];

    if (c1) {
      logger.click('btnClk', { c1, c2: props['data-log-c2'] });
    }
  });

  return (
    <OriginButton {...loadConfig} {...other}>
      {children}
    </OriginButton>
  );
}

export default Button;