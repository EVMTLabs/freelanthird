export enum Environment {
  PRODUCTION = 'production',
  TESTNET = 'testnet',
  DEV = 'development',
}

export const isTestnet =
  process.env.NEXT_PUBLIC_VERCEL_URL?.includes('testnet') ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

export const enviroment = isTestnet
  ? Environment.TESTNET
  : process.env.NODE_ENV === 'production'
    ? Environment.PRODUCTION
    : Environment.DEV;

export const isDev = enviroment === Environment.DEV;
