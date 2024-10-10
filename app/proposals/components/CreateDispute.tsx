'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { Flag, X } from 'lucide-react';
import { z } from 'zod';

import { createDispute } from '@/actions/proposals';

type DisputeFormValues = {
  proposalId: string;
  description: string;
};

const schema = z.object({
  proposalId: z.string(),
  description: z
    .string()
    .min(10, {
      message: 'Description is too short',
    })
    .max(1500, {
      message: 'Description is too long',
    }),
});

interface CreateDisputeProps {
  proposalId: string;
  disputeId: string | undefined;
}

export const CreateDispute = ({
  proposalId,
  disputeId,
}: CreateDisputeProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [error, setError] = useState('');

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DisputeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      proposalId,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (isSubmitting) return;

    setError('');

    try {
      await createDispute({
        ...data,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) setError(error.message);
    }
  });

  if (disputeId) {
    return (
      <>
        <button
          onClick={openModal}
          className="btn btn-square btn-sm btn-outline btn-error"
        >
          <Flag size={18} />
        </button>
        <dialog className="modal" ref={modalRef}>
          <div className="modal-box">
            <div className="flex justify-between items-center pb-4 border-b">
              <h1 className="font-bold text-2xl">Dispute #{disputeId}</h1>
              <button onClick={closeModal}>
                <X />
              </button>
            </div>
            <p className="text-lg text-gray-500 mt-4">
              This proposal is currently under dispute. To initiate the claim
              process, please open a ticket on our Discord server and provide us
              with the code below
            </p>
            <div className="badge badge-ghost text-xl font-bold mt-4">
              {disputeId}
            </div>
          </div>
        </dialog>
      </>
    );
  }

  return (
    <>
      <button
        onClick={openModal}
        className="btn btn-square btn-sm btn-outline btn-error"
      >
        <Flag size={18} />
      </button>
      <dialog className="modal" ref={modalRef}>
        <div className="modal-box">
          <div className="flex justify-between items-center pb-4 border-b">
            <h1 className="font-bold text-2xl">Open dispute</h1>
            <button onClick={closeModal}>
              <X />
            </button>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col py-4">
            <textarea
              placeholder="Enter a detailed description of the dispute"
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
            {error && <p className="text-red-500 text-md mt-3">{error}</p>}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-error">
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span> Sending
                  </>
                ) : (
                  'Send dispute'
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
