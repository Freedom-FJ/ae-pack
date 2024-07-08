/*
 * @Author: mjh
 * @Date: 2024-04-23 17:47:47
 * @LastEditors: mjh
 * @LastEditTime: 2024-05-24 15:35:48
 * @Description:
 */
import React, { ReactNode } from 'react';
import Tooltip from '../tooltip';
import { Table } from '@alifd/next';
import { classExprRaw } from '../utils';
import { ColumnProps, ColumnGroupProps } from '@alifd/next/types/table';
import { checkTypeValue } from './utils';
export type ValueType =
  | 'copyText'
  | 'text'
  | 'date'
  | 'dateRange'
  | 'money'
  | 'labelTip'
  | 'enum'
  | 'product';

export interface IColumn<T = Record<string, any>>
  extends ColumnGroupProps,
    ColumnProps {
  tooltip?: string;
  valueType?: ValueType;
  fieldProps?: Record<string, any>;
  render?: (record: T, value?: any, index?: string) => any;
  titleEllipsis?: boolean;
  column: IColumn[];
}

function renderColumn(props: IColumn) {
  const columnProps = checkTypeValue({ ...props });
  const {
    column,
    dataIndex,
    render,
    title,
    tooltip,
    titleEllipsis,
    ...restProps
  } = columnProps;
  if (render) {
    restProps.cell = (value: any, index: string, record: any) => {
      return render(record, value, index);
    };
  }
  const titleRender = (
    <Tooltip
      label={title as ReactNode}
      style={{
        maxWidth:
          typeof restProps.width === 'number'
            ? restProps.width - 12
            : undefined,
      }}
      tooltip={tooltip}
      className={titleEllipsis ? '' : classExprRaw`table-title-not-ellipsis`}
    />
  );
  const renderPops = {
    ...restProps,
    dataIndex,
    title: titleRender,
    key: dataIndex,
  };
  return column ? (
    <Table.ColumnGroup {...renderPops}>
      {column.map((item) => renderColumn(item))}
    </Table.ColumnGroup>
  ) : (
    <Table.Column {...renderPops} />
  );
}

export default renderColumn;
