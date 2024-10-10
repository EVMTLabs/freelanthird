'use client';
import { ProposalStatus } from '@prisma/client';
import { CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';

import { useSession } from '@/hooks/session/useSession';

import { PayButton } from '../../../components/PayButton';

export const PaymentButton = ({
  freelancerAddress,
  proposalStatus,
  proposalId,
}: {
  freelancerAddress: `0x${string}`;
  proposalStatus: ProposalStatus;
  proposalId: string;
}) => {
  const { session } = useSession();
  const { address } = session;

  return (
    <div className="flex w-full h-full justify-end items-end">
      {freelancerAddress === address ? (
        <div className="alert alert-neutral">
          <Info />
          <p className="text-lg font-medium">
            Your proposal has been submitted. When the client pays the amount,
            you will be notified to start working on the proposal.
          </p>
        </div>
      ) : proposalStatus === ProposalStatus.PENDING ? (
        <div className="flex w-full justify-end">
          <PayButton
            freelancerAddress={freelancerAddress}
            proposalId={proposalId}
          />
        </div>
      ) : (
        <div className="alert alert-neutral">
          <CheckCircle />
          <p className="text-lg font-medium">
            Your payment has been confirmed and the freelancer has been
            notified.{' '}
            <Link className="underline" href={`/proposals/${proposalId}`}>
              Check status
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};
