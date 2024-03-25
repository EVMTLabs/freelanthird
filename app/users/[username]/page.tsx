import { Calendar } from 'lucide-react';
import { redirect } from 'next/navigation';

import { findUserByUsername } from '@/actions/users';
import { DefaultAvatar } from '@/components/Avatars/DefaultAvatar/DefaultAvatar';
import { MainLayout } from '@/components/Layouts/MainLayout';
import { getServerSession } from '@/session/getServerSession';

import { FreelancerProfile } from './components/FreelancerProfile';
import { JobPosterProfile } from './components/JobPosterProfile';
import { SendMessageButton } from './components/SendMessageButton';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const user = await findUserByUsername(params.username);

  if (!user) {
    return redirect('/404');
  }

  return {
    title: `${user.name} (@${user.username})`,
    description: user.freelancer?.description || user.description,
  };
}

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const { username: sessionUsername } = await getServerSession();

  const username = params.username;

  if (!username) {
    return redirect('/404');
  }

  const user = await findUserByUsername(username);

  if (!user) {
    return redirect('/404');
  }

  const joinedDate = new Date(user.createdAt).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <MainLayout>
      <div className="flex w-full justify-between items-center border-b pt-10 pb-5">
        <div className="flex">
          <DefaultAvatar
            avatar={user.avatar}
            username={user.username}
            size="large"
          />
          <div className="ml-4 mb-4">
            <p className="text-xl font-bold">{user.name}</p>
            <p className="text-sm text-gray-500">@{user.username}</p>
            <div className="flex gap-1 items-center text-sm text-gray-500">
              <Calendar size={14} />
              <span>Joined {joinedDate}</span>
            </div>
          </div>
        </div>
        <SendMessageButton
          username={user.username}
          name={user.name}
          isSameUser={sessionUsername === user.username}
        />
      </div>
      {user.isFreelancer ? (
        <FreelancerProfile
          title={user.freelancer?.title}
          category={user.freelancer?.category}
          description={user.freelancer?.description}
          skills={user.freelancer?.skills ?? []}
        />
      ) : (
        <JobPosterProfile jobs={user.jobs} />
      )}
    </MainLayout>
  );
}
