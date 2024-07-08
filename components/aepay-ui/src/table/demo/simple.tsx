import React from 'react';
import { Card, Table } from '@ali/aepay-ui';
import { useRequest, useTable } from '@ali/aepay-hooks';

interface IRes {
  total: number;
  list: any[];
}

const mockReq = (): Promise<IRes> => {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove({
        total: 45,
        list: [
          {
            date: 1706796000000,
            text: '这是一段文本',
            labelTip: '这是提示文本',
            startTime: '2024/01/22',
            endTime: '2024/02/22',
            id: 82172971298172,
            status: 'Progress',
            amount: {
              amount: -95.43,
              currency: 'USD',
              formatAmount: '-95.43',
            },
            custom: {
              title: 'Customer',
            },
            productId: '1005003765658132',
            productTitle: '印尼进口丽芝士威化饼干145g10盒多口味任选纳宝帝nabati休闲零食',
            productUrl: 'https://gw.alicdn.com/bao/uploaded/i2/2206632384781/O1CN01cc0auR1lBkUNL8OhQ_!!0-item_pic.jpg_300x300q90.jpg_.webp',
            skuDesc: 'Color:Blue,Size:S',
          },
        ],
      });
    }, 1000);
  });
};

const App: React.FC = () => {
  const { loading, data } = useRequest<IRes, any>(mockReq, { manual: false });

  const { pagination } = useTable({
    pageSize: 10,
    onSearch: (params: any) => {
      console.log('onSearch...', params);
    },
  });

  console.log(loading, data, '......>>>');

  return (
    <Card label="表格" contentStyle={{ paddingTop: '16px' }}>
      <Table
        total={data?.total}
        pagination={{
          ...pagination,
          pageSizeList: [5, 10, 20, 50],
        }}
        loading={loading}
        dataSource={data?.list || []}
        columns={[
          {
            title: '多极表头',
            column: [
              {
                dataIndex: 'date',
                title: '变更日期',
                tooltip: '变更日期描述',
                valueType: 'date',
                width: 100,
              },
              {
                dataIndex: 'amount',
                title: '金额',
                tooltip: '金额描述',
                valueType: 'money',
                width: 100,
              },
            ],
          },
          {
            dataIndex: 'text',
            title: '文本',
            tooltip: '文本描述',
            valueType: 'text',
            width: 120,
          },
          {
            dataIndex: 'id',
            title: '文本复制文本复制文本复制文本复制文本复制',
            tooltip: '文本复制描述',
            valueType: 'copyText',
            width: 100,
            fieldProps: {
              getOpenUrl: (record: any) => 'https://www.baidu.com',
            },
          },
          {
            dataIndex: 'labelTip',
            title: '提示文本',
            tooltip: '提示文本描述',
            valueType: 'labelTip',
            width: 120,
            fieldProps: {
              getTooltip: (record: any) => '提示文本描述...',
            },
          },
          {
            dataIndex: 'product',
            title: '商品',
            tooltip: '商品描述',
            valueType: 'product',
            width: 300,
          },
          {
            dataIndex: 'dateRange',
            title: '日期范围',
            tooltip: '日期范围描述',
            valueType: 'dateRange',
            width: 120,
            fieldProps: {
              keys: ['startTime', 'endTime'],
            },
          },
          {
            dataIndex: 'status',
            title: '枚举',
            tooltip: '枚举描述',
            valueType: 'enum',
            width: 100,
            fieldProps: {
              options: [
                {
                  label: '进行中',
                  value: 'Progress',
                  type: 'prompt',
                },
                {
                  label: '成功',
                  value: 'Success',
                  type: 'success',
                },
                {
                  label: '失败',
                  value: 'Fail',
                  type: 'error',
                },
              ],
            },
          },
          {
            dataIndex: 'custom',
            title: '自定义渲染',
            tooltip: '自定义渲染',
            width: 100,
            titleEllipsis: true,
            render: (record: any, value: any) => {
              return value.title;
            },
          },
        ]}
        actions={[
          {
            btnText: '详情',
            onClick: () => { console.log('详情'); },
          },
          {
            btnText: '下载',
            onClick: () => { console.log('下载'); },
          },
        ]}
      />
    </Card>

  );
};

export default App;
