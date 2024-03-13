import clsx from 'clsx';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { DetailedJob } from '@/types/jobs';
import { htmlToText } from '@/utils/htmlToText';

import { PostedAt } from './PostedAt';

export const JobCard = ({ job }: { job: DetailedJob }) => {
  const { avatar, username } = job.user;
  const shortName = username?.slice(0, 2);

  const description = `${htmlToText(job.description.slice(0, 200))}${job.description.length > 200 ? '...' : ''}`;

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="border-t hover:shadow-xl cursor-pointer"
    >
      <div className="flex justify-between py-8 px-4">
        <div className="flex">
          <div className={clsx('flex avatar', !avatar && 'placeholder')}>
            <div
              className={clsx(
                avatar
                  ? 'bg-transparent rounded-full w-10 h-10'
                  : 'bg-neutral text-neutral-content',
              )}
            >
              {avatar ? (
                <Image
                  alt={username ?? 'user avatar'}
                  src={avatar}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <span>{shortName}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col max-w-xl justify-start px-4">
            <p className="text-sm font-bold">
              {username} <PostedAt date={job.createdAt} />
            </p>
            <h3 className="text-2xl font-extrabold mt-1">{job.title}</h3>
            <p className="font-medium mt-4">{description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {job.skills.map((skill) => (
                <span key={skill.id} className="badge">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-extrabold text-end whitespace-nowrap">
            ${job.minPrice} - ${job.maxPrice}
          </p>
          <div className="flex justify-end text-sm items-center text-gray-500 text-end font-bold">
            <MapPin size={16} />
            <span className="ml-1 mt-1">Remote</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
