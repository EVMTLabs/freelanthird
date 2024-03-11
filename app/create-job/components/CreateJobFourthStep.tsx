'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { JobFormContext } from '../context/CreateJobContext';

export const CreateJobFourthStep = () => {
  const { jobValues, setJobValues, goNextStep, goBackStep } =
    useContext(JobFormContext);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      size: jobValues.size,
      duration: jobValues.duration,
      experience: jobValues.experience,
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
      <p className="text-lg mb-2 font-extrabold">Select your project size</p>
      <label className="label justify-start">
        <input
          type="radio"
          value="large"
          className="radio radio-neutral border-neutral"
          {...register('size')}
        />
        <span className="text-xl font-medium ml-3">Large</span>
      </label>
      <p className="ml-10 mb-6">
        Complex initiatives with 5 or more team members
      </p>
      <label className="label justify-start">
        <input
          type="radio"
          value="medium"
          className="radio radio-neutral border-neutral"
          {...register('size')}
        />
        <span className="text-xl font-medium ml-3">Medium</span>
      </label>
      <p className="ml-10 mb-6">Projects with a defined scope and team</p>
      <label className="label justify-start">
        <input
          type="radio"
          value="small"
          className="radio radio-neutral border-neutral"
          {...register('size')}
        />
        <span className="text-xl font-medium ml-3">Small</span>
      </label>
      <p className="ml-10">Projects that requires an specific skill or task</p>
      <p className="text-lg mt-10 mb-2 font-extrabold">
        How long will this job last?
      </p>
      <label className="label justify-start">
        <input
          type="radio"
          value="long_term"
          className="radio radio-neutral border-neutral"
          {...register('duration')}
        />
        <span className="text-xl font-medium ml-3">More than 6 months</span>
      </label>
      <label className="label justify-start">
        <input
          type="radio"
          value="medium_term"
          className="radio radio-neutral border-neutral"
          {...register('duration')}
        />
        <span className="text-xl font-medium ml-3">3 to 6 months</span>
      </label>
      <label className="label justify-start">
        <input
          type="radio"
          value="short_term"
          className="radio radio-neutral border-neutral"
          {...register('duration')}
        />
        <span className="text-xl font-medium ml-3">1 to 3 months</span>
      </label>
      <p className="text-lg mt-10 mb-2 font-extrabold">
        What is the necessary experience for this job?
      </p>
      <label className="label justify-start">
        <input
          type="radio"
          value="junior"
          className="radio radio-neutral border-neutral"
          {...register('experience')}
        />
        <span className="text-xl font-medium ml-3">Junior</span>
      </label>
      <p className="ml-10 mb-6">Entry level job for beginners</p>
      <label className="label justify-start">
        <input
          type="radio"
          value="middle"
          className="radio radio-neutral border-neutral"
          {...register('experience')}
        />
        <span className="text-xl font-medium ml-3">Middle</span>
      </label>
      <p className="ml-10 mb-6">Experienced professionals</p>
      <label className="label justify-start">
        <input
          type="radio"
          value="senior"
          className="radio radio-neutral border-neutral"
          {...register('experience')}
        />
        <span className="text-xl font-medium ml-3">Senior</span>
      </label>
      <p className="ml-10">Experts in the field</p>
      <div className="flex w-full justify-between mt-8">
        <button
          type="button"
          onClick={goBackStep}
          className="btn btn-outline btn-neutral mt-6 w-32"
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary mt-6 w-32">
          Next Budget
        </button>
      </div>
    </form>
  );
};
