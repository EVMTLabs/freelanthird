'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { DollarSign, X } from 'lucide-react';
import { useAccount } from 'wagmi';
import { z } from 'zod';

import { createProposal } from '@/actions/proposals';

type ProposalFormValues = {
  title: string;
  description: string;
  amount: number;
  clientAddress: string;
  freelancerAddress: string;
  jobId?: string;
};

const schema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title is too short' })
    .max(80)
    .refine((value) => /^[a-zA-Z0-9 @.-]*$/.test(value), {
      message: 'Only letters, numbers, and @.- are allowed',
    }),
  description: z
    .string()
    .min(10, {
      message: 'Description is too short',
    })
    .max(1500, {
      message: 'Description is too long',
    })
    .refine((value) => /^[a-zA-Z0-9 @.-]*$/.test(value), {
      message: 'Only letters, numbers, and @.- are allowed',
    }),
  amount: z
    .number()
    .int('Minimum price is $10')
    .min(10, { message: 'Minimum price is $10' })
    .max(999999, { message: 'Maximum price is $999999' }),
  clientAddress: z.string().min(10).max(50),
  freelancerAddress: z.string().min(10).max(50),
  jobId: z.string().min(10).max(50).optional(),
});

export const CreateProposal = ({
  jobId,
  clientAddress,
}: {
  jobId: string;
  clientAddress: string;
}) => {
  const { address: freelancerAddress } = useAccount();
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProposalFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      clientAddress,
      freelancerAddress,
      jobId,
    },
  });

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isSubmitting) return;

    setError('');

    try {
      await createProposal({
        ...data,
      });
      closeModal();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) setError(error.message);
    }
  });

  return (
    <>
      <button className="btn btn-primary w-full" onClick={openModal}>
        Create Proposal
      </button>
      <dialog className="modal" ref={modalRef}>
        <div className="modal-box">
          <div className="flex justify-between items-center pb-4 border-b">
            <h1 className="font-bold text-2xl">Create proposal</h1>
            <button onClick={closeModal}>
              <X />
            </button>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col py-4">
            <p className="text-lg font-bold mb-1">Title</p>
            <input
              type="text"
              className={clsx(
                'input input-bordered w-full',
                errors.title && 'input-error',
              )}
              {...register('title')}
            />
            {errors.title && (
              <p className="text-red-500 text-md mt-1">
                {errors.title.message}
              </p>
            )}
            <p className="text-lg font-bold mt-6 mb-1">Description</p>
            <textarea
              className={clsx(
                'textarea textarea-bordered w-full',
                errors.description && 'textarea-error',
              )}
              {...register('description')}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-md mt-1">
                {errors.description.message}
              </p>
            )}
            <p className="text-lg font-bold mt-6 mb-1">Amount</p>
            <label
              className={clsx(
                'input input-bordered flex items-center',
                errors.amount && 'input-error',
              )}
            >
              <DollarSign className="mr-2" />
              <input
                type="number"
                className="grow"
                placeholder="1000"
                {...register('amount', {
                  setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10)),
                })}
              />
            </label>
            {errors.amount && (
              <p className="text-red-500 text-md mt-1">
                {errors.amount.message}
              </p>
            )}
            {error && <p className="text-red-500 text-md mt-3">{error}</p>}
            <button type="submit" className="btn btn-primary mt-10">
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span> Sending
                </>
              ) : (
                'Send Proposal'
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};
