'use client';

import { useModal } from 'connectkit';
import { useAccount } from 'wagmi';

import { useMounted } from '@/hooks/common/useMounted';
import { useCreateInvoice } from '@/hooks/proposals/useCreateInvoice';

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

  const { setOpen } = useModal();
  const { isConnected } = useAccount();

  const mounted = useMounted();

  const handleConnect = () => {
    setOpen(true);
  };

  if (!isConnected || !mounted) {
    return (
      <button
        onClick={handleConnect}
        className="btn btn-primary w-full font-extrabold text-xl"
        disabled={!mounted}
      >
        Connect & Pay
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
      disabled={isPaymentConfirmed}
    >
      Pay now
    </button>
  );
};
