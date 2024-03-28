'use client';

import { useModal } from 'connectkit';

import { useCreateInvoice } from '@/hooks/proposals/useCreateInvoice';
import { usePayTokenStore } from '@/stores/usePayTokenStore';
import { useSessionStore } from '@/stores/useSessionStore';

interface PayButtonProps {
  freelancerAddress: string;
  proposalId: string;
}

export const PayButton = ({
  freelancerAddress,
  proposalId,
}: PayButtonProps) => {
  const { handlePayment, isWaitingTransaction, isPaymentConfirmed } =
    useCreateInvoice({
      freelancerAddress,
      proposalId,
    });

  const { isLoading: isLoadingPayToken } = usePayTokenStore();

  const { session, isLoading } = useSessionStore();
  const { setOpen } = useModal();

  if (!isLoading && (!session || !session.isLoggedIn)) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="btn btn-primary w-full font-extrabold text-xl"
      >
        Sign in to pay
      </button>
    );
  }

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
      disabled={isLoading || isLoadingPayToken || isPaymentConfirmed}
    >
      Pay now
    </button>
  );
};
