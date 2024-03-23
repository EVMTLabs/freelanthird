import Link from 'next/link';
import { redirect } from 'next/navigation';

import { findProposalById } from '@/actions/proposals';
import { DefaultAvatar } from '@/components/Avatars/DefaultAvatar/DefaultAvatar';
import { truncateEthAddress } from '@/utils/truncateEthAddress';

import { PaymentTokens } from '../components/PaymentTokens';
import { ProposalDateTime } from '../components/ProposalDateTime';

export default async function ProposalPage({
  params,
}: {
  params: { slug: string };
}) {
  const proposal = await findProposalById(params.slug);

  if (!proposal) {
    return redirect('/404');
  }

  return (
    <>
      <div className="grid grid-cols-2 my-10 shadow-lg rounded-2xl">
        <div className="flex flex-col px-8 py-10 rounded-l-2xl border">
          <h1 className="text-4xl font-bold mb-8">{proposal.title}</h1>
          <p className="text-xl font-normal text-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-base-200 scrollbar-track-transparent overflow-y-auto min-h-[600px] max-h-[600px]">
            {proposal.description}
          </p>
          <div className="flex items-center mt-8">
            <DefaultAvatar
              avatar={proposal.user?.avatar || ''}
              username={proposal.user?.username || ''}
            />
            <div className="ml-2">
              {proposal.user ? (
                <div className="flex flex-col">
                  <Link
                    href={`/users/${proposal.user.username}`}
                    className="text-lg font-medium underline"
                  >
                    {proposal.user.name}
                  </Link>
                  <span className="text-sm text-gray-500">
                    @{proposal.user.username}
                  </span>
                </div>
              ) : (
                <Link
                  href={`https://etherscan.io/address/${proposal.freelancerAddress}`}
                  className="text-lg font-medium underline"
                >
                  {truncateEthAddress(
                    proposal.freelancerAddress as `0x${string}`,
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col px-8 py-10 bg-slate-100 rounded-r-2xl">
          <h2 className="text-2xl font-bold mb-4">Payment settings</h2>
          <p className="text-lg text-gray-500">
            All payments are processed through our secure smart contract. Once
            you pay the amount, it will be locked in the contract until the
            proposal is completed.
          </p>
          <hr className="my-8 border-b border-2 border-dashed" />
          <ProposalDateTime date={proposal.createdAt} />
          <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-medium text-gray-500">
              Freelancer Address:
            </p>
            <Link
              href={`https://etherscan.io/address/${proposal.freelancerAddress}`}
              target="_blank"
              className="text-lg text-gray-500 underline"
            >
              {truncateEthAddress(proposal.freelancerAddress as `0x${string}`)}
            </Link>
          </div>
          <hr className="my-8 border-b border-2 border-dashed" />
          <h2 className="text-lg font-medium text-gray-500 mb-4">
            Payment method
          </h2>
          <PaymentTokens />
          <hr className="my-8 border-b border-2 border-dashed" />
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium">Subtotal</h2>
            <p className="text-lg font-medium">${proposal.amount} USD</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Fee</h2>
            <p className="text-lg font-medium">0%</p>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Total amount</h2>
            <p className="text-2xl font-bold">${proposal.amount} USD</p>
          </div>

          <hr className="my-8 border-b border-2 border-dashed" />
          <div className="flex w-full justify-end mt-8">
            <button className="btn btn-primary w-32 font-extrabold text-lg">
              Pay now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
