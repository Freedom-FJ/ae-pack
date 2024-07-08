
import React from 'react';
import { RichText } from '@ali/aepay-ui';

const App: React.FC = () => {
  return (
    <div>
      <RichText
        html={`<div>中国跨境卖家关于订单结算放款时效、规则，以及提前放款的说明， <a href="https://customerservice.aliexpress.com/knowledgeDetail?categoryId=75410013&hcAppId=1256&hcFromCode=vCRvWPRhl&hcSessionId=26-1256-a325911d-b285-4588-9d10-d918c66231ca&knowledgeId=544238">点击查看规则</a></div>`}
      />
      <RichText
        style={{ marginTop: 16 }}
        html={`1.退出提前放款服务后不可重新开通\n2.申请退出后服务状态会变为“解约中”，直到提前放款的订单全部完结后自动退出服务\n3.申请退出后不会立即释放保证金，已提前放款但尚未完结的订单金额会全部追加为保证金，可能导致保证金短期内上涨`}
      />
    </div>
  )
}

export default App;