import { Toaster } from 'react-hot-toast';
import { ProposalStatus } from '@prisma/client';
import { CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { findInvoiceByProposalId, findProposalById } from '@/actions/proposals';
import { DefaultAvatar } from '@/components/Avatars/DefaultAvatar/DefaultAvatar';
import type { Token } from '@/contracts';
import { getServerSession } from '@/session/getServerSession';
import { truncateEthAddress } from '@/utils/truncateEthAddress';

import { AmountDetails } from '../../components/AmountDetails';
import { DateTime } from '../../components/DateTime';
import { Invoice } from '../../components/Invoice';
import { PayButton } from '../../components/PayButton';
import { PaymentTokens } from '../../components/PaymentTokens';

export default async function ProposalPage({
  params,
}: {
  params: { slug: string };
}) {
  const proposal = await findProposalById(params.slug);
  let invoice;

  if (!proposal) {
    return redirect('/404');
  }

  const { address } = await getServerSession();

  if (proposal.status !== ProposalStatus.PENDING) {
    invoice = await findInvoiceByProposalId(params.slug);
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:my-10 shadow-lg rounded-2xl">
        <div className="flex flex-col order-2 px-8 py-10 rounded-b-2xl border lg:order-1 lg:rounded-l-2xl lg:rounded-r-none">
          <h1 className="text-4xl font-bold mb-8">{proposal.title}</h1>
          <p className="text-xl font-normal text-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-base-200 scrollbar-track-transparent overflow-y-auto min-h-[600px] max-h-[600px]">
            {proposal.description}
          </p>
          <div className="flex items-end h-full">
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
                  <a
                    href={`https://arbiscan.io/address/${proposal.freelancerAddress}`}
                    className="text-lg font-medium underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {truncateEthAddress(
                      proposal.freelancerAddress as `0x${string}`,
                    )}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-8 py-10 bg-slate-100 rounded-t-2xl order-1 lg:order-2 lg:rounded-r-2xl lg:rounded-l-none">
          <h2 className="text-2xl font-bold mb-4">Payment settings</h2>
          <p className="text-lg text-gray-500">
            All payments are processed through our secure smart contract. Once
            you pay the amount, it will be locked in the contract until the
            proposal is completed.
          </p>
          <hr className="my-8 border-b border-2 border-dashed" />
          <DateTime title="Proposal date:" date={proposal.createdAt} />
          <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-medium text-gray-500">
              Freelancer Address:
            </p>
            <a
              href={`https://arbiscan.io/address/${proposal.freelancerAddress}`}
              target="_blank"
              className="text-lg text-gray-500 underline"
              rel="noopener noreferrer"
            >
              {truncateEthAddress(proposal.freelancerAddress as `0x${string}`)}
            </a>
          </div>
          <hr className="my-8 border-b border-2 border-dashed" />
          {proposal.freelancerAddress !== address &&
            proposal.status === ProposalStatus.PENDING && (
              <>
                <h3 className="text-lg font-medium text-gray-500 mb-4">
                  Payment method
                </h3>
                <PaymentTokens />
                <hr className="my-8 border-b border-2 border-dashed" />
              </>
            )}

          {proposal.status === ProposalStatus.PENDING ? (
            <AmountDetails paymentAmount={proposal.amount} />
          ) : invoice ? (
            <Invoice
              symbol={invoice.token.symbol as Token}
              usdAmount={invoice.usdAmount}
              tokenAmount={invoice.tokenAmount}
              usdFactor={invoice.usdFltFactor}
              decimals={invoice.token.decimals}
            />
          ) : null}
          <hr className="my-8 border-b border-2 border-dashed" />

          {proposal.freelancerAddress === address ? (
            <div className="alert alert-neutral">
              <Info />
              <p className="text-lg font-medium">
                Your proposal has been submitted. When the client pays the
                amount, you will be notified to start working on the proposal.
              </p>
            </div>
          ) : proposal.status === ProposalStatus.PENDING ? (
            <div className="flex w-full justify-end">
              <PayButton
                freelancerAddress={proposal.freelancerAddress}
                proposalId={proposal.id}
              />
            </div>
          ) : (
            <div className="alert alert-neutral">
              <CheckCircle />
              <p className="text-lg font-medium">
                Your payment has been confirmed and the freelancer has been
                notified.{' '}
                <Link className="underline" href={`/proposals/${proposal.id}`}>
                  Check status
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export const dynamic = 'force-dynamic';
