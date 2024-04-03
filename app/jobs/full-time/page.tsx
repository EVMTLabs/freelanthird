import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { findFullTimeJobs } from '@/actions/jobs';
import { MainLayout } from '@/components/Layouts/MainLayout';
import { LoggedLink } from '@/components/LoggedLink/LoggedLink';
import { PublishedAt } from '@/components/PublishedAt/PublishedAt';

export default async function FullTimeJobPage() {
  const fullTimeJobs = await findFullTimeJobs();

  return (
    <MainLayout>
      <div className="flex gap-12 relative">
        <div>
          <div className="flex gap-6">
            <Link href="/" className="btn btn-sm btn-ghost">
              Freelance Projects
            </Link>
            <Link href="/jobs/full-time" className="btn btn-sm">
              Full-Time Jobs
            </Link>
          </div>
          <div className="flex gap-6 mt-6">
            <div className="flex flex-col max-w-xl">
              <h1 className="text-4xl font-extrabold lg:text-6xl">
                Ready to seize your dream career?
              </h1>
              <p className="text-lg font-medium mt-4">
                Discover tailored full-time opportunities curated just for you,
                ensuring you land your ideal job effortlessly.
              </p>
              <LoggedLink
                href="/create-job"
                className="btn btn-primary mt-6 w-fit"
                text="Create a Project - Free"
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute top-0 right-0 w-[540px] h-[540px]">
          <Image
            src="/images/new-beginning.svg"
            alt="new beginning"
            fill
            priority
          />
        </div>
      </div>
      <div className="flex flex-col mt-20 lg:mt-44 mb-8">
        <h2 className="text-4xl font-extrabold">Recommended jobs</h2>
        <p className="text-lg font-medium mt-4">
          Find full-time jobs that match your skills and experience.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {fullTimeJobs.map((job) => (
          <div
            key={job.id}
            className="card card-side bg-base-100 shadow-md border w-full"
          >
            <div className="card-body">
              <div className="card-title">
                <figure className="relative h-14 w-14">
                  <Image
                    src={job.companyLogo}
                    fill
                    alt={job.companyName}
                    unoptimized
                    className="object-contain"
                  />
                </figure>
                <div className="flex flex-col gap-1 ml-2">
                  <h2>{job.title}</h2>
                  <PublishedAt date={job.createdAt} />
                </div>
              </div>
              <p className="mt-2">{job.description}</p>
              <div className="card-actions justify-end">
                <a
                  title={job.title}
                  href={job.link}
                  target="_blank"
                  className="btn btn-primary mt-4"
                  rel="noopener noreferrer"
                >
                  Apply
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
