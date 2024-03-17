'use client';

import { useFormContext } from 'react-hook-form';

import type { ProfileFormValues } from './ProfileFormProvider';

export const ProfileUserDescription = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <>
      <textarea
        className="textarea textarea-bordered w-full !outline-0 textarea-lg min-h-[500px] max-h-[500px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-base-200 scrollbar-track-transparent overflow-y-auto"
        placeholder="Tell others about yourself"
        autoFocus
        {...register('description')}
      ></textarea>
      <p className="text-lg mt-2 text-red-500">{errors.description?.message}</p>
    </>
  );
};
