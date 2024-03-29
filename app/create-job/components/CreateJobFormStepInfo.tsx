'use client';

import { useContext } from 'react';

import { JobFormContext } from '../context/CreateJobContext';

export const CreateJobFormStepInfo = () => {
  const { formStep } = useContext(JobFormContext);

  const steps = [
    {
      title: "Let's start with a good title",
      subTitle: 'Title',
      description: 'This job will appear in Web Development category',
    },
    {
      title: 'Describe your job in detail',
      subTitle: 'Description',
      description:
        'Here you can explain what you need and what you expect from candidates, like daily responsibilities, goals and necesary qualifications',
    },
    {
      title: 'What skills are required for this job?',
      subTitle: 'Skills',
      description:
        'This skills will help candidates find your job easier and fit better with your needs',
    },
    {
      title: 'Estimate the scope of your work',
      subTitle: 'Scope',
      description:
        'Tell us a bit more about the scope so candidates can find suitable jobs for their time availability',
    },
    {
      title: 'Finally, give a budget for this job',
      subTitle: 'Budget',
      description:
        'Candidates will make proposals based on this budget range, this is not final and can be negotiated later on.',
    },
  ];

  return (
    <div className="flex flex-col pb-2 lg:border-r">
      <p className="text-sm mb-2">
        {formStep + 1}/5{' '}
        <span className="ml-2">{steps[formStep].subTitle}</span>
      </p>
      <h1 className="text-4xl font-extrabold">{steps[formStep].title}</h1>
      <p className="text-lg font-medium mt-4">{steps[formStep].description}</p>
    </div>
  );
};
