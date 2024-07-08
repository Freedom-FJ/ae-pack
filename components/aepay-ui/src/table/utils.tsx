import React from 'react';
import MoneyValue from '../money-value';
import Tooltip from '../tooltip';
import CopyText from '../copy-text';
import StateLabel from '../state-label';
import ProductInfo from '../product-info';
import { formatTime, logger } from '@ali/aepay-utils';
import { IColumn } from './column';
import { classExprRaw } from '../utils';

export const checkTypeValue = (columnProps: IColumn) => {
  const { dataIndex, valueType } = columnProps;
  switch (valueType) {
    case 'copyText': {
      const { getOpenUrl } = columnProps.fieldProps || {};

      columnProps.fieldProps = undefined;
      columnProps.render = (record: any) => {
        const value = record[dataIndex];
        if (!value) {
          return '';
        }

        return (
          <div
            // 在捕获阶段处理避免弹toast
            onClickCapture={(e) => {
              const link: string = getOpenUrl && getOpenUrl(record);
              // 点击icon不跳转
              if (link && (e.target as HTMLElement)?.innerText) {
                e.stopPropagation();
                e.preventDefault();
                logger.click('linkClk', { c1: `copyText_${dataIndex}`, c2: link });

                if (link.startsWith('http')) {
                  window.open(link);
                }
              }
            }}
          >
            <CopyText
              onCopy={() => {
                logger.click('btnClk', { c1: `copyText_${dataIndex}`, c2: value });
              }}
            >
              {value}
            </CopyText>
          </div>
        );
      };
      break;
    }
    case 'date': {
      const { format } = columnProps.fieldProps || {};
      const dateFormat =
        format || (dataIndex.toLowerCase().endsWith('time') ? 'YYYY/MM/DD HH:mm:ss' : 'YYYY/MM/DD');

      columnProps.render = (record: any) => {
        const value = record[dataIndex];
        if (!value) {
          return '';
        }

        // 如果是字符串直接返回
        if (typeof value === 'string') {
          return <div>{value}</div>;
        }

        // 如果是时间戳返回分两行展示
        const [date, time] = dateFormat.split(' ');
        return (
          <div>
            {date && <div>{formatTime(value, date)}</div>}
            {time && <div>{formatTime(value, time)}</div>}
          </div>
        );
      };
      break;
    }
    case 'money': {
      columnProps.align = 'right';
      columnProps.render = (record: any) => {
        const value = record[dataIndex];
        const realValue = typeof value === 'object' && 'amount' in value ? value.amount : value;
        return <MoneyValue value={value} className={realValue < 0 ? classExprRaw`table-negative-value` : ''} />;
      };
      break;
    }
    case 'text': {
      columnProps.render = (record: any, val: string) => {
        const value = record[dataIndex];
        if (!value) {
          return '';
        }

        return val;
      };
      break;
    }
    case 'labelTip': {
      columnProps.render = (record: any) => {
        const value = record[dataIndex];
        const { getTooltip } = columnProps.fieldProps || {};
        const tooltip: string = getTooltip && getTooltip(record);

        return <Tooltip type="underline" label={value} tooltip={tooltip} />;
      };
      break;
    }
    case 'dateRange': {
      const { keys = [], format = 'YYYY/MM/DD' } = columnProps.fieldProps || {};
      columnProps.render = (record: any, value: any) => {
        if (keys.length > 0) {
          const startTime = record[keys[0]];
          const endTime = record[keys[1]];
          if (startTime && endTime) {
            return (
              <>
                <div>{`${formatTime(startTime, format)} ~ `}</div>
                <div>{formatTime(endTime, format)}</div>
              </>
            );
          }

          return '';
        }

        return value;
      };
      break;
    }
    case 'enum': {
      const { options = [] } = columnProps.fieldProps || {};
      if (options.length && options[0].type) {
        columnProps.render = (record: any) => {
          const value = record[dataIndex];
          const option = options.find((item: any) => item.value === value);
          return option ? (
            <StateLabel type={option.type} text={option.label || option.value} />
          ) : (
            value
          );
        };
      }
      break;
    }
    case 'product': {
      const fieldProps = columnProps.fieldProps || {};
      columnProps.render = (record: any) => {
        return <ProductInfo data={record} {...fieldProps} />;
      };
      break;
    }
    default:
      break;
  }
  return columnProps;
};