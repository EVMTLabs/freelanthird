'use client';

import { ProposalStatus } from '@prisma/client';

import { PaymentTokens } from '@/app/proposals/components/PaymentTokens';
import { useSession } from '@/hooks/session/useSession';
import { type Token } from '@/stores/usePayTokenStore';

export const PaymentMethods = ({
  tokenList,
  proposalStatus,
  freelancerAddress,
}: {
  tokenList: Token[];
  proposalStatus: ProposalStatus;
  freelancerAddress: string;
}) => {
  const { session } = useSession();
  const { address } = session;

  if (
    freelancerAddress === address ||
    proposalStatus !== ProposalStatus.PENDING
  )
    return null;

  return <PaymentTokens tokenList={tokenList} />;
};
