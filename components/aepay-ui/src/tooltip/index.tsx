import React, { useMemo } from 'react';
import type { IBaseComponent } from '../interface';
import { classExprRaw } from '../utils';
import { Balloon, Icon } from '@alifd/next';
import type { BalloonProps, TooltipProps } from '@alifd/next/types/balloon';
import './index.scss';
import { IconProps } from '@alifd/next/types/icon';

export interface ITooltipProps extends IBaseComponent, Pick<BalloonProps, 'align'> {
  label?: string | React.ReactNode;
  tooltip?: string | React.ReactNode;
  iconProps?: IconProps;
  type?: 'icon' | 'underline' | 'text';
}

const Tooltip: React.FC<ITooltipProps> = React.memo((props) => {
  const { type = 'icon', label, tooltip, iconProps = { size: 14 }, align, className = '', style } = props;

  const tooltipProps = useMemo(() => {
    let tipProps: TooltipProps = {};
    if (typeof tooltip === 'string' || React.isValidElement(tooltip)) {
      tipProps = { children: tooltip };
    } else if (tooltip) {
      tipProps = tooltip as TooltipProps;
    }

    if (align) {
      tipProps.align = align;
    }

    return tipProps;
  }, [tooltip, align]);

  const titleDom = (
    <span 
      className={classExprRaw`tooltip-label`} 
      title={typeof label === 'string' ? label : undefined}
    >
      {label}
    </span>
  );

  return (
    <div
      style={style}
      className={`${classExprRaw`tooltip ${`tooltip-type-${type}`}`} ${className}`}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseLeave={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
    >
      {(type === 'icon' || !tooltip) && titleDom}
      {!!tooltip && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          onMouseLeave={(e) => e.stopPropagation()}
          onMouseMove={(e) => e.stopPropagation()}
        >
          <Balloon
            closable={false}
            trigger={
             (
                <div className={classExprRaw`tooltip-trigger`}>
                  {type !== 'icon' && titleDom}
                  {
                    type !== 'underline' && (
                      <span className={classExprRaw`tooltip-icon`}>
                        <Icon type='help' size='inherit' {...iconProps} />
                      </span>
                    )
                  }
                </div>
              )
            }
            popupClassName={classExprRaw`tooltip-popup`}
            {...(tooltipProps as any)}
          />
        </div>
      )}
    </div>
  );
});

export default Tooltip;
