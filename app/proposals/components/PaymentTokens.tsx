'use client';

import type { ChangeEvent } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { UsdcCoin } from '@/components/CoinIcons/UsdcCoin/UsdcCoin';
import { UsdtCoin } from '@/components/CoinIcons/UsdtCoin/UsdtCoin';
import type { Token } from '@/contracts';
import { usePayTokenStore } from '@/stores/usePayTokenStore';

export const PaymentTokens = () => {
  const { token, handlePayToken } = usePayTokenStore();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handlePayToken(event.target.value as Token);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <label className={clsx('btn', token === 'FLT' && 'btn-neutral')}>
        <input
          type="checkbox"
          className="hidden"
          value="FLT"
          onChange={handleInputChange}
        />
        <Image
          src="/images/coin-logo.webp"
          width={24}
          height={24}
          alt="freelanthird token"
        />
        FLT
      </label>
      <label className={clsx('btn', token === 'USDT' && 'btn-neutral')}>
        <input
          type="checkbox"
          className="hidden"
          value="USDT"
          onChange={handleInputChange}
        />
        <UsdtCoin /> USDT
      </label>
      <label className={clsx('btn', token === 'USDC' && 'btn-neutral')}>
        <input
          type="checkbox"
          className="hidden"
          value="USDC"
          onChange={handleInputChange}
        />
        <UsdcCoin /> USDC
      </label>
    </div>
  );
};
