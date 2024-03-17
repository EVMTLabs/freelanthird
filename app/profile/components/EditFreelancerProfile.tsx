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
    setValue,
    control,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const handleEditorChange = (value: string) => {
    setValue('description', value);
  };

  return (
    <>
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
    </>
  );
};
