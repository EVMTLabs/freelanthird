import { CreateJobForm } from './components/CreateJobForm';
import { CreateJobFormStepInfo } from './components/CreateJobFormStepInfo';

export default function NewJobPage() {
  return (
    <div className="grid grid-cols-1 my-5 gap-10 lg:grid-cols-2 lg:my-20">
      <CreateJobFormStepInfo />
      <CreateJobForm />
    </div>
  );
}
