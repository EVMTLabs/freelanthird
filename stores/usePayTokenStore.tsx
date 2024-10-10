import { create } from 'zustand';

export type Token = {
  symbol: string;
  address: `0x${string}`;
  decimals: number;
  fee: number;
  price: number;
};

interface PayTokenState {
  token: Token;
  tokens: Token[];
  usdAmount: number;
  tokenAmount: number;
  feeAmount: number;
  handlePayToken: (token: Token) => void;
}

export const usePayTokenStore = create<PayTokenState>((set) => ({
  token: {
    symbol: 'USDT',
    address: '0x',
    decimals: 6,
    fee: 3,
    price: 1,
  },
  tokens: [],
  usdAmount: 0,
  tokenAmount: 0,
  feeAmount: 0,
  handlePayToken: (token: Token) => {
    set(({ usdAmount }) => ({
      token: token,
      feeAmount: usdAmount * (token.fee / 100),
      tokenAmount: usdAmount / token.price,
    }));
  },
}));
