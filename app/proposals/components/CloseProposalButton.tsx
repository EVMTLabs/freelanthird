'use client';

import { CheckCircle } from 'lucide-react';

import { useCloseProposal } from '@/hooks/proposals/useCloseProposal';

export const CloseProposalButton = ({ invoiceId }: { invoiceId: number }) => {
  const { closeProposal, isSuccess, isTransacting } = useCloseProposal({
    invoiceId,
  });

  if (isSuccess) {
    return (
      <div className="alert alert-success">
        <CheckCircle />
        <p className="text-lg font-medium">
          The freelancer has accepted the proposal.
        </p>
      </div>
    );
  }

  if (isTransacting) {
    return (
      <button className="btn btn-success w-full text-base-100 text-xl">
        <span className="loading loading-spinner"></span>
        Processing...
      </button>
    );
  }

  return (
    <button
      onClick={closeProposal}
      className="btn btn-success w-full text-base-100 text-xl"
    >
      Approve work
    </button>
  );
};
