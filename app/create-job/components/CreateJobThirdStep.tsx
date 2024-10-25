'use client';

import type { MouseEvent } from 'react';
import { useContext, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { JobFormContext } from '../context/CreateJobContext';

export const CreateJobThirdStep = () => {
  const { jobValues, categories, setJobValues, goNextStep, goBackStep } =
    useContext(JobFormContext);

  const { handleSubmit, register, setValue, watch } = useForm<{
    skills: string[];
  }>({
    defaultValues: {
      skills: jobValues.skills,
    },
  });

  const selectedSkills = watch('skills');

  const onSubmit = handleSubmit((data) => {
    setJobValues({
      ...jobValues,
      ...data,
    });
    return goNextStep();
  });

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

  const skills = useMemo(
    () => categories.find((c) => c.id === jobValues.category)?.skills || [],
    [],
  );

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full">
      <p className="text-lg mb-2 font-extrabold">
        Select the skills required for this job
      </p>
      <div className="flex gap-2 flex-wrap">
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
      <p className="text-gray-500 my-4">
        If the skill you are looking for is not listed, you can skip this step
      </p>
      <div className="flex w-full justify-between mt-8">
        <button
          type="button"
          onClick={goBackStep}
          className="btn btn-outline btn-neutral mt-6 w-32"
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary mt-6 w-32">
          Next Scope
        </button>
      </div>
    </form>
  );
};
