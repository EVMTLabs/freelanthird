import { getDefaultConfig } from 'connectkit';
import { createConfig, fallback, http } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';

import { isDev, isTestnet } from './enviroment';

export const config = createConfig(
  getDefaultConfig({
    appName: 'Freelanthird',
    chains: isTestnet || isDev ? [polygonMumbai] : [polygon],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    transports:
      isTestnet || isDev
        ? {
            [polygonMumbai.id]: fallback([
              http(),
              http(
                `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_SEPOLIA_ID}`,
              ),
            ]),
          }
        : {
            [polygon.id]: fallback([
              http(),
              http(
                `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_ID}`,
              ),
              http(
                `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ARBITRUM_ID}`,
              ),
            ]),
          },
  }),
);
