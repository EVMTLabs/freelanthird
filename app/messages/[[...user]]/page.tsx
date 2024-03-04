import { findChatHistory } from '@/prisma/actions/messages';
import { getServerSession } from '@/session/getServerSession';

import { ChatHeader } from '../components/ChatHeader';
import { ChatHistory } from '../components/ChatHistory';
import { ChatMessages } from '../components/ChatMessages';
import { SendMessage } from '../components/SendMessage';

export default async function MessagesPage() {
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
    <div className="flex max-h-[calc(100vh-81px)] min-h-[calc(100vh-81px)] max-w-screen overflow-hidden">
      <div className="flex flex-col w-full min-h-full border-r min-w-xs max-w-sm">
        <div className="flex flex-col">
          <h2 className="text-4xl font-medium mt-10 mb-6 mx-6">Messages</h2>
          <div className="flex flex-col relative scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-base-200 scrollbar-track-transparent overflow-y-auto">
            <ChatHistory chatHistory={chatHistory} />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full min-h-full">
        <ChatHeader />
        <ChatMessages />
        <div className="flex items-center justify-center mb-10">
          <SendMessage />
        </div>
      </div>
    </div>
  );
}
