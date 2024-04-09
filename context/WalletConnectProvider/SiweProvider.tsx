'use client';

import type { ReactNode } from 'react';
import { SIWEProvider } from 'connectkit';
import { useRouter } from 'next/navigation';

import { siweConfig } from '@/config/siweConfig';

import { SimpleConnectProvider } from './SimpleConnectProvider';

export const SiweProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const siweProviderConfig = siweConfig(router);

  return (
    <SIWEProvider {...siweProviderConfig}>
      <SimpleConnectProvider>{children}</SimpleConnectProvider>
    </SIWEProvider>
  );
};
