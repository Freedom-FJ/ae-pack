import React from 'react';
import ButtonGroup, { type IButtonItem } from '../button-group';
import renderColumn from './column';
import useLocale from '../locale';
import { Table, Pagination } from '@alifd/next';
import { TableProps } from '@alifd/next/types/table';
import { classExprRaw } from '../utils';
import './index.scss';
export interface ITable extends TableProps {
  dataSource: any[];
  total?: number;
  pagination:
  | {
    current: number;
    onChange: (index: number) => void;
    pageSize: number;
    pageSizeList?: number[];
    onPageSizeChange: (size: number) => void;
  }
  | false;
  columns: any[];
  actions?: IButtonItem[];
}

function ProTable<T = Record<string, any>>({
  pagination,
  style,
  total,
  dataSource,
  columns,
  actions = [],
  ...tableProps
}: ITable) {
  const $i18n = useLocale();

  const actionColumn = {
    title: $i18n['aepayui.Table.Action'],
    width: 150,
    lock: 'right',
    fieldProps: {
      wrap: false,
      direction: 'column',
    },
    dataIndex: '$action',
    render: (record: T) => <ButtonGroup text data={record} actions={actions} />,
  };

  let paginationConfig;
  if (pagination) {
    paginationConfig = {
      total,
      locale: {
        goTo: $i18n['aepayui.Pagination.GoTo'],
        page: $i18n['aepayui.Pagination.Page'],
        pageSize: $i18n['aepayui.Pagination.RowsPerPage'],
        go: $i18n['aepayui.Pagination.Go'],
      },
      totalRender: (total: number) => {
        return $i18n.get({ id: 'aepayui.Pagination.Total', placeholderValues: { total } });
      },
      ...pagination,
    };
  }

  const tableColumns = actions.length > 0 ? [...columns, actionColumn] : columns;

  return (
    <div className={classExprRaw`table`} style={style}>
      <Table dataSource={dataSource} hasBorder={false} {...tableProps}>
        {tableColumns.map((column) => renderColumn(column))}
      </Table>
      {paginationConfig && paginationConfig.total > 0 && (
        <Pagination
          pageSizeSelector="dropdown"
          pageSizePosition="end"
          shape="arrow-only"
          className={classExprRaw`table-pagination`}
          {...paginationConfig}
        />
      )}
    </div>
  );
}

export default ProTable;
