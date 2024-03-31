import { ChatContainer } from './components/ChatContainer';
import { ChatHistory } from './components/ChatHistory';

export default async function MessagesPage() {
  return (
    <div className="flex max-h-[calc(100vh-81px)] min-h-[calc(100vh-96px)] max-w-screen overflow-hidden border-t">
      <div className="flex flex-col w-full min-h-full border-r min-w-xs max-w-sm">
        <div className="flex flex-col h-full">
          <h2 className="text-4xl font-medium mt-10 mb-6 mx-6">Messages</h2>
          <div className="flex flex-col h-full relative scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-base-200 scrollbar-track-transparent overflow-y-auto">
            <ChatHistory />
          </div>
        </div>
      </div>
      <ChatContainer />
    </div>
  );
}

export const dynamic = 'force-dynamic';
