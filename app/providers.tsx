'use client';

import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, SIWEProvider } from 'connectkit';
import { useRouter } from 'next/navigation';
import { WagmiProvider } from 'wagmi';

import { WalletAvatar } from '@/components/Avatars/WalletAvatar/WalletAvatar';
import { config } from '@/config/connectkit';
import { siweConfig } from '@/config/siweConfig';
import { SessionProvider } from '@/context/SessionContext';

const queryClient = new QueryClient();

export function Providers(props: { children: ReactNode }) {
  const router = useRouter();
  const siweProviderConfig = siweConfig(router);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <SIWEProvider {...siweProviderConfig}>
          <ConnectKitProvider
            theme="soft"
            options={{
              customAvatar: WalletAvatar,
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
