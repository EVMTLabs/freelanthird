import { CalendarClock, Gem, MapPin, Mountain } from 'lucide-react';

interface JobStatsProps {
  size: string;
  duration: string;
  experience: string;
  location: string;
}

export const JobStats = ({
  size,
  duration,
  experience,
  location,
}: JobStatsProps) => {
  const durationLabels: Record<string, string> = {
    short_term: '1-3 months',
    medium_term: '3-6 months',
    long_term: 'More than 6 months',
  };

  const sizeLabels: Record<string, string> = {
    small: 'Small project',
    medium: 'Medium project',
    large: 'Large project',
  };

  const experienceLabels: Record<string, string> = {
    junior: 'Beginner',
    middle: 'Intermediate',
    senior: 'Expert',
  };

  return (
    <div className="flex flex-wrap gap-10 my-10">
      <div className="flex gap-2">
        <CalendarClock className="mt-1" size={24} />
        <div>
          <p>{durationLabels[duration]}</p>
          <span className="font-light text-sm text-gray-500">Duration</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Mountain size={24} />
        <div>
          <p>{sizeLabels[size]}</p>
          <span className="font-light text-sm text-gray-500">Complexity</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Gem size={24} />
        <div>
          <p>{experienceLabels[experience]}</p>
          <span className="font-light text-sm text-gray-500">Experience</span>
        </div>
      </div>
      <div className="flex gap-2">
        <MapPin size={24} />
        <div>
          <p>{location}</p>
          <span className="font-light text-sm text-gray-500">Location</span>
        </div>
      </div>
    </div>
  );
};
