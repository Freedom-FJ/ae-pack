import React from 'react';
import ButtonGroup, { type IButtonItem } from '../button-group';
import Tooltip from '../tooltip';
import { Card as NextCard } from '@alifd/next';
import { classExprRaw } from '../utils';
import './index.scss';

export interface ICardProps {
  label?: string;
  tooltip?: string;
  extra?: string | React.ReactElement;
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
  actions?: IButtonItem[];
  contentStyle?: React.CSSProperties;
  loading?: boolean;
  className?: string;
  inline?: boolean;
}

const Card = ({
  label,
  tooltip,
  extra,
  actions,
  children,
  style,
  inline = false,
  className = '',
  contentStyle,
}: ICardProps) => {
  if (inline) {
    return <div style={contentStyle}>{children}</div>;
  }

  return (
    <NextCard free className={`${classExprRaw`card`} ${className}`} style={style}>
      <div className={classExprRaw`card-header`}>
        {!!label && (
          <div className={classExprRaw`card-header-title`}>
            <Tooltip
              label={label}
              tooltip={tooltip}
              align="t"
            />
            <div className={classExprRaw`card-header-extra`}>{extra}</div>
          </div>
        )}

        <div className={classExprRaw`card-actions`}>
          <ButtonGroup actions={actions} />
        </div>
      </div>
      <div style={contentStyle}>{children}</div>
    </NextCard>
  );
};

export default Card;
