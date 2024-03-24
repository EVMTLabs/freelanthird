import { Toaster } from 'react-hot-toast';
import { ProposalStatus } from '@prisma/client';
import { Flag } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { findInvoiceByProposalId } from '@/actions/proposals';
import { DefaultAvatar } from '@/components/Avatars/DefaultAvatar/DefaultAvatar';
import { TOKEN_FEES } from '@/stores/usePayTokenStore';
import { truncateEthAddress } from '@/utils/truncateEthAddress';

import { CloseProposalButton } from '../components/CloseProposalButton';
import { DateTime } from '../components/DateTime';
import { InvoiceStatus } from '../components/InvoiceStatus';

export default async function ProposalPage({
  params,
}: {
  params: { slug: string };
}) {
  const invoice = await findInvoiceByProposalId(params.slug);

  if (!invoice) {
    return redirect('/404');
  }

  if (invoice.proposal.status === ProposalStatus.PENDING) {
    return redirect(`/proposals/${params.slug}/payment`);
  }

  return (
    <>
      <div className="grid grid-cols-2 my-10 shadow-lg rounded-2xl">
        <div className="flex flex-col px-8 py-10 rounded-l-2xl border">
          <h1 className="text-4xl font-bold mb-8">{invoice.proposal.title}</h1>
          <p className="text-xl font-normal text-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-base-200 scrollbar-track-transparent overflow-y-auto min-h-[600px] max-h-[600px]">
            {invoice.proposal.description}
          </p>
          <div className="flex items-center mt-8">
            <DefaultAvatar
              avatar={invoice.proposal.user?.avatar || ''}
              username={invoice.proposal.user?.username || ''}
            />
            <div className="ml-2">
              {invoice.proposal.user ? (
                <div className="flex flex-col">
                  <Link
                    href={`/users/${invoice.proposal.user.username}`}
                    className="text-lg font-medium underline"
                  >
                    {invoice.proposal.user.name}
                  </Link>
                  <span className="text-sm text-gray-500">
                    @{invoice.proposal.user.username}
                  </span>
                </div>
              ) : (
                <Link
                  href={`https://etherscan.io/address/${invoice.freelancerAddress}`}
                  className="text-lg font-medium underline"
                >
                  {truncateEthAddress(
                    invoice.freelancerAddress as `0x${string}`,
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col px-8 py-10 bg-slate-100 rounded-r-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Payment confirmed</h2>
            <div className="tooltip tooltip-bottom" data-tip="Create dispute">
              <button className="btn btn-square btn-sm btn-outline btn-error">
                <Flag size={18} />
              </button>
            </div>
          </div>
          <p className="text-lg text-gray-500">
            Congratulations! Your payment has been confirmed and the freelancer
            has been notified. Once the freelancer completes the work, you will
            be able to approve the work and release the funds.
          </p>
          <hr className="my-8 border-b border-2 border-dashed" />
          <DateTime title="Proposal date:" date={invoice.proposal.createdAt} />
          <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-medium text-gray-500">
              Freelancer Address:
            </p>
            <Link
              href={`https://etherscan.io/address/${invoice.freelancerAddress}`}
              target="_blank"
              className="text-lg text-gray-500 underline"
            >
              {truncateEthAddress(invoice.freelancerAddress as `0x${string}`)}
            </Link>
          </div>
          <hr className="my-8 border-b border-2 border-dashed" />
          <DateTime title="Invoice date:" date={invoice.proposal.createdAt} />
          <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-medium text-gray-500">Client Address:</p>
            <Link
              href={`https://etherscan.io/address/${invoice.clientAddress}`}
              target="_blank"
              className="text-lg text-gray-500 underline"
            >
              {truncateEthAddress(invoice.clientAddress as `0x${string}`)}
            </Link>
          </div>
          <hr className="my-8 border-b border-2 border-dashed" />
          <div className="grid grid-cols-2">
            <h3 className="text-lg font-medium mb-2">Subtotal</h3>
            <p className="text-lg font-medium text-end mb-2">
              ${invoice.amount} USD
            </p>
            <h3 className="text-lg font-medium mb-4">Fee</h3>
            <p className="text-lg font-medium text-end mb-4">
              {TOKEN_FEES[invoice.token.symbol]}%
            </p>
            <h3 className="text-2xl font-bold">Total amount</h3>
            <p className="text-2xl font-bold text-end">
              $
              {invoice.amount +
                invoice.amount * (TOKEN_FEES[invoice.token.symbol] / 100)}
              USD
            </p>
          </div>
          <hr className="my-8 border-b border-2 border-dashed" />
          {invoice.proposal.status === ProposalStatus.IN_PROGRESS ? (
            <CloseProposalButton invoiceId={invoice.id} />
          ) : (
            <InvoiceStatus status={invoice.proposal.status} />
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}
