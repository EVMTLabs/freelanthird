'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { UserRound } from 'lucide-react';
import Image from 'next/image';

import { useSession } from '@/hooks/session/useSession';

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

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(imageUrl);

  return (
    <div className={clsx('flex avatar', !avatarUrl && 'placeholder')}>
      <div
        className={clsx(
          avatarUrl ? 'bg-transparent' : 'bg-base-200 text-gray-400',
        )}
        style={{ width: size, height: size, borderRadius: radius }}
      >
        {avatarUrl ? (
          <Image
            alt={ensName ?? address}
            src={avatarUrl}
            width={32}
            height={32}
            className="rounded-full"
            onError={() => setAvatarUrl(undefined)}
          />
        ) : (
          <span>{username ? username[0] : <UserRound size={24} />}</span>
        )}
      </div>
    </div>
  );
};
