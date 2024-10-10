'use client';

import { useState } from 'react';

import { createS3ProfileImage } from '@/actions/users';
import { AvatarInput } from '@/components/Avatars/AvatarInput/AvatarInput';

import { useNewUserFormContext } from '../context/NewUserContext';

export const CreateNewAvatarStep = () => {
  const { newUserValues, setNewUserValues, goNextStep, goBackStep } =
    useNewUserFormContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (file: File, contentType: string) => {
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
        //   setNewUserValues({
        //     ...newUserValues,
        //     avatar: imageUrl,
        //   });
        // }

        setNewUserValues({
          ...newUserValues,
          avatar: imageUrl,
        });
      }
    } catch (error) {
      console.error('Failed to upload image', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <p className="text-lg mb-8 font-extrabold">Profile picture</p>
      <AvatarInput
        defaultAvatar={newUserValues.avatar}
        onChange={handleImageChange}
        isLoading={isLoading}
      />
      <div className="flex w-full justify-between mt-8">
        <button
          type="button"
          className="btn btn-outline btn-neutral mt-6 w-32"
          onClick={goBackStep}
        >
          Back
        </button>
        <button
          className="btn btn-primary mt-6 w-32"
          onClick={goNextStep}
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Next'}
        </button>
      </div>
    </div>
  );
};
