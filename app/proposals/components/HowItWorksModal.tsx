'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';
import Image from 'next/image';

export const HowItWorksModal = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [step, setStep] = useState(1);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const nextStep = () => {
    if (step === 3) {
      setStep(1);
      return closeModal();
    }
    return setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step === 1) {
      return closeModal();
    }
    return setStep((prev) => prev - 1);
  };

  const stepsInfo = [
    {
      image: '/images/payment-methods.webp',
      content: (
        <p className="max-w-sm mt-2 text-lg text-center mx-auto">
          First select your favorite payment method and pay the amount using
          your favorite wallet. <br /> This amount will be locked until the work
          is approved by you.
        </p>
      ),
    },
    {
      image: '/images/approve-work.webp',
      content: (
        <p className="max-w-sm mt-2 text-lg text-center mx-auto">
          Once the work is done, you can approve it and release the funds to the
          freelancer. <br /> If you are not satisfied with the work, you can
          always raise a dispute. And we will help you to resolve it.
        </p>
      ),
    },
  ];

  return (
    <>
      <button
        className="btn btn-link no-underline text-base-content text-lg"
        onClick={openModal}
      >
        How It Works?
      </button>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-backdrop" onClick={closeModal} />

        <div className="modal-box">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg">How it works?</h1>
            <button onClick={closeModal}>
              <X />
            </button>
          </div>
          <ul className="steps w-full my-8">
            <li className="step step-primary">Payment Lock</li>
            <li className={clsx('step', step > 1 && 'step-primary')}>
              Approve Work
            </li>
            <li className={clsx('step', step > 2 && 'step-primary')}>
              Funds Release
            </li>
          </ul>
          <div className="flex flex-col gap-4 justify-center items-center pb-8">
            <Image
              alt="payment methods"
              src={stepsInfo[step - 1].image}
              width={240}
              height={240}
            />
          </div>
          {stepsInfo[step - 1].content}
          <div className="modal-action justify-between">
            <button className="btn" onClick={prevStep}>
              Back
            </button>
            <button className="btn btn-primary" onClick={nextStep}>
              {step === 3 ? 'Close' : 'Next'}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
