'use client';

import { formatDistanceStrict } from 'date-fns';

export const PostedAt = ({ date }: { date: Date }) => {
  const postedSince = formatDistanceStrict(date, new Date(), {
    addSuffix: true,
  });

  return (
    <span className="font-light text-sm text-gray-500">
      | Posted {postedSince}
    </span>
  );
};
