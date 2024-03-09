import { MainLayout } from '@/components/Layouts/MainLayout';
import { findJobCategories } from '@/prisma/actions/jobs';

import { JobFormProvider } from './context/CreateJobContext';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jobCategories = await findJobCategories();

  return (
    <MainLayout>
      <JobFormProvider categories={jobCategories}>{children}</JobFormProvider>
    </MainLayout>
  );
}
