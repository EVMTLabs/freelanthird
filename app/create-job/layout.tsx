import { findJobCategoriesWithSkills } from '@/actions/jobs';
import { MainLayout } from '@/components/Layouts/MainLayout';

import { JobFormProvider } from './context/CreateJobContext';

export default async function NewJobLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jobCategories = await findJobCategoriesWithSkills();

  return (
    <MainLayout>
      <JobFormProvider categories={jobCategories}>{children}</JobFormProvider>
    </MainLayout>
  );
}
