'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { updateFreelancerProfile } from '@/actions/freelancers';
import { updateUserDescription } from '@/actions/users';
import type { FreelancerProfile } from '@/types/users';

export type ProfileFormValues = {
  category: string;
  skills: string[];
  title: string;
  description: string;
  isComplete?: boolean;
  visible: boolean;
  isFreelancer: boolean;
};

const freelancerSchema = z.object({
  title: z
    .string()
    .max(80, 'Ensure your title does not exceed 80 characters')
    .min(10, 'Your title is too short'),
  description: z
    .string()
    .max(5000, 'Your profile description is too long')
    .min(100, 'Your profile description is too short'),
  category: z.string().max(50).min(10, 'Please select a category'),
  skills: z.array(z.string().max(50).min(10)).optional(),
});

const userSchema = z.object({
  description: z
    .string()
    .max(1000, 'Your profile description is too long')
    .optional(),
});

export const ProfileFormProvider = ({
  children,
  freelancerProfile,
  isFreelancer,
  isVisible,
  userDescription,
}: {
  children: React.ReactNode;
  freelancerProfile: FreelancerProfile | null;
  isFreelancer: boolean;
  isVisible: boolean;
  userDescription: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(isFreelancer ? freelancerSchema : userSchema),
    defaultValues: {
      category: freelancerProfile?.category?.id || '',
      title: freelancerProfile?.title || '',
      description: isFreelancer
        ? freelancerProfile?.description || ''
        : userDescription,
      skills: freelancerProfile?.skills?.map((skill) => skill.id) || [],
      isComplete: !isFreelancer ? true : freelancerProfile?.isComplete || false,
      visible: isVisible,
      isFreelancer,
    },
  });

  const saveProfile = async (data: ProfileFormValues) => {
    try {
      if (isFreelancer) {
        const result = await updateFreelancerProfile(data);
        methods.setValue('isComplete', !!result.freelancer?.isComplete);
        methods.setValue('visible', !!result.visible);
      } else {
        await updateUserDescription(data.description);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = methods.handleSubmit((data) => {
    if (isLoading) return;

    setIsLoading(true);

    return toast.promise(saveProfile(data), {
      loading: 'Saving profile...',
      success: 'Profile updated',
      error: 'Failed to update profile',
    });
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
      <Toaster />
    </FormProvider>
  );
};
