'use client';

import { useEffect } from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { findReceivedProposals } from '@/actions/proposals';
import { DefaultAvatar } from '@/components/Avatars/DefaultAvatar/DefaultAvatar';
import { useProposalStore } from '@/stores/useProposalStore';
import { type Proposal } from '@/types/proposals';
import { truncateEthAddress } from '@/utils/truncateEthAddress';

import { Status } from './Status';
import { TableDate } from './TableDate';

interface ProposalsTableProps {
  initialProposals: Proposal[];
  proposalCount: number;
}

export const ProposalsTable = ({
  initialProposals,
  proposalCount,
}: ProposalsTableProps) => {
  const { proposals, index, setIndex, addProposals } = useProposalStore();

  useEffect(() => {
    useProposalStore.setState({
      proposals: initialProposals,
      isLoading: false,
    });
  }, [proposals]);

  const totalProposalsShwon =
    index * 10 > proposalCount ? proposalCount : index * 10;
  const proposalsShown = index === 1 ? 1 : index * 10;

  const loadNextProposals = async () => {
    const newIndex = index + 1;
    const skip = newIndex * 10;
    const newProposals = await findReceivedProposals(10, skip);
    addProposals(newProposals);
    setIndex(newIndex);
  };

  const loadPreviousProposals = async () => {
    const newIndex = index - 1;
    const skip = newIndex * 10;
    const newProposals = await findReceivedProposals(10, skip);
    addProposals(newProposals);
    setIndex(newIndex);
  };

  const disabledLoadNext = index * 10 >= proposalCount;
  const disabledLoadPrevious = proposalsShown === 1;

  return (
    <>
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
                <td>
                  <Status status={proposal.status} />
                </td>
                <td className="text-lg font-medium">${proposal.amount}</td>
                <td>
                  <Link
                    href={`/proposals/${proposal.id}${proposal.status === 'PENDING' ? '/payment' : ''}`}
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
      <div className="flex items-center justify-end mt-8">
        <p className="text-sm text-gray-500 mr-5">
          {proposalsShown}-{totalProposalsShwon} of {proposalCount}
        </p>
        <div className="flex items-center gap-5">
          <button
            disabled={disabledLoadPrevious}
            className={clsx(
              'cursor-pointer',
              disabledLoadPrevious && 'opacity-50',
            )}
            onClick={loadPreviousProposals}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            disabled={disabledLoadNext}
            className={clsx('cursor-pointer', disabledLoadNext && 'opacity-50')}
            onClick={loadNextProposals}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
};
