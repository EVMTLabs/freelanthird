export enum Token {
  MATIC = 'MATIC',
  USDC = 'USDC',
  USDT = 'USDT',
}

export const tokenAddresses: Record<Token, `0x${string}`> = {
  MATIC: process.env.NEXT_PUBLIC_FLT_ADDRESS as `0x${string}`,
  USDC: process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
  USDT: process.env.NEXT_PUBLIC_USDT_ADDRESS as `0x${string}`,
};

export const freelanthirdContractAddress = process.env
  .NEXT_PUBLIC_FREELANTHIRD_ADDRESS as `0x${string}`;
