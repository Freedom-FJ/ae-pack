import React from 'react';
import MoneyValue, { IAmountValue } from '../money-value';
import { Grid } from '@alifd/next';
import type { BalloonProps } from '@alifd/next/types/balloon';
import Tooltip from '../tooltip';
import { classExprRaw } from '../utils';
import './index.scss';

interface IStatistical {
  className?: string;
  style?: React.CSSProperties;
  children: any;
  divided?: number;
  showSymbol?: boolean;
  showFormatAmount?: boolean;
}

interface IStatisticItem extends Pick<BalloonProps, 'align'> {
  title?: string;
  tooltip?: string;
  amount?: IAmountValue;
  amountClassName?: string;
  currencyCode?: string;
  date?: string | string[];
  style?: React.CSSProperties;
  showSymbol?: boolean;
  extra?: React.ReactNode;
  defaultValue?: string;
  showFormatAmount?: boolean;
  currencyPosition?: 'front' | 'back';
  renderContent?: (amount: IAmountValue) => React.ReactNode;
}

const { Row, Col } = Grid;

function StatisticItem({
  title,
  tooltip,
  extra,
  amount,
  currencyCode,
  date,
  align = 't',
  amountClassName = '',
  defaultValue = '-',
  showFormatAmount = true,
  currencyPosition,
  style,
  showSymbol,
  renderContent
}: IStatisticItem) {
  let amountValue: any;
  if (typeof amount !== 'object' && typeof amount !== 'undefined') {
    amountValue = {
      amount,
      currency: currencyCode,
    };
  } else {
    amountValue = amount;
  }

  return (
    <div className={classExprRaw`statistic-item`} style={style}>
      <div className={classExprRaw`statistic-item-title`}>
        <Tooltip
          label={title}
          tooltip={!!tooltip && <div className={classExprRaw`statistic-item-tooltip`} dangerouslySetInnerHTML={{ __html: tooltip }} />}
          align={align}
        />
        <div>{extra}</div>
      </div>
      <div className={classExprRaw`statistic-item-data`}>
        {
          typeof renderContent === 'function' ? renderContent(amountValue) : (
            <MoneyValue
              className={`${classExprRaw`statistic-item-amount`} ${amountClassName}`}
              value={amountValue}
              defaultValue={defaultValue}
              showFormatAmount={showFormatAmount}
              currencyPosition={currencyPosition}
              showAmountType={showSymbol ? 'symbolValue' : 'currencyValue'}
              currencyClassName={classExprRaw`statistic-item-currency`}
              symbolClassName={classExprRaw`statistic-item-currencySymbol`}
            />
          )
        }
      </div>
      {!!date && (
        <div className={classExprRaw`statistic-item-date`}>
          {Array.isArray(date) ? date.filter(Boolean).join(' ~ ') : date}
        </div>
      )}
    </div>
  );
}

const Statistic = ({ className = '', style, showSymbol, showFormatAmount, children, divided = 4 }: IStatistical) => {
  const span = divided === 5 ? '1p5' : Math.ceil(24 / divided);

  return (
    <Row gutter={2} wrap className={`${classExprRaw`statistic`} ${className}`} style={style}>
      {React.Children.map(children, (child, index) => {
        if (!child) return null;

        return (
          <Col span={span}>
            {React.cloneElement(child, {
              style: index + 1 > divided ? { marginTop: '8px' } : {},
              showSymbol,
              showFormatAmount
            })}
          </Col>
        );
      })}
    </Row>
  );
};

Statistic.Item = StatisticItem;

export default Statistic;
