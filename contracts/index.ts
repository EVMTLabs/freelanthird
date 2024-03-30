export enum Token {
  FLT = 'FLT',
  USDC = 'USDC',
  USDT = 'USDT',
}

export const TOKEN_DECIMALS: Record<Token, number> = {
  FLT: 18,
  USDT: 6,
  USDC: 6,
};

export const TOKEN_FEES: Record<Token, number> = {
  FLT: 0,
  USDC: 3,
  USDT: 3,
};

export const tokenAddresses: Record<Token, `0x${string}`> = {
  FLT: process.env.NEXT_PUBLIC_FLT_ADDRESS as `0x${string}`,
  USDC: process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
  USDT: process.env.NEXT_PUBLIC_USDT_ADDRESS as `0x${string}`,
};

export const freelanthirdContractAddress = process.env
  .NEXT_PUBLIC_FREELANTHIRD_ADDRESS as `0x${string}`;
