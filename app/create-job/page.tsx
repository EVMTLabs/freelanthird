import { CreateJobForm } from './components/CreateJobForm';
import { CreateJobFormStepInfo } from './components/CreateJobFormStepInfo';

export default function NewJobPage() {
  return (
    <div className="grid grid-cols-2 my-20 gap-10">
      <CreateJobFormStepInfo />
      <CreateJobForm />
    </div>
  );
}
