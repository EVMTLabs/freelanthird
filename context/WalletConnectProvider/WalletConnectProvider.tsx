'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { SimpleConnectProvider } from './SimpleConnectProvider';
import { SiweProvider } from './SiweProvider';

export const WalletConnectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pathname = usePathname();
  const isSiwePage = !pathname.includes('payment');

  if (isSiwePage) {
    return <SiweProvider>{children}</SiweProvider>;
  }

  return <SimpleConnectProvider>{children}</SimpleConnectProvider>;
};
