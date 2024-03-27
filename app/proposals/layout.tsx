import type { Metadata } from 'next';

import { MainLayout } from '@/components/Layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Proposals',
};

export const revalidate = 0;

export default async function ProposalsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
