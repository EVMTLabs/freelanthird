'use client';

import { ProposalStatus } from '@prisma/client';
import { CheckCircle } from 'lucide-react';

import { useCloseProposal } from '@/hooks/proposals/useCloseProposal';

import { InvoiceStatus } from './InvoiceStatus';

interface CloseInvoiceButtonProps {
  invoiceId: number;
  status: ProposalStatus;
  isClient: boolean;
}

export const CloseInvoiceButton = ({
  invoiceId,
  status,
  isClient,
}: CloseInvoiceButtonProps) => {
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

  if (!isClient) {
    return <InvoiceStatus status={status} isClient={isClient} />;
  }

  return (
    <>
      <InvoiceStatus status={status} isClient={isClient} />
      {!isTransacting ? (
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
