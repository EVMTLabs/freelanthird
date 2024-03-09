'use client';

import { MoveRight } from 'lucide-react';
import Image from 'next/image';

import { CustomLink } from '@/components/CustomLink/CustomLink';
import { useSession } from '@/context/SessionContext';
import { useChatRooms } from '@/hooks/messages/useChatRooms';

import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { SendMessageInput } from './SendMessageInput';

export const ChatContainer = () => {
  const { isLoggedIn } = useSession();
  const { chatRooms } = useChatRooms();

  if (!isLoggedIn || !chatRooms?.length) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center min-h-screen">
        <div className="flex items-center justify-center w-full">
          <Image
            src="/images/empty-chats.svg"
            width={500}
            height={500}
            alt="Empty chat"
          />
        </div>
        <p className="my-10 text-xl font-medium max-w-sm text-center">
          Connect your wallet and start messaging anyone on the freelanthird
          network
        </p>
        <CustomLink href="/freelancers">
          <span className="flex items-center">
            Find Freelancers <MoveRight className="ml-2" />
          </span>
        </CustomLink>
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
