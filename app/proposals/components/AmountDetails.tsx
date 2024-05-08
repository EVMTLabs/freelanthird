'use client';

import { useEffect } from 'react';

import { usePayTokenStore } from '@/stores/usePayTokenStore';

export const AmountDetails = ({
  proposalAmount,
}: {
  proposalAmount: number;
}) => {
  const { token, usdAmount, tokenAmount, feeAmount } = usePayTokenStore();

  useEffect(() => {
    usePayTokenStore.setState({
      tokenAmount: proposalAmount,
      usdAmount: proposalAmount,
    });
  }, [proposalAmount]);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Subtotal</h3>
        <p className="text-lg font-medium">
          {token.price === 1 ? '$' : ''}
          {tokenAmount % 1 !== 0 ? tokenAmount.toFixed(6) : tokenAmount}{' '}
          {token.symbol}
        </p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Fee</h3>
        <p className="text-lg font-medium">{token.fee}%</p>
      </div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Total amount</h3>
        <div>
          <p className="text-2xl font-bold text-end">
            ${usdAmount + feeAmount} USD
          </p>
          {token.price !== 1 && (
            <p className="text-sm font-medium text-end">
              (1{token.symbol} ≈ ${token.price.toFixed(2)})
            </p>
          )}
        </div>
      </div>
    </>
  );
};
