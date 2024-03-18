import { EditorContentView } from '@/components/RichTextEditor/EditorContentView';

interface FreelancerProfileProps {
  description?: string | null;
  category?: {
    id: string;
    name: string;
  } | null;
  skills: {
    id: string;
    name: string;
  }[];
}

export const FreelancerProfile = ({
  category,
  description,
  skills,
}: FreelancerProfileProps) => {
  return (
    <div className="flex flex-col gap-4 mt-10 w-full">
      <h2 className="text-3xl font-bold line-clamp-2">
        Software Engenieer | Web Development | +8 years of experience
      </h2>
      <EditorContentView description={description ?? ''} />
      <h2 className="text-xl font-bold mt-4">Category</h2>
      <span className="badge badge-ghost">{category?.name}</span>
      {skills.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="badge badge-ghost">
                {skill.name}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
