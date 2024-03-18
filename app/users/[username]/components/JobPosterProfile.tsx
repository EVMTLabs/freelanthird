import type { JobCard } from '@/types/jobs';

import { UserJobCard } from './UserJobCard';

export const JobPosterProfile = ({ jobs }: { jobs: JobCard[] }) => {
  return (
    <div className="flex flex-col gap-4 mt-10 w-full">
      <h2 className="text-xl font-bold">Posted Jobs</h2>
      {jobs.length > 0 ? (
        <>
          {jobs.map((job) => (
            <UserJobCard key={job.id} job={job} />
          ))}
        </>
      ) : (
        <p>This user has not posted any jobs yet.</p>
      )}
    </div>
  );
};
