'use client';

import clsx from 'clsx';
import { Inbox, SendHorizonal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const ProposalNavLinks = () => {
  const path = usePathname();

  const isSentPath = path === '/proposals/sent';

  return (
    <div className="flex items-center">
      <Link
        href="/proposals"
        className={clsx(
          'btn rounded-r-none w-32',
          !isSentPath && 'btn-primary',
        )}
      >
        <Inbox /> Received
      </Link>
      <Link
        href="/proposals/sent"
        className={clsx('btn rounded-l-none w-32', isSentPath && 'btn-primary')}
      >
        <SendHorizonal /> Sent
      </Link>
    </div>
  );
};
