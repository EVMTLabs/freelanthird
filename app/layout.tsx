import type { Metadata } from 'next';
import { Albert_Sans } from 'next/font/google';

import { findFirstUnreadMessage } from '@/actions/messages';
import { Navbar } from '@/components/Navbar/Navbar';
import { getServerSession } from '@/session/getServerSession';

import { Providers } from './providers';

import './globals.css';

const inter = Albert_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Freelance Projects Without Fees',
    template: '%s / Freelanthird',
  },
  description:
    'Make the smart choice for your freelance career. Join the Freelanthird community now and start your journey towards more rewarding projects and fairer compensation',
  openGraph: {
    title: 'Freelance Projects Without Fees',
    description:
      'Make the smart choice for your freelance career. Join the Freelanthird community now and start your journey towards more rewarding projects and fairer compensation',
    type: 'website',
    images: [
      {
        url: 'https://freelanthird.com/images/og.webp',
        width: 1200,
        height: 630,
        alt: 'Freelanthird.com',
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  const hasUnreadMessages = await findFirstUnreadMessage(session.userId);

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
