import React from 'react';
import { classExprRaw } from '../utils';
import './index.scss';
import { IBaseComponent } from '../interface';

interface IProgress extends IBaseComponent {
  percent?: number;
  disabled?: boolean;
  textRender?: (percent: number) => React.ReactElement;
  color?: (percent: number) => string;
}

const Progress = ({ disabled, textRender, style, color, className = '', percent = 0 }: IProgress) => {
  const text = typeof textRender === 'function' ? textRender(percent) : null;
  const colorStyle = typeof color === 'function' ? { backgroundImage: `linear-gradient(90deg, #EDF4FF 0%, ${color(percent)} 100%)` } : {};

  return (
    <div
      className={`${classExprRaw`progress ${disabled ? 'progress-disabled' : ''}`} ${className}`}
      style={style}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={classExprRaw`progress-line`}>
        <div className={classExprRaw`progress-underlay`}>
          {
            percent > 0 && (
              <div className={classExprRaw`progress-overlay`} style={{ width: `${Math.min(percent, 100)}%`, ...colorStyle }} />
            )
          }
        </div>
      </div>
      {text && <div className={classExprRaw`progress-text`}>{text}</div>}
    </div>
  );
};

export default Progress;
