'use client';

import { useFormContext } from 'react-hook-form';
import { Info } from 'lucide-react';

import type { ProfileFormValues } from './ProfileFormProvider';

export const ProfileAlert = ({ isComplete }: { isComplete: boolean }) => {
  const { getValues } = useFormContext<ProfileFormValues>();

  const hasValues = Object.values(getValues()).every((value) => value);

  if (isComplete || hasValues) {
    return null;
  }

  return (
    <div role="alert" className="alert mb-6">
      <Info size={24} className="stroke-info" />
      <span>Complete your profile in full to make it visible to others.</span>
    </div>
  );
};
