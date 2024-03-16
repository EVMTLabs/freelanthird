'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { updateFreelancerProfile } from '@/actions/users';
import type { FreelancerProfile } from '@/types/users';

export type ProfileFormValues = {
  category: string;
  skills: string[];
  description: string;
  isComplete?: boolean;
  visible?: boolean;
};

const schema = z.object({
  description: z
    .string()
    .max(5000, 'Your profile description is too long')
    .min(100, 'Your profile description is too short'),
  category: z.string().max(50).min(10, 'Please select a category'),
  skills: z.array(z.string().max(50).min(10)).optional(),
});

export const ProfileFormProvider = ({
  children,
  freelancerProfile,
}: {
  children: React.ReactNode;
  freelancerProfile: FreelancerProfile | null;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: freelancerProfile?.category?.id || '',
      description: freelancerProfile?.description || '',
      skills: freelancerProfile?.skills?.map((skill) => skill.id) || [],
      isComplete: freelancerProfile?.isComplete || false,
      visible: freelancerProfile?.visible || false,
    },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const result = await updateFreelancerProfile(data);
      methods.setValue('isComplete', !!result.freelancer?.isComplete);
      methods.setValue('visible', !!result.freelancer?.visible);
      toast.success('Profile updated');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
      <Toaster />
    </FormProvider>
  );
};
