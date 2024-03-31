import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

import { DiscordIcon } from '../SocialIcons/DiscordIcon';
import { TwitterIcon } from '../SocialIcons/TwitterIcon';

export const NeedHelpContact = () => {
  return (
    <div className="flex flex-col gap-4 justify-start lg:items-end">
      <Link
        href="https://discord.gg/fQageBbAA4"
        className="btn btn-outline w-72"
      >
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center">
            <DiscordIcon />
            <span className="text-2xl ml-2 font-bold">Discord</span>
          </div>
          <ExternalLinkIcon />
        </div>
      </Link>
      <Link href="https://x.com/freelanthird" className="btn btn-outline w-72">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center">
            <TwitterIcon />
            <span className="text-2xl ml-2 font-bold">Twitter</span>
          </div>
          <ExternalLinkIcon />
        </div>
      </Link>
      <p className="text-gray-500 text-sm text-center w-72">
        Need help? Contact us on Discord or Twitter
      </p>
    </div>
  );
};
