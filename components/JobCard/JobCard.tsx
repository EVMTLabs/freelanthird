import { MapPin } from 'lucide-react';
import Link from 'next/link';

import type { DetailedJob } from '@/types/jobs';
import { htmlToText } from '@/utils/htmlToText';
import { kFormatter } from '@/utils/kFormatter';
import { slugify } from '@/utils/slugify';

import { DefaultAvatar } from '../Avatars/DefaultAvatar/DefaultAvatar';
import { PublishedAt } from '../PublishedAt/PublishedAt';

export const JobCard = ({ job }: { job: DetailedJob }) => {
  const { avatar, username } = job.user;

  const description = `${htmlToText(job.description)}`;
  const jobLink = `/jobs/${slugify(job.title)}/${job.id}`;

  return (
    <Link
      href={jobLink}
      className="relative border-t hover:shadow-xl cursor-pointer py-8 px-4"
    >
      <div className="flex justify-between">
        <div className="flex">
          <DefaultAvatar avatar={avatar} username={username} />
          <div className="flex flex-col max-w-xl justify-start px-4">
            <p className="text-sm font-bold truncate w-40 lg:w-full whitespace-break-spaces">
              {username} <PublishedAt date={job.createdAt} showDivider />
            </p>
            <h3 className="hidden text-2xl font-extrabold mt-4 lg:mt-1 lg:line-clamp-2">
              {job.title}
            </h3>
            <p className="hidden font-medium mt-2 lg:line-clamp-2">
              {description}
            </p>
            <div className="hidden flex-wrap gap-2 mt-4 lg:flex">
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
            ${kFormatter(job.minPrice)} - ${kFormatter(job.maxPrice)}
          </p>
          <div className="flex justify-end text-sm items-center text-gray-500 text-end font-bold">
            <MapPin size={16} />
            <span className="ml-1 mt-1">Remote</span>
          </div>
        </div>
      </div>
      <div className="lg:hidden ml-14">
        <h3 className="text-2xl font-extrabold mt-2 lg:mt-1 line-clamp-2">
          {job.title}
        </h3>
        <p className="font-medium mt-1 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {job.skills.map((skill) => (
            <span key={skill.id} className="badge">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
