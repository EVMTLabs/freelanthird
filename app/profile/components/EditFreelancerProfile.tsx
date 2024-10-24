'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { RichTextEditor } from '@/components/RichTextEditor/RichTextEditor';

import type { ProfileFormValues } from './ProfileFormProvider';

export const EditFreelancerProfile = ({
  defaultDescription,
}: {
  defaultDescription: string;
}) => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const handleEditorChange = (value: string) => {
    setValue('description', value);
  };

  return (
    <div className="flex flex-col mt-8">
      <p className="text-xl font-bold mb-4">Title</p>
      <input
        type="text"
        placeholder="Example: Blochain Architect and Full Stack Developer"
        className="input input-bordered w-full"
      />
      <p className="text-xl font-bold mt-8 mb-4" {...register('title')}>
        Profile overview
      </p>
      <Controller
        name="description"
        control={control}
        render={() => (
          <RichTextEditor
            description={defaultDescription}
            onChange={handleEditorChange}
            placeholder="Write a detailed description about yourself, your skills, and your experience"
          />
        )}
      />
      <p className="text-lg mt-4 text-red-500">{errors.description?.message}</p>
    </div>
  );
};
