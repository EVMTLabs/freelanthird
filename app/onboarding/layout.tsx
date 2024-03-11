import { MainLayout } from '@/components/Layouts/MainLayout';

import { NewUserFormProvider } from './context/NewUserContext';

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
