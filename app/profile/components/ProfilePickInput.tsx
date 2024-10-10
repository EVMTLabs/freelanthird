'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import { createS3ProfileImage } from '@/actions/users';
import { AvatarInput } from '@/components/Avatars/AvatarInput/AvatarInput';
import { useSessionStore } from '@/stores/useSessionStore';

export const ProfilePickInput = ({
  defaultImage,
}: {
  defaultImage: string | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { session, setSession } = useSessionStore();

  const handleImageChange = async (file: File, contentType: string) => {
    if (!session) return null;

    try {
      setIsLoading(true);
      const { imageUrl } = await createS3ProfileImage({
        contentType,
      });

      if (imageUrl) {
        // const formData = new FormData();

        // Object.entries(fields).forEach(([key, value]) => {
        //   formData.append(key, value as string);
        // });

        // formData.append('file', file);

        // const uploadResponse = await fetch(url, {
        //   method: 'POST',
        //   body: formData,
        // });

        // if (uploadResponse.ok) {
        //   setSession({
        //     ...session,
        //     avatar: imageUrl,
        //   });

        //   toast.success('Profile picture updated');
        // }

        setSession({
          ...session,
          avatar: imageUrl,
        });

        toast.success('Profile picture updated');
      }
    } catch (error) {
      console.error('Failed to upload image', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AvatarInput
      defaultAvatar={defaultImage}
      showDisclaimer={false}
      isLoading={isLoading}
      onChange={handleImageChange}
    />
  );
};
