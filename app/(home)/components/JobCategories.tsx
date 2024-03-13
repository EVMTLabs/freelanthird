'use client';

import type { JobCategory } from '@/types/jobs';

export const JobCategories = ({
  categories,
}: {
  categories: JobCategory[];
}) => {
  return (
    <ul className="form-control my-4">
      {categories.map((category) => (
        <li key={category.id}>
          <label className="label cursor-pointer justify-start">
            <input
              type="checkbox"
              className="checkbox checkbox-primary border-neutral"
            />
            <span className="label-text ml-4">{category.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};
