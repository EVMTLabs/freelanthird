import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { findFullTimeJobs } from '@/actions/jobs';
import { MainLayout } from '@/components/Layouts/MainLayout';

export default async function FullTimeJobPage() {
  const fullTimeJobs = await findFullTimeJobs();

  return (
    <MainLayout>
      <h1 className="text-4xl font-medium mt-10 mb-4">Recommended jobs</h1>
      <p className="text-lg font-medium">
        Find full-time jobs that match your skills and experience.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
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
                <h2 className="ml-2">{job.title}</h2>
              </div>
              <p className="mt-2">{job.description}</p>
              <div className="card-actions justify-end">
                <Link
                  title={job.title}
                  href={job.link}
                  target="_blank"
                  className="btn btn-primary mt-4"
                >
                  Apply
                  <ExternalLink size={18} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
