'use client';

import { useEffect, useState } from 'react';

import { getQuotePrice } from '@/contracts/freelanthird/getFltPrice';

export const useGetFltPrice = () => {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    const handleGetPrice = async () => {
      const response = await getQuotePrice();

      setPrice(response);
    };

    // Call handleGetPrice immediately
    handleGetPrice();

    // Then set an interval to call it every 30 seconds
    const intervalId = setInterval(handleGetPrice, 30000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  console.log(price);
};
