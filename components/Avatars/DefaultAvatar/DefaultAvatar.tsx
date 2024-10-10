'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { User } from 'lucide-react';
import Image from 'next/image';

interface DefaultAvatarProps {
  avatar: string | null;
  username: string | null;
  size?: 'small' | 'medium' | 'large';
  showRing?: boolean;
}

export const DefaultAvatar = ({
  avatar,
  username,
  size = 'small',
  showRing,
}: DefaultAvatarProps) => {
  const shortName = username?.slice(0, 2);

  const sizeProps = {
    small: {
      className: 'w-10 h-10',
      width: 40,
      height: 40,
    },
    medium: {
      className: 'w-12 h-12',
      width: 48,
      height: 48,
    },
    large: {
      className: 'w-16 h-16',
      width: 64,
      height: 64,
    },
  };

  const [avatarUrl, setAvatarUrl] = useState<string | null>(avatar);

  return (
    <div className={clsx('flex avatar', !avatarUrl && 'placeholder')}>
      <div
        className={clsx(
          'rounded-full',
          avatarUrl ? 'bg-transparent' : 'bg-base-200 text-gray-400',
          sizeProps[size].className,
          showRing && 'ring ring-primary ring-offset-base-100 ring-offset-2',
        )}
      >
        {avatarUrl ? (
          <Image
            alt={username ?? 'user avatar'}
            src={avatarUrl}
            onError={() => setAvatarUrl(null)}
            width={sizeProps[size].width}
            height={sizeProps[size].height}
            className="rounded-full"
          />
        ) : shortName ? (
          <span className="uppercase font-semibold">{shortName}</span>
        ) : (
          <User />
        )}
      </div>
    </div>
  );
};
