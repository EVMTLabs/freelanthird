'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { z } from 'zod';

import { useNewUserFormContext } from '../context/NewUserContext';

type FormValues = {
  name: string;
  email: string;
};

const schema = z.object({
  name: z
    .string()
    .min(1, 'Your name seems too short')
    .max(20, 'Your name seems too long'),
  email: z
    .union([z.string(), z.string().email()])
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
});

export const CreateNameStep = () => {
  const { goNextStep, goBackStep, setNewUserValues } = useNewUserFormContext();

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    setNewUserValues((prev) => ({
      ...prev,
      ...data,
    }));
    return goNextStep();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full">
      <p className="text-lg mb-2 font-extrabold">Name</p>
      <input
        type="text"
        placeholder="Type here"
        className={clsx(
          'input input-bordered w-full',
          errors.name && 'input-error',
        )}
        autoFocus
        {...register('name')}
      />
      {errors.name && (
        <p className="text-error mt-2">
          {typeof errors.name.message === 'string' ? errors.name.message : ''}
        </p>
      )}
      <p className="text-lg mt-10 mb-2 font-extrabold">Email (optional)</p>
      <input
        type="email"
        placeholder="remotework@freelanthird.com"
        className="input input-bordered w-full"
        {...register('email')}
      />
      {errors.email && (
        <p className="text-error mt-2">
          {typeof errors.email.message === 'string' ? errors.email.message : ''}
        </p>
      )}
      <p className="text-sm mt-2 text-gray-500">
        Your email will be used only to send you new messages or proposals
        notifications, we will never share it with anyone or use it for spam.
      </p>
      <div className="flex w-full justify-between mt-8">
        <button
          type="button"
          className="btn btn-outline btn-neutral mt-6 w-32"
          onClick={goBackStep}
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary mt-6 w-32">
          Next
        </button>
      </div>
    </form>
  );
};
