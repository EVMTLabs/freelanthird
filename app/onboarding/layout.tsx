import type { Metadata } from 'next';

import { MainLayout } from '@/components/Layouts/MainLayout';

import { NewUserFormProvider } from './context/NewUserContext';

export const metadata: Metadata = {
  title: 'Onboarding',
};

export default async function NewUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout>
      <NewUserFormProvider>{children}</NewUserFormProvider>
    </MainLayout>
  );
}
