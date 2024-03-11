import { findChatHistory } from '@/actions/messages';
import { getServerSession } from '@/session/getServerSession';

import { MessagesProvider } from './context/MessagesContext';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await getServerSession();

  const chatHistory = userId ? await findChatHistory(userId) : [];

  return (
    <MessagesProvider chatHistory={chatHistory}>{children}</MessagesProvider>
  );
}
