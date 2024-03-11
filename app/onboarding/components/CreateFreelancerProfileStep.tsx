'use client';

import { useForm } from 'react-hook-form';

import { useNewUserFormContext } from '../context/NewUserContext';

type FormValues = {
  isFreelancer: string;
};

export const CreateFreelancerProfileStep = () => {
  const {
    newUserValues,
    submitNewUser,
    goBackStep,
    setNewUserValues,
    isLoading,
  } = useNewUserFormContext();

  const methods = useForm<FormValues>({
    defaultValues: {
      isFreelancer: newUserValues.isFreelancer.toString(),
    },
  });

  const { register, handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    setNewUserValues((prev) => ({
      ...prev,
      isFreelancer: data.isFreelancer === 'true',
    }));
    return submitNewUser();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full">
      <p className="text-lg mb-2 font-extrabold">Are you a freelancer?</p>
      <div className="flex gap-8">
        <label className="label justify-start">
          <input
            type="radio"
            value="false"
            className="radio radio-neutral border-neutral"
            {...register('isFreelancer')}
          />
          <span className="text-xl font-medium ml-3">I want to hire</span>
        </label>
        <label className="label justify-start">
          <input
            type="radio"
            value="true"
            className="radio radio-neutral border-neutral"
            {...register('isFreelancer')}
          />
          <span className="text-xl font-medium ml-3">
            I&apos;m a freelancer
          </span>
        </label>
      </div>
      <p className="text-sm mt-2 text-gray-500">
        If you are a freelancer and want to appear in the freelancer section you
        will need to fill out your profile.
      </p>
      <div className="flex w-full justify-between mt-8">
        <button
          type="button"
          className="btn btn-outline btn-neutral mt-6 w-32"
          onClick={goBackStep}
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary btn-square mt-6 w-32">
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span> Creating
            </>
          ) : (
            'Finish profile'
          )}
        </button>
      </div>
    </form>
  );
};
