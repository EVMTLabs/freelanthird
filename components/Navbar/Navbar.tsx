import Image from 'next/image';
import Link from 'next/link';

import { AccountMenu } from './AccountMenu';

export const Navbar = () => {
  return (
    <div className="navbar sticky top-0 bg-base-100 z-10 border-b py-4 px-6">
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
            <Link href="/" className="text-md font-semibold hover:underline">
              Projects
            </Link>
            <Link href="/" className="text-md font-semibold hover:underline">
              Freelancers
            </Link>
            <Link href="/" className="text-md font-semibold hover:underline">
              Proposals
            </Link>
            <Link href="/" className="text-md font-semibold hover:underline">
              My Jobs
            </Link>
            <Link
              href="/messages"
              className="text-md font-semibold hover:underline"
            >
              Messages
            </Link>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <AccountMenu />
      </div>
    </div>
  );
};
