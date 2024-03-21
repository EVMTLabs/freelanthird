'use client';

import { useEffect, useMemo, useState } from 'react';

import { FreelancerCard } from '@/components/FreelancerCard/FreelancerCard';
import { useFreelancerStore } from '@/stores/useFreelancerStore';
import type { Freelancer } from '@/types/users';

export const FreelancerList = ({
  freelancers,
}: {
  freelancers: Freelancer[];
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const { freelancerList, idsToFilter } = useFreelancerStore();

  useEffect(() => {
    useFreelancerStore.setState({ freelancerList: freelancers });
    setIsLoading(false);
  }, []);

  const filteredFreelancers = useMemo(
    () =>
      freelancerList.filter((freelancer) => {
        if (!idsToFilter.length) return true;
        return idsToFilter.includes(freelancer.freelancer?.category?.id ?? '');
      }),
    [freelancerList, idsToFilter],
  );

  if (isLoading)
    return freelancers.map((freelancer) => (
      <FreelancerCard key={freelancer.username} freelancer={freelancer} />
    ));

  if (!filteredFreelancers.length)
    return <p>No freelancers found. Try changing the filters.</p>;

  return (
    <div className="flex flex-wrap">
      {filteredFreelancers?.map((freelancer) => (
        <FreelancerCard key={freelancer.username} freelancer={freelancer} />
      ))}
    </div>
  );
};
