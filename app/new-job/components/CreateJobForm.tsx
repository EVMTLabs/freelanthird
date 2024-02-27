"use client";

import { useContext } from "react";

import {
  CreateJobFormSteps,
  JobFormContext,
} from "../context/CreateJobContext";

import { CreateJobFirstStep } from "./CreateJobFirstStep";
import { CreateJobFifthStep } from "./CreateJobFithStep";
import { CreateJobFourthStep } from "./CreateJobFourthStep";
import { CreateJobSecondStep } from "./CreateJobSecondStep";
import { CreateJobThirdStep } from "./CreateJobThirdStep";

export const CreateJobForm = () => {
  const { formStep } = useContext(JobFormContext);
  return (
    <>
      {formStep === CreateJobFormSteps.FIRST_STEP && <CreateJobFirstStep />}
      {formStep === CreateJobFormSteps.SECOND_STEP && <CreateJobSecondStep />}
      {formStep === CreateJobFormSteps.THIRD_STEP && <CreateJobThirdStep />}
      {formStep === CreateJobFormSteps.FOURTH_STEP && <CreateJobFourthStep />}
      {formStep === CreateJobFormSteps.FIFTH_STEP && <CreateJobFifthStep />}
    </>
  );
};
