import clsx from 'clsx';
import Image from 'next/image';

interface ChatAvatarProps {
  username: string | null;
  avatar: string | null;
  size?: number;
}

export const ChatAvatar = ({
  username,
  avatar,
  size = 32,
}: ChatAvatarProps) => {
  return (
    <div className={clsx('avatar', !avatar && 'placeholder')}>
      <div
        style={{ width: size, height: size }}
        className="bg-neutral rounded-full text-neutral-content"
      >
        {avatar ? (
          <Image className="rounded-full" fill alt="avatar" src={avatar} />
        ) : (
          <span className="uppercase">{username ? username[0] : ''}</span>
        )}
      </div>
    </div>
  );
};
