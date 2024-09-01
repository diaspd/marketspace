export function usePriceFormatter() {
  const formatPrice = (input: number | string) => {
    const numericValue = input.toString().replace(/[^0-9]/g, '');

    if (numericValue.length > 0) {
      const numberValue = parseInt(numericValue, 10);

      return (numberValue / 100)
        .toFixed(2) 
        .replace('.', ',') 
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return '0,00';
  };

  return {
    formatPrice,
  };
};
