'use client';

import type { MouseEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import type { JobCategory } from '@/types/jobs';

import type { ProfileFormValues } from './ProfileFormProvider';

export const SkillsSelector = ({
  categories,
}: {
  categories: JobCategory[];
}) => {
  const { register, watch, setValue } = useFormContext<ProfileFormValues>();

  const selectedSkills = watch('skills') || [];
  const selectedCategory = watch('category');

  const skills =
    categories.find((category) => category.id === selectedCategory)?.skills ||
    [];

  const handleSkillClick = (e: MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const skill = e.currentTarget.id;

    if (selectedSkills.includes(skill)) {
      const newSkills = selectedSkills.filter((s) => s !== skill);
      setValue('skills', newSkills);
    } else {
      setValue('skills', [...selectedSkills, skill]);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap mt-4">
      {skills.map((skill) => (
        <label
          key={skill.id}
          id={skill.id}
          className={clsx(
            'btn btn-neutral btn-sm w-fit',
            !selectedSkills.includes(skill.id) && 'btn-outline',
          )}
          onClick={handleSkillClick}
        >
          <input
            {...register('skills')}
            type="checkbox"
            className="hidden"
            value={skill.id}
            checked={selectedSkills.includes(skill.id)}
          />
          {skill.name}
        </label>
      ))}
    </div>
  );
};
