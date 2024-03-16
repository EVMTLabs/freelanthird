import { Calendar } from 'lucide-react';

import { findJobCategoriesWithSkills } from '@/actions/jobs';
import { findFreelancerProfile } from '@/actions/users';
import { MainLayout } from '@/components/Layouts/MainLayout';
import { getServerSession } from '@/session/getServerSession';

import { CategorySelector } from './components/CategorySelector';
import { EditProfile } from './components/EditProfile';
import { ProfileAlert } from './components/ProfileAlert';
import { ProfileFormProvider } from './components/ProfileFormProvider';
import { ProfilePickInput } from './components/ProfilePickInput';
import { SkillsSelector } from './components/SkillsSelector';
import { ToggleVisibility } from './components/ToggleVisibility';

export default async function FreelancersPage() {
  const session = await getServerSession();

  if (!session.isLoggedIn) {
    //return redirect('/');
  }

  const freelancerProfile = await findFreelancerProfile(session.userId);
  const categories = await findJobCategoriesWithSkills();

  const joinedDate = new Date(session.createdAt).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <MainLayout>
      <ProfileFormProvider freelancerProfile={freelancerProfile}>
        <div className="grid grid-cols-12 gap-5">
          <div className="flex flex-col col-span-4 gap-8">
            <div className="shadow border py-8 px-6">
              <div className="flex flex-col py-4 border-b w-full items-center justify-center">
                <ProfilePickInput defaultImage={session.avatar} />
                <p className="text-xl font-bold">{session.name}</p>
                <p className="text-lg text-gray-500">@{session.username}</p>
              </div>
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex w-full justify-between items-center text-lg">
                  <div className="flex gap-1 items-center text-gray-500">
                    <Calendar size={16} />
                    <p>Member since</p>
                  </div>
                  <p>{joinedDate}</p>
                </div>
                <ToggleVisibility />
              </div>
            </div>
            <div className="shadow border col-span-8 py-8 px-6">
              <p className="text-xl font-extrabold mb-6">Category and skills</p>
              <CategorySelector categories={categories} />
              <SkillsSelector categories={categories} />
            </div>
          </div>
          <div className="shadow border col-span-8 py-8 px-6">
            <p className="text-xl font-extrabold mb-6">Freelancer profile</p>
            <ProfileAlert isComplete={!!freelancerProfile?.isComplete} />
            <EditProfile
              defaultDescription={freelancerProfile?.description || ''}
            />
            <div className="flex justify-end mt-6">
              <button type="submit" className="btn btn-primary w-32">
                Save profile
              </button>
            </div>
          </div>
        </div>
      </ProfileFormProvider>
    </MainLayout>
  );
}
