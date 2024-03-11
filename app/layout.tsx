import type { Metadata } from 'next';
import { Albert_Sans } from 'next/font/google';

import { findFirstUnreadMessage } from '@/actions/messages';
import { Navbar } from '@/components/Navbar/Navbar';
import { getServerSession } from '@/session/getServerSession';

import { Providers } from './providers';

import './globals.css';

const inter = Albert_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await getServerSession();
  const hasUnreadMessages = await findFirstUnreadMessage(userId);

  return (
    <html lang="en" data-theme="bumblebee">
      <body className={inter.className}>
        <Providers>
          <Navbar hasUnreadMessages={!!hasUnreadMessages} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
