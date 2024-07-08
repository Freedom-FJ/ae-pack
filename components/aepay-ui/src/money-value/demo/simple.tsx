import React from 'react';
import { MoneyValue } from '@ali/aepay-ui';

const App: React.FC = () => {
  return (
    <>
      <MoneyValue
        value={{
          amount: 76353,
          currency: 'KRW',
          formatAmount: '76,353',
        }}
        showAmountType="symbolValue"
      />
      <br />
      <MoneyValue
        value={{
          amount: 76353,
          currency: 'KRW',
          formatAmount: '76,353',
        }}
        showAmountType="currencyValue"
        style={{ fontSize: 18, fontWeight: 'bold' }}
        currencyStyle={{ fontSize: 12 }}
      />
    </>
  );
};

export default App;
