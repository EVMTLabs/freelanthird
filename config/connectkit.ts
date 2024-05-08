import { getDefaultConfig } from 'connectkit';
import { createConfig, fallback, http } from 'wagmi';
import { polygon, polygonAmoy } from 'wagmi/chains';

import { isDev, isTestnet } from './enviroment';

export const config = createConfig(
  getDefaultConfig({
    appName: 'Freelanthird',
    chains: isTestnet || isDev ? [polygonAmoy] : [polygon],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    transports:
      isTestnet || isDev
        ? {
            [polygonAmoy.id]: fallback([
              http(),
              http(
                `https://polygon-amoy.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_AMOY_ID}`,
              ),
            ]),
          }
        : {
            [polygon.id]: fallback([
              http(),
              http(
                `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_ID}`,
              ),
              http(
                `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
              ),
            ]),
          },
  }),
);
