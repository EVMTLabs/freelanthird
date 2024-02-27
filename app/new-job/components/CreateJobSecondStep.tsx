'use client';

import { useContext } from 'react';
import { Controller,useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { RichTextEditor } from '@/components/RichTextEditor/RichTextEditor';

import { JobFormContext } from '../context/CreateJobContext';

const schema = z.object({
  description: z
    .string({
      required_error: 'Job description is required',
      invalid_type_error: 'Invalid job description type',
    })
    .min(50, {
      message:
        "To attract the right candidates, please offer a more comprehensive overview of the job's responsibilities and criteria.",
    })
    .max(5000, {
      message:
        'Your job description is over the limit; please trim it to 5000 characters or less.',
    }),
});

export const CreateJobSecondStep = () => {
  const { jobValues, setJobValues, goNextStep, goBackStep } =
    useContext(JobFormContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{
    description: string;
  }>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: jobValues.description,
    },
  });

  const onSubmit = handleSubmit((data) => {
    setJobValues({
      ...jobValues,
      ...data,
    });
    return goNextStep();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full">
      <p className="text-lg mb-2 font-extrabold">Detailed job description</p>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <RichTextEditor
            onChange={(value) => field.onChange(value)}
            description={jobValues.description}
          />
        )}
      />
      {errors.description && (
        <p className="text-red-500 mt-2">{errors.description.message}</p>
      )}
      <div className="flex w-full justify-between mt-8">
        <button
          type="button"
          onClick={goBackStep}
          className="btn btn-outline btn-neutral mt-6 w-32"
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary mt-6 w-32">
          Next Skills
        </button>
      </div>
    </form>
  );
};
