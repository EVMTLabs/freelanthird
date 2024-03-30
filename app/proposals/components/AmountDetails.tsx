'use client';

import { useEffect } from 'react';

import { Token } from '@/contracts';
import { getQuotePrice } from '@/contracts/freelanthird/getFltPrice';
import { usePayTokenStore } from '@/stores/usePayTokenStore';

export const AmountDetails = ({ paymentAmount }: { paymentAmount: number }) => {
  const {
    fee,
    usdAmount,
    tokenAmount,
    feeAmount,
    fltUSDFactor,
    isLoading,
    token,
    setIsLoading,
    setTokenAmount,
    setFltUSDFactor,
  } = usePayTokenStore();

  useEffect(() => {
    const handleGetPrice = async () => {
      if (token !== Token.FLT) return;
      setIsLoading(true);
      const fltUSDFactor = await getQuotePrice();
      const tokenAmount = Number(
        (paymentAmount / parseFloat(fltUSDFactor)).toFixed(6),
      );
      if (usdAmount === 0) {
        usePayTokenStore.setState({
          isLoading: false,
          usdAmount: paymentAmount,
          fltUSDFactor: parseFloat(fltUSDFactor),
          tokenAmount,
        });
      } else {
        setTokenAmount(tokenAmount);
        setFltUSDFactor(parseFloat(fltUSDFactor));
      }
      setIsLoading(false);
    };
    // Call handleGetPrice immediately
    handleGetPrice();

    // Then set an interval to call it every 60 seconds
    const intervalId = setInterval(handleGetPrice, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [paymentAmount, token]);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Subtotal</h3>
        {isLoading ? (
          <div className="skeleton w-24 h-4 rounded-md" />
        ) : (
          <p className="text-lg font-medium">
            {token !== Token.FLT ? '$' : ''}
            {tokenAmount} {token}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Fee</h3>
        {isLoading ? (
          <div className="skeleton w-24 h-4 rounded-md" />
        ) : (
          <p className="text-lg font-medium">{fee}%</p>
        )}
      </div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Total amount</h3>
        {isLoading ? (
          <div className="skeleton w-24 h-8 rounded-md" />
        ) : (
          <div>
            <p className="text-2xl font-bold text-end">
              ${usdAmount + feeAmount} USD
            </p>
            {token === Token.FLT && (
              <p className="text-sm font-medium text-end">
                (1FLT ≈ ${fltUSDFactor.toFixed(2)})
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
