'use client';

import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { config } from '@/config/connectkit';
import { WalletConnectProvider } from '@/context/WalletConnectProvider/WalletConnectProvider';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <WalletConnectProvider>{children}</WalletConnectProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
