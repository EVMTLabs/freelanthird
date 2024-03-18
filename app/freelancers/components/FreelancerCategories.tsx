'use client';

import { useFreelancerStore } from '@/stores/useFreelancerStore';
import type { JobCategory } from '@/types/jobs';

export const FreelancerCategories = ({
  categories,
}: {
  categories: JobCategory[];
}) => {
  const { filterByCategory } = useFreelancerStore();

  const handleCategoryChange = (id: string) => {
    filterByCategory(id);
  };

  return (
    <ul className="form-control my-4">
      {categories.map((category) => (
        <li key={category.id}>
          <label className="label cursor-pointer justify-start">
            <input
              type="checkbox"
              className="checkbox checkbox-primary border-neutral"
              onChange={() => handleCategoryChange(category.id)}
            />
            <span className="label-text ml-4">{category.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};
