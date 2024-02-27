import Image from 'next/image';

import { AccountMenu } from './AccountMenu';

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 border-b py-4 px-6">
      <div className="navbar-start">
        <div className="flex items-center gap-10">
          <a href="/">
            <Image
              src="/freelanthird-logo.webp"
              alt="freelanthird"
              width={165}
              height={50}
            />
          </a>
          <div className="flex items-center gap-6">
            <a href="/" className="text-md font-semibold hover:underline">
              Projects
            </a>
            <a href="/" className="text-md font-semibold hover:underline">
              Freelancers
            </a>
            <a href="/" className="text-md font-semibold hover:underline">
              Proposals
            </a>
            <a href="/" className="text-md font-semibold hover:underline">
              My Jobs
            </a>
            <a href="/" className="text-md font-semibold hover:underline">
              Messages
            </a>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <AccountMenu />
      </div>
    </div>
  );
};
