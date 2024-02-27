import type { Metadata } from 'next';
import { Albert_Sans } from 'next/font/google';

import { Navbar } from '@/components/Navbar/Navbar';

import { Providers } from './providers';

import './globals.css';

const inter = Albert_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="bumblebee">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="flex min-h-screen max-w-6xl flex-col container my-10 mx-auto relative">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
