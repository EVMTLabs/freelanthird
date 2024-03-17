'use client';

import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Eye } from 'lucide-react';

import { updateUserVisibility } from '@/actions/users';

import type { ProfileFormValues } from './ProfileFormProvider';

export const ToggleVisibility = () => {
  const { getValues, setValue } = useFormContext<ProfileFormValues>();
  const { isComplete, visible } = getValues();

  const [isVisible, setIsVisible] = useState(visible);

  const handleToggle = async () => {
    if (!isComplete) {
      toast.error('Complete your profile to make it visible to others');
      return;
    }

    try {
      setIsVisible(!isVisible);
      await updateUserVisibility(!isVisible);
      setValue('visible', !isVisible);
      toast.success('Profile updated');
    } catch (error) {
      setIsVisible(!isVisible);
      console.error(error);
      toast.error('Failed to update profile');
    }
  };

  useEffect(() => {
    if (isComplete && visible !== undefined) setIsVisible(visible);
  }, [isComplete]);

  const tooltip = useMemo(
    () =>
      !isComplete
        ? 'Complete your profile to make it visible'
        : isVisible
          ? 'Your profile is visible'
          : 'Your profile is hidden',
    [isComplete, isVisible],
  );

  return (
    <>
      <div className="flex w-full justify-between items-center text-lg">
        <div className="flex gap-1 items-center text-gray-500">
          <Eye size={18} />
          <p>Visibility</p>
        </div>
        <div className="tooltip tooltip-bottom" data-tip={tooltip}>
          <input
            type="checkbox"
            className="toggle"
            disabled={!isComplete}
            onChange={handleToggle}
            checked={isVisible}
          />
        </div>
      </div>
      <Toaster />
    </>
  );
};
