import { getDefaultConfig } from 'connectkit';
import { createConfig, fallback, http } from 'wagmi';
import { arbitrum, arbitrumSepolia } from 'wagmi/chains';

import { isDev, isTestnet } from './enviroment';

export const config = createConfig(
  getDefaultConfig({
    appName: 'Freelanthird',
    chains: isTestnet || isDev ? [arbitrumSepolia] : [arbitrum],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    transports:
      isTestnet || isDev
        ? {
            [arbitrumSepolia.id]: fallback([
              http(),
              http(
                `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_SEPOLIA_ID}`,
              ),
              http(
                `https://arbitrum-sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ARBITRUM_ID}`,
              ),
            ]),
          }
        : {
            [arbitrum.id]: fallback([
              http(),
              http(
                `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_ID}`,
              ),
              http(
                `https://arbitrum-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ARBITRUM_ID}`,
              ),
            ]),
          },
  }),
);
