'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { z } from 'zod';

import { checkIfUsernameExists } from '@/actions/users';

import { useNewUserFormContext } from '../context/NewUserContext';

type FormValues = {
  username: string;
};

const schema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long')
    .trim()
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers and underscores',
    ),
});

export const CreateUserNameStep = () => {
  const { goNextStep, setNewUserValues } = useNewUserFormContext();

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const userNameExists = await checkIfUsernameExists(data.username);

    console.log(userNameExists);

    if (userNameExists) {
      setError('username', {
        type: 'manual',
        message: 'Username already exists',
      });
      return null;
    }

    setNewUserValues((prev) => ({
      ...prev,
      ...data,
    }));

    return goNextStep();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full">
      <p className="text-lg mb-2 font-extrabold">Username</p>
      <input
        type="text"
        placeholder="Type here"
        className={clsx(
          'input input-bordered w-full',
          errors.username && 'input-error',
        )}
        autoFocus
        {...register('username')}
      />
      {errors.username && (
        <p className="text-error mt-2">{errors.username.message}</p>
      )}
      <div className="flex w-full justify-end mt-8">
        <button type="submit" className="btn btn-primary mt-6 w-32">
          Next
        </button>
      </div>
    </form>
  );
};
