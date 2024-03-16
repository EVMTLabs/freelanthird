import Image from 'next/image';

import { findJobCategories, findJobs } from '@/actions/jobs';
import { MainLayout } from '@/components/Layouts/MainLayout';
import { LoggedLink } from '@/components/LoggedLink/LoggedLink';

import { JobCategories } from './components/JobCategories';
import { JobsList } from './components/JobsList';

export default async function HomePage() {
  const categories = await findJobCategories();
  const jobs = await findJobs();

  return (
    <MainLayout>
      <div className="flex gap-12 relative">
        <div>
          <div className="flex gap-6">
            <button className="btn btn-sm">Freelance Projects</button>
            <button className="btn btn-sm btn-ghost">Full-Time Jobs</button>
          </div>
          <div className="flex gap-6 mt-6">
            <div className="flex flex-col max-w-xl">
              <h1 className="text-6xl font-extrabold">
                Freelance Projects Without Fees
              </h1>
              <p className="text-lg font-medium mt-4">
                Imagine a place where your skills are rewarded fairly, your
                connections are direct, and your transactions are transparent.
                <br />
                That&apos;s Freelanthird. Where every payment is seamless,
                secure, and entirely yours.
              </p>
              <LoggedLink
                href="/create-job"
                className="btn btn-primary mt-6 w-fit"
                text="Create a Project - Free"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[540px] h-[540px]">
          <Image
            src="/images/new-beginning.svg"
            alt="new beginning"
            fill
            priority
          />
        </div>
      </div>
      <div className="flex flex-col mt-44 mb-8">
        <h2 className="text-4xl font-extrabold">Recent new projects</h2>
        <p className="text-lg font-medium mt-4">2 new projects posted today!</p>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="flex flex-col col-span-8">
          <JobsList jobs={jobs} />
        </div>
        <div className="col-start-10 col-span-3">
          <div className="flex flex-col border p-4 rounded-lg">
            <h3 className="text-xl">Specialties</h3>
            <JobCategories categories={categories} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
