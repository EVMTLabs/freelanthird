import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { findChatHistory } from '@/actions/messages';
import { MainLayout } from '@/components/Layouts/MainLayout';
import { getServerSession } from '@/session/getServerSession';
import { getDevice } from '@/utils/getDevice';

import { MessagesProvider } from './context/MessagesContext';

export const metadata: Metadata = {
  title: 'Messages',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = getDevice();

  if (isMobile) {
    return (
      <MainLayout>
        <h1 className="text-4xl font-medium mb-6">Messages</h1>
        <div className="flex items-center justify-center w-full">
          <Image
            src="/images/experiments.webp"
            width={500}
            height={500}
            alt="Empty chat"
          />
        </div>
        <p className="w-full mx-auto my-5 text-xl font-medium max-w-xs text-center">
          This functionality is not accessible on mobile devices. Please switch
          to a desktop device to access the messages page.
        </p>
        <div className="flex items-center justify-center w-full my-4">
          <Link className="btn btn-primary" href="/freelancers">
            Find freelancers
          </Link>
        </div>
      </MainLayout>
    );
  }

  const { userId } = await getServerSession();

  const chatHistory = userId ? await findChatHistory(userId) : [];

  return (
    <MessagesProvider chatHistory={chatHistory}>{children}</MessagesProvider>
  );
}

export const dynamic = 'force-dynamic';
