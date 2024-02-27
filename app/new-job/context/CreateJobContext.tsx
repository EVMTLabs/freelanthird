'use client';

import { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import { createJob } from '../actions';

export interface JobFormValues {
  title: string;
  description: string;
  category: string;
  skills: string[];
  size: string;
  duration: string;
  experience: string;
  minPrice?: number;
  maxPrice?: number;
}

interface JobFormContextProps {
  jobValues: JobFormValues;
  setJobValues: (values: JobFormValues) => void;
  formStep: number;
  goBackStep: () => void;
  goNextStep: () => void;
  submitJob: () => void;
  isLoading?: boolean;
}

export enum CreateJobFormSteps {
  FIRST_STEP,
  SECOND_STEP,
  THIRD_STEP,
  FOURTH_STEP,
  FIFTH_STEP,
}

const DEFAULT_JOB_VALUES: JobFormValues = {
  title: '',
  category: 'web_development',
  description: '',
  skills: [],
  size: 'medium',
  duration: 'medium_term',
  experience: 'middle',
};

export const JobFormContext = createContext<JobFormContextProps>({
  jobValues: DEFAULT_JOB_VALUES,
  setJobValues: () => {},
  formStep: CreateJobFormSteps.FIRST_STEP,
  goBackStep: () => {},
  goNextStep: () => {},
  submitJob: () => {},
});

export const JobFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const [jobValues, setJobValues] = useState<JobFormValues>(DEFAULT_JOB_VALUES);
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const handleJobsValues = (newValues: JobFormValues) => {
    setJobValues({
      ...jobValues,
      ...newValues,
    });
  };

  const goBackStep = () => {
    if (formStep === CreateJobFormSteps.FIRST_STEP) {
      return router.push('/');
    }
    return setFormStep((prev) => prev - 1);
  };

  const goNextStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const submitJob = async () => {
    try {
      setIsLoading(true);
      await createJob(jobValues);
    } catch (error) {
      console.error('Error creating job', error);
    } finally {
      router.replace('/');
      setIsLoading(false);
    }
  };

  return (
    <JobFormContext.Provider
      value={{
        jobValues,
        setJobValues: handleJobsValues,
        formStep,
        goBackStep,
        goNextStep,
        submitJob,
        isLoading,
      }}
    >
      {children}
    </JobFormContext.Provider>
  );
};
