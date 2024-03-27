'use client';

import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useSession } from '@/hooks/session/useSession';
import type { Job, JobCategory } from '@/types/jobs';

interface JobFormContextProps {
  jobValues: Job;
  categories: JobCategory[];
  setJobValues: (values: Job) => void;
  formStep: number;
  goBackStep: () => void;
  goNextStep: () => void;
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
  category: '',
  description: '',
  skills: [],
  size: 'medium',
  duration: 'medium_term',
  experience: 'middle',
};

export const JobFormContext = createContext<JobFormContextProps>({
  jobValues: DEFAULT_JOB_VALUES,
  categories: [],
  setJobValues: () => {},
  formStep: CreateJobFormSteps.FIRST_STEP,
  goBackStep: () => {},
  goNextStep: () => {},
});

export const JobFormProvider = ({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: JobCategory[];
}) => {
  const router = useRouter();
  const { session } = useSession();

  const [jobValues, setJobValues] = useState<Job>({
    ...DEFAULT_JOB_VALUES,
    category: categories[0].id,
  });
  const [formStep, setFormStep] = useState(0);

  useEffect(() => {
    if (!session?.isLoggedIn && !session?.token) {
      router.replace('/');
    }
  }, [session?.isLoggedIn, session?.token]);

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

  return (
    <JobFormContext.Provider
      value={{
        jobValues,
        categories,
        setJobValues: handleJobsValues,
        formStep,
        goBackStep,
        goNextStep,
      }}
    >
      {children}
    </JobFormContext.Provider>
  );
};
