import { create } from 'zustand';

interface PayTokenState {
  isLoading: boolean;
  token: string;
  fee: number;
  amount: number;
  feeAmount: number;
  handlePayToken: (token: string) => void;
}

export const TOKEN_FEES: Record<string, number> = {
  FLT: 0,
  USDC: 3,
  USDT: 3,
};

export const usePayTokenStore = create<PayTokenState>((set) => ({
  isLoading: true,
  token: 'FLT',
  fee: 0,
  amount: 0,
  feeAmount: 0,
  handlePayToken: (token: string) => {
    const tokenFee = TOKEN_FEES[token];
    set(({ amount }) => ({
      token: token,
      fee: tokenFee,
      feeAmount: amount * (tokenFee / 100),
    }));
  },
}));
