import { ArrowLeft, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { findFirstUnreadMessage } from '@/actions/messages';
import { getServerSession } from '@/session/getServerSession';

import { CustomLink } from '../CustomLink/CustomLink';

import { AccountMenu } from './AccountMenu';
import { CustomMessageLink } from './CustomMessageLink';

export const Navbar = async () => {
  const session = await getServerSession();
  const hasUnreadMessages = await findFirstUnreadMessage(session.userId);

  return (
    <div className="drawer z-10">
      <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="flex w-full justify-between py-6 px-8 navbar bg-base-100 lg:flex-row-reverse">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="menu-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <Menu size={24} />
            </label>
          </div>
          <div>
            <AccountMenu />
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="flex items-center gap-8">
              <li>
                <Link href="/">
                  <Image
                    src="/freelanthird-logo.webp"
                    alt="freelanthird"
                    width={165}
                    height={50}
                  />
                </Link>
              </li>
              <li>
                <CustomLink href="/">Find Work</CustomLink>
              </li>
              <li>
                <CustomLink href="/freelancers">Freelancers</CustomLink>
              </li>
              <li>
                <CustomLink href="/proposals">Proposals</CustomLink>
              </li>
              <li>
                <CustomMessageLink
                  hasUnreadMessages={hasUnreadMessages !== null}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="menu-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="w-80 min-h-full bg-base-100">
          <div className="flex items-center px-5 pt-5 pb-2">
            <label
              htmlFor="menu-drawer"
              aria-label="close sidebar"
              className="btn btn-square btn-ghost"
            >
              <ArrowLeft size={24} />
            </label>
            <Image
              src="/freelanthird-logo.webp"
              alt="freelanthird"
              width={168}
              height={50}
            />
          </div>

          <ul className="menu gap-2 px-5 text-lg font-semibold">
            <li>
              <Link href="/">Find Work</Link>
            </li>
            <li>
              <Link href="/freelancers">Freelancers</Link>
            </li>
            <li>
              <Link href="/proposals">Proposals</Link>
            </li>
            <li>
              <Link href="/messages">Messages</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
