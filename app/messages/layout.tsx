import { findChatHistory } from '@/prisma/actions/messages';
import { getServerSession } from '@/session/getServerSession';

import { MessagesProvider } from './context/MessagesContext';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await getServerSession();

  if (!userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const chatHistory = await findChatHistory(userId);

  return (
    <MessagesProvider chatHistory={chatHistory}>{children}</MessagesProvider>
  );
}
