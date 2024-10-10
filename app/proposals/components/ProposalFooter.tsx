import Link from 'next/link';

import { DefaultAvatar } from '@/components/Avatars/DefaultAvatar/DefaultAvatar';
import { truncateEthAddress } from '@/utils/truncateEthAddress';

import { HowItWorksModal } from './HowItWorksModal';

interface ProposalFooterProps {
  username: string;
  avatar: string;
  name: string;
  freelancerAddress: string;
}

export const ProposalFooter = ({
  username,
  avatar,
  name,
  freelancerAddress,
}: ProposalFooterProps) => {
  return (
    <div className="flex items-end justify-between h-full">
      <div className="flex items-center">
        <DefaultAvatar avatar={avatar} username={username} />
        <div className="ml-2">
          {username ? (
            <div className="flex flex-col">
              <Link
                href={`/users/${username}`}
                className="text-lg font-medium underline"
              >
                {name}
              </Link>
              <span className="text-sm text-gray-500">@{username}</span>
            </div>
          ) : (
            <a
              href={`https://arbiscan.io/address/${freelancerAddress}`}
              className="text-lg font-medium underline"
              target="_blank"
            >
              {truncateEthAddress(freelancerAddress as `0x${string}`)}
            </a>
          )}
        </div>
      </div>
      <HowItWorksModal />
    </div>
  );
};
