import Image from 'next/image';

import { CustomLink } from '../CustomLink/CustomLink';

import { AccountMenu } from './AccountMenu';
import { CustomMessageLink } from './CustomMessageLink';

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
          <div className="flex items-center gap-6 mt-1">
            <CustomLink href="/">Find Work</CustomLink>
            <CustomLink href="/freelancers">Freelancers</CustomLink>
            <CustomLink href="/freelancers">Proposals</CustomLink>
            <CustomLink href="/freelancers">My jobs</CustomLink>
            <CustomMessageLink />
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <AccountMenu />
      </div>
    </div>
  );
};
