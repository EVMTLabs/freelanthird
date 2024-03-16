'use client';

import { useEffect, useMemo, useState } from 'react';

import { JobCard } from '@/components/JobCard/JobCard';
import { useJobStore } from '@/stores/useJobStore';
import type { DetailedJob } from '@/types/jobs';

export const JobsList = ({ jobs }: { jobs: DetailedJob[] }) => {
  const { jobsList, idsToFilter } = useJobStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    useJobStore.setState({ jobsList: jobs });
    setIsLoading(false);
  }, []);

  const filteredJobs = useMemo(
    () =>
      jobsList.filter((job) => {
        if (!idsToFilter.length) return true;
        return idsToFilter.includes(job.category.id);
      }),
    [jobsList, idsToFilter],
  );

  if (isLoading) return jobs.map((job) => <JobCard key={job.id} job={job} />);

  if (!filteredJobs.length)
    return <p>No jobs found. Try changing the filters.</p>;

  return filteredJobs.map((job) => <JobCard key={job.id} job={job} />);
};
