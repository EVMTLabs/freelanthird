import Link from 'next/link';

import type { Freelancer } from '@/types/users';
import { htmlToText } from '@/utils/htmlToText';

import { DefaultAvatar } from '../Avatars/DefaultAvatar/DefaultAvatar';

export const FreelancerCard = ({ freelancer }: { freelancer: Freelancer }) => {
  return (
    <Link
      key={freelancer.freelancer?.id}
      className="flex flex-col py-6 px-4 hover:shadow-xl cursor-pointer border-b"
      href={`/users/${freelancer.username}`}
    >
      <div className="flex items-center">
        <DefaultAvatar
          avatar={freelancer.avatar}
          username={freelancer.username}
          size="large"
        />
        <div className="ml-5">
          <p className="text-md font-semibold">
            {freelancer.name}{' '}
            <span className="font-normal text-gray-500">
              | {freelancer.freelancer?.category?.name}
            </span>
          </p>
          <h2 className="text-2xl font-bold line-clamp-1">
            {freelancer.freelancer?.title}
          </h2>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 my-5">
        {freelancer.freelancer?.skills.map((skill) => (
          <span key={skill.name} className="badge badge-ghost">
            {skill.name}
          </span>
        ))}
      </div>
      <p className="line-clamp-3">
        {htmlToText(freelancer.freelancer?.description ?? '')}
      </p>
    </Link>
  );
};
