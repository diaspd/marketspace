import { useState } from 'react';

export function usePriceFormatter() {
  const [price, setPrice] = useState('0,00');
    
  const handlePriceChange = (input: string) => {
    const numericValue = input.replace(/[^0-9]/g, '');

    if (numericValue.length > 0) {
      const numberValue = parseInt(numericValue, 10);

      const formattedPrice = (numberValue / 100)
        .toFixed(2) 
        .replace('.', ',') 
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      setPrice(formattedPrice);
    } else {
      setPrice('');
    }
  };

  return {
    price,
    handlePriceChange,
  };
}