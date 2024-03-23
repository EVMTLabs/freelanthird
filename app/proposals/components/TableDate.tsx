'use client';

export const TableDate = ({ date }: { date: Date }) => {
  return (
    <span>
      {new Date(date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
    </span>
  );
};
