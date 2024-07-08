
import React from 'react';
import { Tooltip, Table } from '@ali/aepay-ui';

const Help = () => {
  const dataSource = [
    {
      amount: {
        amount: 2.34,
        currency: 'USD',
        formatAmount: '2.34',
      },
      fee: '税费总额',
      productId: '1005003765658132',
      productTitle: '印尼进口丽芝士威化饼干145g10盒多口味任选纳宝帝nabati休闲零食',
      productUrl: 'https://gw.alicdn.com/bao/uploaded/i2/2206632384781/O1CN01cc0auR1lBkUNL8OhQ_!!0-item_pic.jpg_300x300q90.jpg_.webp',
      skuDesc: 'Color:Blue,Size:S',
    },
    {
      amount: {
        amount: 1.11,
        currency: 'USD',
        formatAmount: '1.11',
      },
      fee: '税费名称1',
      productId: '1005003765658132',
      productTitle: '印尼进口丽芝士威化饼干145g10盒多口味任选纳宝帝nabati休闲零食',
      productUrl: 'https://gw.alicdn.com/bao/uploaded/i2/2206632384781/O1CN01cc0auR1lBkUNL8OhQ_!!0-item_pic.jpg_300x300q90.jpg_.webp',
      skuDesc: 'Color:Blue,Size:S',
    },
    {
      amount: {
        amount: 1.23,
        currency: 'USD',
        formatAmount: '1.23',
      },
      fee: '税费名称2',
      productId: '1005003765658132',
      productTitle: '印尼进口丽芝士威化饼干145g10盒多口味任选纳宝帝nabati休闲零食',
      productUrl: 'https://gw.alicdn.com/bao/uploaded/i2/2206632384781/O1CN01cc0auR1lBkUNL8OhQ_!!0-item_pic.jpg_300x300q90.jpg_.webp',
      skuDesc: 'Color:Blue,Size:S',
    }
  ]

  return (
    <div style={{ width: 560, fontSize: 14, color: '#2b323b' }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>税费明细</div>
      <div style={{ fontWeight: 400, marginBottom: 6 }}>该税费为买家支付的税费，销往美国的商品需要缴纳税费名称1，税费名称2</div>
      <Table
        dataSource={dataSource}
        columns={[
          {
            dataIndex: 'product',
            title: "商品",
            valueType: 'product',
            width: 300,
            lock: 'left',
            fieldProps: {
              hiddenSKUDesc: true
            }
          },
          {
            dataIndex: 'fee',
            title: "费用项",
            valueType: 'string',
            width: 130,
          },
          {
            dataIndex: 'amount',
            title: "金额",
            valueType: 'money',
            width: 130,
          }
        ]}
      />
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Tooltip
      label="自定义提示信息"
      tooltip={<Help />}
      align="t"
      type="text"
      iconProps={{
        type: 'prompt'
      }}
    />
  );
};

export default App;