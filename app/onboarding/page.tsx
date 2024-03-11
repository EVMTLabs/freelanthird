import { CreateNewUserForm } from './components/CreateNewUserForm';
import { NewUserStepInfo } from './components/NewUserStepInfo';

export default function NewUserPage() {
  return (
    <div className="grid grid-cols-2 my-20 gap-10">
      <NewUserStepInfo />
      <CreateNewUserForm />
    </div>
  );
}
