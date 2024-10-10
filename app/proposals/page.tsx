import { Inbox, SendHorizonal } from 'lucide-react';
import Link from 'next/link';

import {
  findReceivedProposals,
  totalReceivedProposals,
} from '@/actions/proposals';
import { CreateProposal } from '@/components/CreateProposal/CreateProposal';

import { ProposalContainer } from './components/ProposalContainer';
import { ProposalsTable } from './components/ProposalsTable';

export const revalidate = 0;

export default async function MyProposalsPage() {
  const proposals = await findReceivedProposals();
  const proposalCount = await totalReceivedProposals();

  return (
    <ProposalContainer>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full lg:my-5">
        <div className="flex items-center mb-4">
          <Link
            href="/proposals"
            className="btn btn-primary rounded-r-none w-32"
          >
            <Inbox /> Received
          </Link>
          <Link href="/proposals/sent" className="btn rounded-l-none w-32">
            <SendHorizonal /> Sent
          </Link>
        </div>
        <CreateProposal btnClass="btn btn-outline" showIcon />
      </div>
      <div className="flex flex-col gap-5 p-10 border rounded-lg">
        {proposals.length === 0 ? (
          <div className="text-center text-gray-500">No proposals found</div>
        ) : (
          <ProposalsTable
            initialProposals={proposals}
            proposalCount={proposalCount}
          />
        )}
      </div>
    </ProposalContainer>
  );
}

export const dynamic = 'force-dynamic';
