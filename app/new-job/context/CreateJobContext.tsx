'use client';

import { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import { createJob } from '@/prisma/actions/jobs';
import type { Job } from '@/types/jobs';

interface JobFormContextProps {
  jobValues: Job;
  setJobValues: (values: Job) => void;
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

const DEFAULT_JOB_VALUES: Job = {
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

  const [jobValues, setJobValues] = useState<Job>(DEFAULT_JOB_VALUES);
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const handleJobsValues = (newValues: Job) => {
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
