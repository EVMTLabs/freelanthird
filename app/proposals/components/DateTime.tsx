'use client';

export const DateTime = ({ title, date }: { title: string; date: Date }) => {
  const newDate = new Date(date);

  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-medium text-gray-500">{title}</p>
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
