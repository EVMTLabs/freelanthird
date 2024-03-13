'use client';

import { useContext, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { z } from 'zod';

import { JobFormContext } from '../context/CreateJobContext';

const schema = z.object({
  title: z
    .string({
      required_error: 'Job title is required',
      invalid_type_error: 'Invalid job title type',
    })
    .min(6, { message: 'Please provide a more descriptive job title.' })
    .max(80, { message: 'Job title is too long' })
    .refine((value) => /^[a-zA-Z0-9 ]*$/.test(value), {
      message: 'Job title should not contain symbols',
    }),
  category: z.string(),
});

export const CreateJobFirstStep = () => {
  const { jobValues, categories, setJobValues, goNextStep, goBackStep } =
    useContext(JobFormContext);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: jobValues.title,
      category: jobValues.category,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const onSubmit = handleSubmit((data) => {
    setJobValues({
      ...jobValues,
      ...data,
    });

    return goNextStep();
  });

  const selectedCategory = watch('category');
  const selectedCategoryName = useMemo(
    () => categories.find((c) => selectedCategory === c.id)?.name,
    [selectedCategory, categories],
  );

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full">
      <p className="text-lg mb-2 font-extrabold">Write a title for your job</p>
      <input
        type="text"
        placeholder="Type here"
        className={clsx(
          'input input-bordered w-full',
          errors.title && 'input-error',
        )}
        defaultValue={jobValues.title}
        autoFocus
        {...register('title')}
      />
      {errors.title && (
        <p className="text-error mt-2">{errors.title.message}</p>
      )}
      <p className="text-gray-500 my-4">
        {`This job will appear in ${selectedCategoryName} category`}
      </p>
      <p className="text-lg mb-2 mt-4 font-extrabold">Job Category</p>
      <div className="flex flex-col gap-2 form-control mt-2">
        {categories.map(({ id, name }) => (
          <label key={id} className="label justify-start" htmlFor={id}>
            <input
              type="radio"
              id={id}
              value={id}
              className="radio radio-neutral border-neutral"
              {...register('category')}
            />
            <span className="label-text ml-3">{name}</span>
          </label>
        ))}
      </div>
      <div className="flex w-full justify-between mt-8">
        <button
          type="button"
          className="btn btn-outline btn-neutral mt-6 w-32"
          onClick={goBackStep}
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary mt-6 w-fit">
          Next Description
        </button>
      </div>
    </form>
  );
};
