'use client';

import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { updateUserInfo } from '@/actions/users';
import { useSession } from '@/context/SessionContext';
import type { BasicUserInfo } from '@/types/users';

interface NewUserContextProps {
  newUserValues: BasicUserInfo;
  setNewUserValues: Dispatch<SetStateAction<BasicUserInfo>>;
  formStep: number;
  goBackStep: () => void;
  goNextStep: () => void;
  submitNewUser: () => void;
  isLoading?: boolean;
}

export enum CreateNewUserFormSteps {
  FIRST_STEP,
  SECOND_STEP,
  THIRD_STEP,
  FOURTH_STEP,
  FIFTH_STEP,
}

const DEFAULT_NEW_USER_VALUES: BasicUserInfo = {
  username: '',
  name: '',
  isFreelancer: false,
};

export const NewUserContext = createContext<NewUserContextProps>({
  newUserValues: DEFAULT_NEW_USER_VALUES,
  setNewUserValues: () => {},
  formStep: CreateNewUserFormSteps.FIRST_STEP,
  goBackStep: () => {},
  goNextStep: () => {},
  submitNewUser: () => {},
});

export const NewUserFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { isProfileCompleted, session, setSession } = useSession();

  const [newUserValues, setNewUserValues] = useState<BasicUserInfo>({
    ...DEFAULT_NEW_USER_VALUES,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(0);

  useEffect(() => {
    if (!session?.isLoggedIn || isProfileCompleted) {
      router.replace('/');
    }
  }, [isProfileCompleted, session?.isLoggedIn]);

  const goBackStep = () => {
    if (formStep === CreateNewUserFormSteps.FIRST_STEP) {
      return null;
    }
    return setFormStep((prev) => prev - 1);
  };

  const goNextStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const submitNewUser = async () => {
    try {
      setIsLoading(true);
      const newSession = await updateUserInfo({
        ...newUserValues,
      });
      setSession(newSession);
      router.replace('/');
    } catch (error) {
      console.error('Error creating job', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NewUserContext.Provider
      value={{
        newUserValues,
        setNewUserValues,
        formStep,
        goBackStep,
        goNextStep,
        submitNewUser,
        isLoading,
      }}
    >
      {children}
    </NewUserContext.Provider>
  );
};

export const useNewUserFormContext = () => useContext(NewUserContext);
