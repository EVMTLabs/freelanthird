import { redirect } from 'next/navigation';

import { MainLayout } from '@/components/Layouts/MainLayout';
import { getServerSession } from '@/session/getServerSession';

import { SettingsForm } from './components/SettingsForm';

export default async function SettingsPage() {
  const session = await getServerSession();

  if (!session.isLoggedIn) {
    return redirect('/');
  }

  return (
    <MainLayout>
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-col gap-5 w-full shadow border py-8 px-6 max-w-xl">
          <h1 className="text-2xl font-bold">Private settings</h1>
          <SettingsForm name={session.name} email={session.email} />
        </div>
      </div>
    </MainLayout>
  );
}
