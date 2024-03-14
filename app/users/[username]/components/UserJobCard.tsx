import { MapPin } from 'lucide-react';
import Link from 'next/link';

import { PublishedAt } from '@/components/PublishedAt/PublishedAt';
import { htmlToText } from '@/utils/htmlToText';

interface UserJobCardProps {
  job: {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    minPrice: number;
    maxPrice: number;
    skills: { id: string; name: string }[];
  };
}

export const UserJobCard = ({ job }: UserJobCardProps) => {
  const description = `${htmlToText(job.description.slice(0, 200))}${job.description.length > 200 ? '...' : ''}`;
  const jobLink = `/jobs/${job.title.replace(/ /g, '-').toLowerCase()}/${job.id}`;

  return (
    <Link href={jobLink} className="border-b hover:shadow-xl cursor-pointer">
      <div className="flex justify-between py-8 px-4">
        <div className="flex">
          <div className="flex flex-col max-w-xl justify-start px-4">
            <p className="text-sm font-bold">
              <PublishedAt date={job.createdAt} />
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
