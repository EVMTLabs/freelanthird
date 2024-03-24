'use client';

import { usePayTokenStore } from '@/stores/usePayTokenStore';

export const AmountDetails = () => {
  const { fee, amount, feeAmount, isLoading } = usePayTokenStore();

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Subtotal</h3>
        {isLoading ? (
          <div className="skeleton w-24 h-4 rounded-md" />
        ) : (
          <p className="text-lg font-medium">${amount} USD</p>
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
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Total amount</h3>
        {isLoading ? (
          <div className="skeleton w-24 h-8 rounded-md" />
        ) : (
          <p className="text-2xl font-bold">${amount + feeAmount} USD</p>
        )}
      </div>
    </>
  );
};
