import type { Metadata } from 'next';
import { Albert_Sans } from 'next/font/google';

import { Navbar } from '@/components/Navbar/Navbar';

import { Providers } from './providers';

import './globals.css';

const inter = Albert_Sans({ subsets: ['latin'] });

const WEBSITE_URL = `https://${process.env.VERCEL_URL ?? 'freelanthird.com'}`;

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
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
        url: `${WEBSITE_URL}/images/og.webp`,
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
  return (
    <html lang="en" data-theme="bumblebee">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
