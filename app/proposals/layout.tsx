import { MainLayout } from '@/components/Layouts/MainLayout';

export default async function ProposalsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
