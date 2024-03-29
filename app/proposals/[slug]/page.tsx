import { Toaster } from 'react-hot-toast';
import { ProposalStatus } from '@prisma/client';
import { Flag } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { findInvoiceWithProposalByProposalId } from '@/actions/proposals';
import type { Token } from '@/contracts';
import { getServerSession } from '@/session/getServerSession';
import { truncateEthAddress } from '@/utils/truncateEthAddress';

import { CloseProposalButton } from '../components/CloseProposalButton';
import { DateTime } from '../components/DateTime';
import { Invoice } from '../components/Invoice';
import { ProposalFooter } from '../components/ProposalFooter';

export default async function ProposalPage({
  params,
}: {
  params: { slug: string };
}) {
  const invoice = await findInvoiceWithProposalByProposalId(params.slug);

  if (!invoice || invoice.proposal.status === ProposalStatus.PENDING) {
    return redirect(`/proposals/${params.slug}/payment`);
  }

  const { address } = await getServerSession();

  const isClient = invoice.clientAddress === address;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:my-10 shadow-lg rounded-2xl">
        <div className="flex flex-col order-2 px-8 py-10 rounded-b-2xl border lg:order-1 lg:rounded-l-2xl lg:rounded-r-none">
          <h1 className="text-4xl font-bold mb-8">{invoice.proposal.title}</h1>
          <p className="text-xl font-normal text-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-base-200 scrollbar-track-transparent overflow-y-auto min-h-[600px] max-h-[600px]">
            {invoice.proposal.description}
          </p>
          <ProposalFooter
            username={invoice.proposal.user?.username || ''}
            name={invoice.proposal.user?.name || ''}
            avatar={invoice.proposal.user?.avatar || ''}
            freelancerAddress={invoice.freelancerAddress}
          />
        </div>
        <div className="flex flex-col px-8 py-10 bg-slate-100 rounded-t-2xl order-1 lg:order-2 lg:rounded-r-2xl lg:rounded-l-none">
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
          <Invoice
            symbol={invoice.token.symbol as Token}
            usdAmount={invoice.usdAmount}
            tokenAmount={invoice.tokenAmount}
            usdFactor={invoice.usdFltFactor}
          />
          <hr className="my-8 border-b border-2 border-dashed" />

          <CloseProposalButton
            status={invoice.proposal.status}
            isClient={isClient}
            invoiceId={invoice.transactionId}
          />
        </div>
      </div>
      <Toaster />
    </>
  );
}

export const dynamic = 'force-dynamic';
