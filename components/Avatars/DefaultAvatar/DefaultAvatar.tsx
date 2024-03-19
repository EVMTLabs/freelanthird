import clsx from 'clsx';
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

  return (
    <div className={clsx('flex avatar', !avatar && 'placeholder')}>
      <div
        className={clsx(
          'rounded-full',
          avatar ? 'bg-transparent' : 'bg-neutral text-neutral-content',
          sizeProps[size].className,
          showRing && 'ring ring-primary ring-offset-base-100 ring-offset-2',
        )}
      >
        {avatar ? (
          <Image
            alt={username ?? 'user avatar'}
            src={avatar}
            width={sizeProps[size].width}
            height={sizeProps[size].height}
            className="rounded-full"
          />
        ) : (
          <span className="uppercase">{shortName}</span>
        )}
      </div>
    </div>
  );
};