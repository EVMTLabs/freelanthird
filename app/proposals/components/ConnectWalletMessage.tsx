import { CreateProposal } from '@/components/CreateProposal/CreateProposal';

import { ProposalNavLinks } from './ProposalNavLinks';

export const ConnectWalletMessage = () => {
  return (
    <>
      <div className="flex justify-between items-center w-full my-10">
        <ProposalNavLinks />
        <CreateProposal btnClass="btn btn-outline" showIcon />
      </div>
      <div className="flex flex-col gap-5 p-10 border rounded-lg">
        <div className="text-center text-gray-500">
          Connect to view your proposals
        </div>
      </div>
    </>
  );
};
