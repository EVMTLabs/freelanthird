import { MainLayout } from '@/components/Layouts/MainLayout';

import { JobFormProvider } from './context/CreateJobContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout>
      <JobFormProvider>{children}</JobFormProvider>
    </MainLayout>
  );
}
