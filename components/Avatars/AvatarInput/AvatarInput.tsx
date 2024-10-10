'use client';

import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';

interface AvatarInputProps {
  defaultAvatar?: string;
  onChange: (file: File, contentType: string) => void;
  isLoading?: boolean;
  showDisclaimer?: boolean;
}

export const AvatarInput = ({
  defaultAvatar = '',
  onChange,
  isLoading,
  showDisclaimer = true,
}: AvatarInputProps) => {
  const [avatar, setAvatar] = useState<string | null>(defaultAvatar);
  const [error, setError] = useState('');

  const handleAvatarChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setError('File size should be less than 1MB');
        return;
      } else {
        setError('');
      }
      setAvatar(URL.createObjectURL(file));
      onChange(file, file.type);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="avatar-input" className="cursor-pointer">
        <div className={clsx('avatar', !avatar && 'placeholder')}>
          <div
            className={clsx(
              'rounded-full w-32 relative',
              avatar
                ? 'bg-transparent ring ring-primary ring-offset-base-100 ring-offset-2'
                : 'bg-neutral text-neutral-content',
            )}
          >
            {avatar ? (
              <>
                <div className="absolute inset-0 bg-neutral flex items-center justify-center transition-opacity duration-200 hover:opacity-70 opacity-0">
                  <span className="text-3xl text-neutral-content">
                    <ImagePlus />
                  </span>
                </div>
                <Image
                  src={avatar}
                  height={128}
                  width={128}
                  alt="user avatar"
                  onError={() => setAvatar(null)}
                />
              </>
            ) : (
              <span className="text-3xl">
                <ImagePlus />
              </span>
            )}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral bg-opacity-50 rounded-full">
                <span className="loading loading-ring loading-lg text-neutral-content"></span>
              </div>
            )}
          </div>
        </div>
      </label>
      <input
        id="avatar-input"
        type="file"
        accept="image/jpeg, image/png, image/gif"
        onChange={handleAvatarChange}
        className="hidden"
      />
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      {showDisclaimer && (
        <p className="text-sm mt-4 text-gray-500 w-64">
          We recommend using images at least 250x250 pixels and less than 1MB
        </p>
      )}
    </div>
  );
};
