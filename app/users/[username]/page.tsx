import { Calendar, Send } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { findUserByUsername } from '@/actions/users';
import { DefaultAvatar } from '@/components/Avatars/DefaultAvatar/DefaultAvatar';
import { MainLayout } from '@/components/Layouts/MainLayout';

import { UserJobCard } from './components/UserJobCard';

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
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
      <div className="flex w-full justify-between items-center border-b py-10">
        <div className="flex">
          <DefaultAvatar
            avatar={user.avatar}
            username={user.username}
            size="large"
            showRing
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
        <Link className="btn btn-outline" href={`/messages/${user.username}`}>
          Send message <Send size={24} />
        </Link>
      </div>
      <div className="flex flex-col gap-4 mt-10 w-full">
        <h2 className="text-xl font-bold">Posted Jobs</h2>
        {user.jobs.length > 0 ? (
          <>
            {user.jobs.map((job) => (
              <UserJobCard key={job.id} job={job} />
            ))}
          </>
        ) : (
          <p>This user has not posted any jobs yet.</p>
        )}
      </div>
    </MainLayout>
  );
}
