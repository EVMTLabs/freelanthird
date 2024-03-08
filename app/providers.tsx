'use client';

import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, SIWEProvider } from 'connectkit';
import { WagmiProvider } from 'wagmi';

import { Avatar } from '@/components/Avatar/Avatar';
import { config } from '@/config/connectkit';
import { siweConfig } from '@/config/siweConfig';
import { SessionProvider } from '@/context/SessionContext';

const queryClient = new QueryClient();

export function Providers(props: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <SIWEProvider {...siweConfig}>
          <ConnectKitProvider
            theme="soft"
            options={{
              customAvatar: Avatar,
            }}
            customTheme={{
              '--ck-font-family': '"Albert Sans", sans-serif',
            }}
          >
            <SessionProvider>{props.children}</SessionProvider>
          </ConnectKitProvider>
        </SIWEProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
