'use client';

import {
  CreateNewUserFormSteps,
  useNewUserFormContext,
} from '../context/NewUserContext';

import { CreateFreelancerProfileStep } from './CreateFreelancerProfileStep';
import { CreateNameStep } from './CreateNameStep';
import { CreateNewAvatarStep } from './CreateNewAvatarStep';
import { CreateUserNameStep } from './CreateUserNameStep';

export const CreateNewUserForm = () => {
  const { formStep } = useNewUserFormContext();

  return (
    <>
      {formStep === CreateNewUserFormSteps.FIRST_STEP && <CreateUserNameStep />}
      {formStep === CreateNewUserFormSteps.SECOND_STEP && <CreateNameStep />}
      {formStep === CreateNewUserFormSteps.THIRD_STEP && (
        <CreateNewAvatarStep />
      )}
      {formStep === CreateNewUserFormSteps.FOURTH_STEP && (
        <CreateFreelancerProfileStep />
      )}
    </>
  );
};
