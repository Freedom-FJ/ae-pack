import React from 'react';
import { classExprRaw } from '../utils';
import { IBaseComponent } from '../interface';
import './index.scss';

export interface IStateLabel extends IBaseComponent {
  type: 'success' | 'error' | 'warning' | 'unavailable' | 'prompt'; // 状态类型
  text: string | number | React.ReactElement; // 标签显示文案
  extra: string | React.ReactElement; // 扩展信息
}

const StateLabel = ({ extra, style, className = '', text = '', type = 'success' }: Partial<IStateLabel>) => {
  return (
    <div className={`${classExprRaw`state-label`} ${className}`} style={style}>
      <div className={classExprRaw`state-label-container ${`state-label-${type}`}`}>
        <div className={classExprRaw`state-label-point`}>
          <span />
        </div>
        {!!text && <div className={classExprRaw`state-label-text`}>{text}</div>}
      </div>
      {!!extra && <div className={classExprRaw`state-label-extra`}>{extra}</div>}
    </div>
  );
};

export default StateLabel;
