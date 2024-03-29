'use client';

export const TableDate = ({ date }: { date: Date }) => {
  return (
    <span className="whitespace-nowrap">
      {new Date(date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
    </span>
  );
};
