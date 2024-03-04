import Image from 'next/image';
import Link from 'next/link';

import { JobCard } from '@/components/JobCard/JobCard';
import { MainLayout } from '@/components/Layouts/MainLayout';

export default function HomePage() {
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
                Find your next freelance project without the fees. We are the
                largest freelance marketplace without the middleman.
              </p>
              <Link href="/new-job" className="btn btn-primary mt-6 w-fit">
                Create a Project - Free
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[540px] h-[540px]">
          <Image src="/images/new-beginning.svg" alt="" fill />
        </div>
      </div>
      <div className="flex flex-col mt-44 mb-8">
        <h2 className="text-4xl font-extrabold">Recent new projects</h2>
        <p className="text-lg font-medium mt-4">2 new projects posted today!</p>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="flex flex-col col-span-8">
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
        <div className="col-start-10 col-span-3">
          <div className="flex flex-col border p-4 rounded-lg">
            <h3 className="text-xl">Specialties</h3>
            {/* <JobCategory /> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
