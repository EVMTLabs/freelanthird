import { MessagesProvider } from './context/MessagesContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MessagesProvider>{children}</MessagesProvider>;
}
