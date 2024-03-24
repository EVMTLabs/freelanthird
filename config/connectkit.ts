import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { arbitrumSepolia } from 'wagmi/chains';

export const config = createConfig(
  getDefaultConfig({
    appName: 'Freelanthird',
    chains: [arbitrumSepolia],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  }),
);
