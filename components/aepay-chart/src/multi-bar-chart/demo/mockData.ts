export const legends = [
  {
  label: '待结算',
  value: 'Unsettled', 
  }, 
  {
    label: '欠费',
    value: 'Arrears',
  },
  {
    label: '待出账',
    value: 'ToRelease',
  },
  {
    label: '已出账',
    value: 'Released',
  }
];

export const mockData = () => {
  return Array(7).fill(0).reduce((acc, item, index) => {
    const date = `2024-03-${`0${index + 1}`.slice(-2)}`;
    
    const values = legends.reduce((acc: any, legend, i) => {
      acc[legend.value] = Math.floor(Math.random() * 80) + 10;
      return acc;
    }, {});

    acc.push({ date, ...values });
    return acc;
  }, []);
}