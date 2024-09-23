export const formatCurrency = ({value = 0, currency = 'VND'}) => {
  if (!isNaN(Number(value))) {
    switch (currency) {
      case 'USD':
        return `${Number(value)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
          .replace(/\.?0+$/, '')} $`;
      case 'VND':
      default:
        return `${Number(value)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
          .replace(/\.?0+$/, '')} đ`;
    }
  }

  return '0 đ';
};
