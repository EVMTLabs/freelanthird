import { create } from 'zustand';

import { Token } from '@/contracts';

interface PayTokenState {
  isLoading: boolean;
  token: Token;
  fee: number;
  amount: number;
  feeAmount: number;
  handlePayToken: (token: Token) => void;
}

export const TOKEN_FEES: Record<Token, number> = {
  FLT: 0,
  USDC: 3,
  USDT: 3,
};

export const usePayTokenStore = create<PayTokenState>((set) => ({
  isLoading: true,
  token: Token.FLT,
  fee: 0,
  amount: 0,
  feeAmount: 0,
  handlePayToken: (token: Token) => {
    const tokenFee = TOKEN_FEES[token];
    set(({ amount }) => ({
      token: token,
      fee: tokenFee,
      feeAmount: amount * (tokenFee / 100),
    }));
  },
}));
