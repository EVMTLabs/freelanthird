'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { Mail, User } from 'lucide-react';
import { z } from 'zod';

import { updateUserSettings } from '@/actions/users';

type SettingsFormValues = {
  name: string;
  email: string;
};

const schema = z.object({
  name: z
    .string()
    .min(1, 'Your name seems too short')
    .max(20, 'Your name seems too long'),
  email: z
    .union([z.string(), z.string().email()])
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
});

export const SettingsForm = ({
  name,
  email,
}: {
  name?: string;
  email?: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name,
      email,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const saveSettings = async (data: SettingsFormValues) => {
    try {
      await updateUserSettings(data);
    } catch (error) {
      console.error('Error updating user settings', error);
      throw new Error('Error updating user settings');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = handleSubmit((data) => {
    if (isLoading) return;

    if (data.email === email && data.name === name) return;

    setIsLoading(true);

    return toast.promise(saveSettings(data), {
      loading: 'Saving profile...',
      success: 'Profile updated',
      error: 'Failed to update profile',
    });
  });

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 py-4 border-t">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">Full name</p>
          <label className="input input-bordered flex items-center gap-2">
            <User size={16} />
            <input
              autoFocus
              type="text"
              className={clsx('grow', errors.name && 'input-error')}
              {...register('name')}
            />
          </label>
          {errors.name && (
            <p className="text-error mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">Email (optional)</p>
          <label className="input input-bordered flex items-center gap-2">
            <Mail size={16} />
            <input
              type="email"
              className={clsx('grow', errors.email && 'input-error')}
              placeholder="remotework@freelanthird.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-error mt-1">{errors.email.message}</p>
            )}
          </label>
          <p className="text-sm mt-2 text-gray-500">
            Your email will be used only to send you new messages or proposals
            notifications, we will never share it with anyone or use it for
            spam.
          </p>
        </div>
        <div className="flex justify-end mt-6">
          <button type="submit" className="btn btn-primary w-32">
            Save changes
          </button>
        </div>
      </form>
      <Toaster />
    </>
  );
};
