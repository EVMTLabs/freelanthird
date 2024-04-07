'use client';

import { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useModal } from 'connectkit';
import {
  BadgeCheck,
  Copy,
  CopyCheck,
  DollarSign,
  ReceiptText,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { z } from 'zod';

import { createProposal } from '@/actions/proposals';
import { useClipboard } from '@/hooks/common/useClipBoard';
import { useSession } from '@/hooks/session/useSession';
import { getBaseURL } from '@/utils/getBaseUrl';

type ProposalFormValues = {
  title: string;
  description: string;
  amount: number;
  freelancerAddress: string;
  jobId?: string;
};

const schema = z.object({
  title: z.string().min(5, { message: 'Title is too short' }).max(80),
  description: z
    .string()
    .min(10, {
      message: 'Description is too short',
    })
    .max(1500, {
      message: 'Description is too long',
    }),
  amount: z
    .number()
    .int('Minimum price is $10')
    .min(10, { message: 'Minimum price is $10' })
    .max(999999, { message: 'Maximum price is $999999' }),
  freelancerAddress: z.string().min(10).max(50),
  jobId: z.string().min(10).max(50).optional(),
});

export const CreateProposal = ({
  jobId,
  btnClass,
  btnText,
  showIcon = false,
}: {
  jobId?: string;
  btnClass?: string;
  btnText?: React.ReactNode | string;
  showIcon?: boolean;
}) => {
  const { session } = useSession();
  const { address: freelancerAddress } = useAccount();
  const { open, setOpen } = useModal();

  const [proposalId, setProposalId] = useState('');
  const [error, setError] = useState('');

  const proposalLink = useMemo(
    () => (proposalId ? `${getBaseURL()}/proposals/${proposalId}` : ''),
    [proposalId],
  );

  const { onCopy, hasCopied } = useClipboard(proposalLink);

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProposalFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      freelancerAddress,
      jobId,
    },
  });

  const openModal = () => {
    if (!open && (!session || !session.isLoggedIn)) {
      return setOpen(true);
    }
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isSubmitting) return;

    setError('');

    try {
      const proposal = await createProposal({
        ...data,
      });
      setProposalId(proposal.id);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) setError(error.message);
    }
  });

  return (
    <>
      <button
        onClick={openModal}
        className={clsx(btnClass ?? 'btn btn-primary w-full mt-4')}
      >
        {showIcon && <ReceiptText />}
        {btnText ?? 'Create Proposal'}
      </button>
      <dialog className="modal" ref={modalRef}>
        <div className="modal-box">
          <div className="flex justify-between items-center pb-4 border-b">
            <h1 className="font-bold text-2xl">
              {proposalId ? 'Proposal sent' : 'Create proposal'}
            </h1>
            <button onClick={closeModal}>
              <X />
            </button>
          </div>
          {!proposalId ? (
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
          ) : (
            <div className="flex flex-col items-center justify-center my-10">
              <div className="p-5 bg-green-100 rounded-full">
                <BadgeCheck size={64} className="text-green-500" />
              </div>
              <h2 className="font-extrabold text-2xl mt-4">Success!</h2>
              <p className="text-lg text-center mt-1 px-8 mb-6">
                Your proposal has been created successfully. View your proposal
                or copy the link and share it with the client.
              </p>
              <div className="flex w-full justify-around modal-action">
                <div
                  className={clsx(hasCopied ? 'tooltip tooltip-open' : '')}
                  data-tip="Copied!"
                >
                  <button className="btn btn-outline" onClick={onCopy}>
                    {hasCopied ? <CopyCheck /> : <Copy />} Copy link
                  </button>
                </div>
                <Link
                  href={`/proposals/${proposalId}`}
                  className="btn btn-primary"
                >
                  View proposal
                </Link>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};
