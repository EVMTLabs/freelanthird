'use client';

import clsx from 'clsx';
import type { Types } from 'connectkit';
import { UserRound } from 'lucide-react';
import Image from 'next/image';

export const Avatar = ({
  address = '0x',
  ensImage,
  ensName,
  size,
  radius,
}: Types.CustomAvatarProps) => {
  return (
    <div className={clsx('flex avatar', !ensImage && 'placeholder')}>
      <div
        className="bg-neutral text-neutral-content"
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
