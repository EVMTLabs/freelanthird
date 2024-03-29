import { ChevronRight, Inbox, SendHorizonal } from 'lucide-react';
import Link from 'next/link';

import { findSentProposals } from '@/actions/proposals';
import { DefaultAvatar } from '@/components/Avatars/DefaultAvatar/DefaultAvatar';
import { getServerSession } from '@/session/getServerSession';
import { truncateEthAddress } from '@/utils/truncateEthAddress';

import { ProposalContainer } from '../components/ProposalContainer';
import { Status } from '../components/Status';
import { TableDate } from '../components/TableDate';

export default async function MyProposalsPage() {
  const { address } = await getServerSession();
  const proposals = await findSentProposals(address);

  return (
    <ProposalContainer>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full lg:my-10">
        <h1 className="text-4xl font-medium mb-8 lg:mb-0">My Proposals</h1>
        <div className="flex items-center mb-4">
          <Link href="/proposals" className="btn rounded-r-none w-32">
            <Inbox /> Received
          </Link>
          <Link
            href="/proposals/sent"
            className="btn rounded-l-none w-32 btn-primary"
          >
            <SendHorizonal /> Sent
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-5 p-10 border rounded-lg">
        {proposals.length === 0 ? (
          <div className="text-center text-gray-500">No proposals found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-lg font-normal text-gray-400">Sender</th>
                  <th className="text-lg font-normal text-gray-400">Date</th>
                  <th className="text-lg font-normal text-gray-400">Status</th>
                  <th className="text-lg font-normal text-gray-400">Amount</th>
                  <th className="text-lg font-normal text-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal) => (
                  <tr key={proposal.id}>
                    <td>
                      <div className="flex items-center gap-4">
                        <DefaultAvatar
                          avatar={proposal.user?.avatar || ''}
                          username={proposal.user?.username || ''}
                        />
                        <div>
                          {proposal.user?.username ? (
                            <Link
                              href={`/users/${proposal.user.username}`}
                              className="text-lg font-medium"
                            >
                              {proposal.user.username}
                            </Link>
                          ) : (
                            <p className="text-lg font-medium">
                              {truncateEthAddress(
                                proposal.freelancerAddress as `0x${string}`,
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="text-lg font-medium">
                      <TableDate date={proposal.createdAt} />
                    </td>
                    <td className="w-fit">
                      <Status status={proposal.status} />
                    </td>
                    <td className="text-lg font-medium">${proposal.amount}</td>
                    <td>
                      <Link
                        href={`/proposals/${proposal.id}`}
                        className="btn btn-link text-neutral whitespace-nowrap flex-nowrap"
                      >
                        View Proposal <ChevronRight />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ProposalContainer>
  );
}

export const dynamic = 'force-dynamic';
