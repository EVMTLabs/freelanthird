'use client';

import { type ChangeEvent, useEffect } from 'react';
import clsx from 'clsx';

import { MaticCoin } from '@/components/CoinIcons/MaticCoin/MaticCoin';
import { UsdcCoin } from '@/components/CoinIcons/UsdcCoin/UsdcCoin';
import { UsdtCoin } from '@/components/CoinIcons/UsdtCoin/UsdtCoin';
import { type Token, usePayTokenStore } from '@/stores/usePayTokenStore';

export const PaymentTokens = ({ tokenList }: { tokenList: Token[] }) => {
  const { token, handlePayToken } = usePayTokenStore();

  useEffect(() => {
    usePayTokenStore.setState({
      tokens: tokenList,
    });
  }, [tokenList]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedToken = tokenList.find(
      (t) => t.symbol === event.target.value,
    );
    handlePayToken(selectedToken as Token);
  };

  const tokenSymbols: Record<string, React.ReactNode> = {
    USDT: <UsdtCoin />,
    USDC: <UsdcCoin />,
    MATIC: <MaticCoin />,
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {tokenList.map((t) => (
        <label
          key={t.address}
          className={clsx('btn', token.symbol === t.symbol && 'btn-neutral')}
        >
          <input
            type="checkbox"
            className="hidden"
            value={t.symbol}
            onChange={handleInputChange}
          />
          {tokenSymbols[t.symbol]} {t.symbol}
        </label>
      ))}
    </div>
  );
};
