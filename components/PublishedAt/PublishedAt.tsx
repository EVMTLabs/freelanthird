'use client';

import { formatDistanceStrict } from 'date-fns';

interface PublishedAtProps {
  date: Date;
  showDivider?: boolean;
}

export const PublishedAt = ({ date, showDivider }: PublishedAtProps) => {
  const postedSince = formatDistanceStrict(date, new Date(), {
    addSuffix: true,
  });

  const text = showDivider
    ? `| Posted ${postedSince}`
    : `Posted ${postedSince}`;

  return <span className="font-light text-sm text-gray-500">{text}</span>;
};
