'use client';

import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, SIWEProvider } from 'connectkit';
import { useRouter } from 'next/navigation';
import { WagmiProvider } from 'wagmi';

import { ConnectAvatar } from '@/components/Avatars/ConnectAvatar/ConnectAvatar';
import { config } from '@/config/connectkit';
import { siweConfig } from '@/config/siweConfig';

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
              customAvatar: ConnectAvatar,
            }}
            customTheme={{
              '--ck-font-family': '"Albert Sans", sans-serif',
            }}
          >
            {props.children}
          </ConnectKitProvider>
        </SIWEProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
