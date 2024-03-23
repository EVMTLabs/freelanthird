'use client';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { UsdcCoin } from '@/components/CoinIcons/UsdcCoin/UsdcCoin';
import { UsdtCoin } from '@/components/CoinIcons/UsdtCoin/UsdtCoin';

export const PaymentTokens = () => {
  const [selectedToken, setSelectedToken] = useState('FLT');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSelectedToken(event.target.value);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <label className={clsx('btn', selectedToken === 'FLT' && 'btn-neutral')}>
        <input
          type="checkbox"
          className="hidden"
          value="FLT"
          onChange={handleInputChange}
        />
        <Image
          src="/images/coin-logo.png"
          width={24}
          height={24}
          alt="freelanthird token"
        />
        FLT
      </label>
      <label className={clsx('btn', selectedToken === 'USDT' && 'btn-neutral')}>
        <input
          type="checkbox"
          className="hidden"
          value="USDT"
          onChange={handleInputChange}
        />
        <UsdtCoin /> USDT
      </label>
      <label className={clsx('btn', selectedToken === 'USDC' && 'btn-neutral')}>
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
