'use client';

import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { CustomLink } from '@/components/CustomLink/CustomLink';
import { useChatRooms } from '@/hooks/messages/useChatRooms';
import { useSession } from '@/hooks/session/useSession';

import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { SendMessageInput } from './SendMessageInput';

export const ChatContainer = () => {
  const { session } = useSession();
  const { chatRooms } = useChatRooms();
  const params = useSearchParams();

  const receiverUsername = params.get('username');

  if (!session?.isLoggedIn || !chatRooms?.length || !receiverUsername) {
    return (
      <div className="flex flex-col h-full w-full min-h-screen">
        <div className="flex flex-col items-center justify-center w-full my-20">
          <Image
            src="/images/empty-chat.webp"
            width={650}
            height={650}
            alt="Empty chat"
          />
          <p className="my-10 text-xl font-medium max-w-sm text-center">
            {!session?.isLoggedIn
              ? 'Connect your wallet and start messaging anyone on the freelanthird network'
              : 'Start messaging anyone on the freelanthird'}
          </p>
          <CustomLink href="/freelancers">
            <span className="flex items-center">
              Find Freelancers <MoveRight className="ml-2" />
            </span>
          </CustomLink>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-full">
      <ChatHeader />
      <ChatMessages />
      <div className="flex items-center justify-center mb-10">
        <SendMessageInput />
      </div>
    </div>
  );
};
