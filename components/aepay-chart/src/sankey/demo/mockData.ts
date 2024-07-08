const mockData = [
  {
    label: 'Total amount',
    value: 4000,
    amount: {
      amount: 4000,
      currency: 'KRW',
      formatAmount: '4,000',
    },
    children: [
      {
        label: 'Settled',
        value: 3200,
        amount: {
          amount: 3200,
          currency: 'KRW',
          formatAmount: '3,200',
        },
        children: [
          {
            label: 'Released',
            value: 2600,
            amount: {
              amount: 2600,
              currency: 'KRW',
              formatAmount: '2,600',
            },
          },
          {
            label: 'Expense',
            value: 600,
            amount: {
              amount: 600,
              currency: 'KRW',
              formatAmount: '600',
            },
          },
        ],
      },
      {
        label: 'unsettled',
        value: 800,
        amount: {
          amount: 800,
          currency: 'KRW',
          formatAmount: '800',
        },
        children: [
          {
            label: 'Ongoing',
            value: 600,
            amount: {
              amount: 600,
              currency: 'KRW',
              formatAmount: '600',
            },
          },
          {
            label: 'Cancelled',
            value: 200,
            amount: {
              amount: 200,
              currency: 'KRW',
              formatAmount: '200',
            },
          },
        ],
      },
    ],
  },
];

export default mockData;