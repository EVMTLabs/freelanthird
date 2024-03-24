'use client';

import { useCreateInvoice } from '@/hooks/proposals/useCreateInvoice';

interface PayButtonProps {
  amount: number;
  freelancerAddress: string;
  proposalId: string;
}

export const PayButton = ({
  amount,
  freelancerAddress,
  proposalId,
}: PayButtonProps) => {
  const { handlePayment, isWaitingTransaction } = useCreateInvoice({
    amount,
    freelancerAddress,
    proposalId,
  });

  if (isWaitingTransaction) {
    return (
      <button className="btn btn-primary w-full font-extrabold text-xl">
        <span className="loading loading-spinner"></span>
        Processing...
      </button>
    );
  }

  return (
    <button
      onClick={handlePayment}
      className="btn btn-primary w-full font-extrabold text-xl"
    >
      Pay now
    </button>
  );
};
