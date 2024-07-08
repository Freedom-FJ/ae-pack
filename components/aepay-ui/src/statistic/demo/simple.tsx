import React from 'react';
import { Card, Statistic, ButtonGroup } from '@ali/aepay-ui';
import { Button } from '@alifd/next';

const App: React.FC = () => {
  const data: any = {
    arrears: {
      amount: 601,
      currency: 'KRW',
      desc: '欠费',
      endTime: '2024/02/18',
      formatAmount: '601',
      startTime: '2023/09/01',
      tips: '​目前店铺欠平台未还的欠款（包括：拒付平台垫资的欠款、平台垫资退款的欠款等）。账户期末，欠款将先从您的未结算资金中扣除',
    },
    released: {
      amount: 4898,
      currency: 'KRW',
      desc: '最近出账',
      endTime: '2024/02/01',
      formatAmount: '4,898',
      startTime: '2024/01/15',
      tips: '最近一个已结束的账期金额，账期内所有已入帐的金额统一打至当时绑定收款银行账号​，请注意查收',
    },
    toRelease: {
      amount: 328,
      currency: 'KRW',
      desc: '待出账',
      endTime: '2023/11/15',
      formatAmount: '328',
      startTime: '2023/11/01',
      tips: '待出账金额为达到结算条件的资金。账期结束后，账期内所有的待出账金额将统一打至您的收款银行账号。打款日期为每个月的1号和15号',
    },
    unsettled: {
      amount: 76353,
      currency: 'KRW',
      desc: '待结算',
      endTime: '2024/02/18',
      formatAmount: '76,353',
      startTime: '2023/09/01',
      tips: '待结算金额为未到达结算条件的订单金额。结算条件：1）订单确认收货后+纠纷保护期（7天）；2）订单无在途纠纷；3）订单无在途拒付达到结算条件的订单进入当前的账期，达到“入帐中”状态',
    },
  };

  return (
    <>
      <Card>
        <Statistic divided={4}>
          {['arrears', 'released', 'toRelease', 'unsettled'].map((item) => {
            const statistic = data[item];
            return (
              <Statistic.Item
                key={item}
                title={statistic.desc}
                tooltip={statistic.tips}
                amount={statistic}
                date={[statistic.startTime, statistic.endTime]}
              />
            );
          })}
        </Statistic>
      </Card>
      <Card style={{ marginTop: 16 }}>
        <Statistic.Item             
          title={data.arrears.desc}
          tooltip={data.arrears.tips}
          amount={data.arrears}
          date={[data.arrears.startTime, data.arrears.endTime]}
          extra={
            <ButtonGroup 
              text 
              actions={[
                { btnText: '导出明细', onClick: console.log }, 
                { btnText: '查看导出历史', onClick: console.log }
              ]}
              style={{ marginLeft: 12 }}
            />
          }
        />
      </Card>
    </>
  );
};

export default App;
