'use client';

export const ProposalDateTime = ({ date }: { date: Date }) => {
  const newDate = new Date(date);
  console.log(newDate);
  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-medium text-gray-500">Proposal date:</p>
      <p className="text-lg text-gray-500">
        <span>
          {newDate.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </p>
    </div>
  );
};
