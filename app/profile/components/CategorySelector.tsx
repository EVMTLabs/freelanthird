'use client';

import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import type { JobCategory } from '@/types/jobs';

import type { ProfileFormValues } from './ProfileFormProvider';

export const CategorySelector = ({
  categories,
}: {
  categories: JobCategory[];
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <>
      <select
        className={clsx(
          'select select-bordered w-full max-w-xs',
          errors.category?.message && 'border-red-500',
        )}
        {...register('category')}
      >
        <option value="" disabled>
          Select your category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <p className="text-lg mt-2 text-red-500">{errors.category?.message}</p>
    </>
  );
};
