'use client';

import clsx from 'clsx';
import { UserRound } from 'lucide-react';
import Image from 'next/image';

interface AvatarProps {
  address?: string;
  ensImage?: string;
  ensName?: string;
  size?: number;
  radius?: number;
}

export const ConnectAvatar = ({
  address = '0x',
  ensImage,
  ensName,
  size = 32,
  radius = 96,
}: AvatarProps) => {
  return (
    <div className={clsx('flex avatar', !ensImage && 'placeholder')}>
      <div
        className={clsx(
          ensImage ? 'bg-transparent' : 'bg-base-200 text-gray-400',
        )}
        style={{ width: size, height: size, borderRadius: radius }}
      >
        {ensImage ? (
          <Image
            alt={ensName ?? address}
            src={ensImage}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <span>
            <UserRound size={24} />
          </span>
        )}
      </div>
    </div>
  );
};
