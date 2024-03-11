'use client';

import { useMemo } from 'react';
import { useAccount } from 'wagmi';

import { useMounted } from '@/hooks/common/useMounted';
import { truncateEthAddress } from '@/utils/truncateEthAddress';

import { useNewUserFormContext } from '../context/NewUserContext';

export const NewUserStepInfo = () => {
  const { formStep } = useNewUserFormContext();
  const { address } = useAccount();

  const isMounted = useMounted();

  const steps = useMemo(
    () => [
      {
        title: 'A username to rule them all',
        subTitle: 'Username',
        description: isMounted
          ? `Let's be honest, it's dificult to recognize you by your address ${truncateEthAddress(address)}. With a username other users will be able to find you easily.`
          : '',
      },
      {
        title: `What's your name?`,
        subTitle: 'Name & Email',
        description:
          'We would like to know your name, so we can address you properly.',
      },
      {
        title: `An image is worth a thousand words`,
        subTitle: 'Avatar',
        description:
          'A profesional photo will help you to reach other users and make your profile more trustable.',
      },
      {
        title: `How are you going to use Freelanthird?`,
        subTitle: 'Profile',
        description:
          'If you are freelancer, here you can complete your profile with your skills and portfolio.',
      },
    ],
    [address, isMounted],
  );

  return (
    <div className="flex flex-col border-r-2 pr-6">
      <p className="text-sm mb-2">
        {formStep + 1}/4{' '}
        <span className="ml-2">{steps[formStep].subTitle}</span>
      </p>
      <h1 className="text-4xl font-extrabold">{steps[formStep].title}</h1>
      {
        <p className="text-lg font-medium mt-4">
          {steps[formStep].description}
        </p>
      }
    </div>
  );
};
