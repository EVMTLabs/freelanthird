import { create } from 'zustand';

import { Token, TOKEN_FEES } from '@/contracts';

interface PayTokenState {
  isLoading: boolean;
  token: Token;
  fee: number;
  usdAmount: number;
  tokenAmount: number;
  fltUSDFactor: number;
  feeAmount: number;
  handlePayToken: (token: Token) => void;
  setTokenAmount: (tokenAmount: number) => void;
  setFltUSDFactor: (fltUSDFactor: number) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const usePayTokenStore = create<PayTokenState>((set) => ({
  isLoading: true,
  token: Token.FLT,
  fee: 0,
  usdAmount: 0,
  tokenAmount: 0,
  fltUSDFactor: 0,
  feeAmount: 0,
  handlePayToken: (token: Token) => {
    const tokenFee = TOKEN_FEES[token];
    set(({ usdAmount, fltUSDFactor }) => ({
      token: token,
      fee: tokenFee,
      feeAmount: usdAmount * (tokenFee / 100),
      tokenAmount:
        token === Token.FLT
          ? Number((usdAmount / fltUSDFactor).toFixed(6))
          : usdAmount / 1,
    }));
  },
  setTokenAmount: (tokenAmount: number) => {
    set(() => ({
      tokenAmount,
    }));
  },
  setFltUSDFactor: (fltUSDFactor: number) => {
    set(() => ({
      fltUSDFactor,
    }));
  },
  setIsLoading: (isLoading: boolean) => {
    set(() => ({
      isLoading,
    }));
  },
}));
