import { Toaster } from 'react-hot-toast';
import { ProposalStatus } from '@prisma/client';
import { redirect } from 'next/navigation';

import { findTokenList } from '@/actions/payments';
import { findInvoiceByProposalId, findProposalById } from '@/actions/proposals';
import type { Token } from '@/contracts';
import { truncateEthAddress } from '@/utils/truncateEthAddress';

import { AmountDetails } from '../../components/AmountDetails';
import { DateTime } from '../../components/DateTime';
import { Invoice } from '../../components/Invoice';
import { ProposalFooter } from '../../components/ProposalFooter';

import { PaymentButton } from './components/PaymentButton';
import { PaymentMethods } from './components/PaymentMethods';

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

  if (proposal.status !== ProposalStatus.PENDING) {
    invoice = await findInvoiceByProposalId(params.slug);
  }

  const tokenList = await findTokenList();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:my-10 shadow-lg rounded-2xl">
        <div className="flex flex-col order-2 px-8 py-10 rounded-b-2xl border lg:order-1 lg:rounded-l-2xl lg:rounded-r-none">
          <h1 className="text-4xl font-bold mb-8">{proposal.title}</h1>
          <p className="text-xl font-normal text-gray-500 pb-8 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-base-200 scrollbar-track-transparent overflow-y-auto min-h-[600px] max-h-[600px]">
            {proposal.description}
          </p>
          <ProposalFooter
            username={proposal.user?.username || ''}
            name={proposal.user?.name || ''}
            avatar={proposal.user?.avatar || ''}
            freelancerAddress={proposal.freelancerAddress}
          />
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

          <h3 className="text-lg font-medium text-gray-500 mb-4">
            Payment method
          </h3>
          <PaymentMethods
            tokenList={tokenList}
            proposalStatus={proposal.status}
            freelancerAddress={proposal.freelancerAddress}
          />
          <hr className="my-8 border-b border-2 border-dashed" />

          {proposal.status === ProposalStatus.PENDING ? (
            <AmountDetails proposalAmount={proposal.amount} />
          ) : invoice ? (
            <Invoice
              symbol={invoice.token.symbol as Token}
              usdAmount={invoice.usdAmount}
              tokenAmount={invoice.tokenAmount}
              tokenPrice={invoice.tokenPrice}
              decimals={invoice.token.decimals}
              fee={invoice.token.fee}
            />
          ) : null}
          <hr className="my-8 border-b border-2 border-dashed" />

          <PaymentButton
            freelancerAddress={proposal.freelancerAddress as `0x${string}`}
            proposalStatus={proposal.status}
            proposalId={params.slug}
          />
        </div>
      </div>
      <Toaster />
    </>
  );
}

export const dynamic = 'force-dynamic';
