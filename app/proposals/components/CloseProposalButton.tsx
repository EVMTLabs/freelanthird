'use client';

import { ProposalStatus } from '@prisma/client';
import { CheckCircle } from 'lucide-react';

import { useCloseProposal } from '@/hooks/proposals/useCloseProposal';

import { InvoiceStatus } from './InvoiceStatus';

interface CloseProposalButtonProps {
  invoiceId: number;
  status: ProposalStatus;
  isClient: boolean;
}

export const CloseProposalButton = ({
  invoiceId,
  status,
  isClient,
}: CloseProposalButtonProps) => {
  const { closeProposal, isSuccess, isTransacting } = useCloseProposal({
    invoiceId,
  });

  if (isSuccess || status === ProposalStatus.ACCEPTED) {
    return (
      <div className="alert alert-neutral">
        <CheckCircle />
        <p className="text-lg font-medium">
          Proposal closed successfully. Funds have been released to the
          freelancer.
        </p>
      </div>
    );
  }

  return (
    <>
      <InvoiceStatus status={status} isClient={isClient} />
      {isClient && !isTransacting ? (
        <button
          onClick={closeProposal}
          className="btn btn-success w-full text-base-100 text-xl"
        >
          Approve work
        </button>
      ) : (
        <button className="btn btn-success w-full text-base-100 text-xl">
          <span className="loading loading-spinner"></span>
          Processing...
        </button>
      )}
    </>
  );
};
