'use client';

import clsx from 'clsx';
import { UserRound } from 'lucide-react';
import Image from 'next/image';

import { useSession } from '@/context/SessionContext';

interface AvatarProps {
  address?: string;
  ensImage?: string;
  ensName?: string;
  size?: number;
  radius?: number;
}

export const WalletAvatar = ({
  address = '0x',
  ensImage,
  ensName,
  size = 32,
  radius = 96,
}: AvatarProps) => {
  const { session } = useSession();

  const { avatar, username } = session || {};

  const imageUrl = ensImage || avatar;

  return (
    <div className={clsx('flex avatar', !ensImage && 'placeholder')}>
      <div
        className={clsx(
          avatar ? 'bg-transparent' : 'bg-base-200 text-gray-400',
        )}
        style={{ width: size, height: size, borderRadius: radius }}
      >
        {imageUrl ? (
          <Image
            alt={ensName ?? address}
            src={imageUrl}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <span>{username ? username[0] : <UserRound size={24} />}</span>
        )}
      </div>
    </div>
  );
};
