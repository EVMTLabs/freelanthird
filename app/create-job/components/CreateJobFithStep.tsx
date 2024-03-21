'use client';

import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { createJob } from '@/actions/jobs';

import { JobFormContext } from '../context/CreateJobContext';

const schema = z.object({
  minPrice: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .int()
      .min(10, { message: 'Minimum price is $10' })
      .max(999998, { message: 'Maximum price is $999999' }),
  ),
  maxPrice: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .int()
      .min(10, { message: 'Minimum price is $10' })
      .max(999999, { message: 'Maximum price is $999999' }),
  ),
});

export const CreateJobFifthStep = () => {
  const { jobValues, goBackStep } = useContext(JobFormContext);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      minPrice: jobValues.minPrice,
      maxPrice: jobValues.maxPrice,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const minPrice = Number(data.minPrice);
    const maxPrice = Number(data.maxPrice);

    if (minPrice > maxPrice) {
      return setError('minPrice', {
        type: 'manual',
        message: 'Minimum price should be less than maximum price',
      });
    }

    try {
      setIsLoading(true);
      await createJob({ ...jobValues, minPrice, maxPrice });
      router.replace('/');
    } catch (error) {
      console.error('Error creating job', error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full">
      <p className="text-lg mb-4 font-extrabold">Project budget range</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className={clsx(
              'input input-bordered flex items-center gap-2',
              errors.minPrice && 'input-error',
            )}
          >
            <DollarSign />
            <input
              type="number"
              className="grow"
              placeholder="From"
              {...register('minPrice')}
            />
          </label>
          {errors.minPrice && (
            <p className="text-red-500 text-md mt-1">
              {errors.minPrice.message}
            </p>
          )}
        </div>
        <div>
          <label
            className={clsx(
              'input input-bordered flex items-center gap-2',
              errors.minPrice && 'input-error',
            )}
          >
            <DollarSign />
            <input
              type="number"
              className="grow"
              placeholder="To"
              {...register('maxPrice')}
            />
          </label>
          {errors.maxPrice && (
            <p className="text-red-500 text-md mt-1">
              {errors.maxPrice.message}
            </p>
          )}
        </div>
      </div>
      <p className="text-gray-500 my-4">
        To make things easier, we only show rounded prices in USD
      </p>
      <div className="flex w-full justify-between mt-8">
        <button
          onClick={goBackStep}
          type="button"
          className="btn btn-outline btn-neutral mt-6 w-32"
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary btn-square mt-6 w-32">
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span> Creating
            </>
          ) : (
            'Create Job'
          )}
        </button>
      </div>
    </form>
  );
};
