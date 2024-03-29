import { CreateNewUserForm } from './components/CreateNewUserForm';
import { NewUserStepInfo } from './components/NewUserStepInfo';

export default function NewUserPage() {
  return (
    <div className="grid grid-cols-1 my-5 gap-10 lg:grid-cols-2 lg:my-20">
      <NewUserStepInfo />
      <CreateNewUserForm />
    </div>
  );
}
