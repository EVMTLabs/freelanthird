import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { arbitrum,mainnet, optimism, polygon } from 'wagmi/chains';

export const config = createConfig(
  getDefaultConfig({
    appName: 'ConnectKit Next.js demo',
    chains: [mainnet, polygon, optimism, arbitrum],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  }),
);

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}