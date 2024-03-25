import type { Metadata } from 'next';

import { MainLayout } from '@/components/Layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Proposals',
};

export default async function ProposalsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
