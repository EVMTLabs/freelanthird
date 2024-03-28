'use client';

import type { MouseEvent } from 'react';
import clsx from 'clsx';
import { useModal } from 'connectkit';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { DefaultAvatar } from '@/components/Avatars/DefaultAvatar/DefaultAvatar';
import { useChatRooms } from '@/hooks/messages/useChatRooms';
import { useSession } from '@/hooks/session/useSession';
import { formatDate } from '@/utils/formatDate';
import { htmlToText } from '@/utils/htmlToText';

export const ChatHistory = () => {
  const { session } = useSession();
  const { chatRooms, roomId } = useChatRooms();
  const { setOpen } = useModal();
  const router = useRouter();

  const handleSelectRoom = (event: MouseEvent<HTMLDivElement>) => {
    const username = event?.currentTarget?.dataset?.username;
    if (username) {
      router.push(`/messages?username=${username}`);
    }
  };

  const handleOpenConnectModal = () => {
    setOpen(true);
  };

  if (!session?.isLoggedIn)
    return (
      <div className="flex flex-col h-full place-content-center">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl font-extrabold text-center">
            Message Anyone
          </h2>
          <p className="text-center mx-4">
            Your messages will appear here once you connect your wallet
          </p>
          <button
            className="btn btn-primary mt-4 w-32"
            onClick={handleOpenConnectModal}
          >
            Connect
          </button>
        </div>
      </div>
    );

  if (!chatRooms?.length || !chatRooms[0].messages.length) {
    return (
      <div className="flex flex-col h-full place-content-center">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl font-extrabold text-center">
            Message Anyone
          </h2>
          <p className="text-center m-4">
            You can message anyone in the network and your chat history will
            apear here
          </p>
          <Link href="/freelancers" className="btn my-2">
            Find People
          </Link>
        </div>
      </div>
    );
  }

  return chatRooms.map((chat) => (
    <div key={chat.id} className="flex flex-col border-b">
      <div
        role="button"
        onClick={handleSelectRoom}
        data-username={chat.users[0].username}
        className={clsx(
          'flex flex-row px-6 cursor-pointer hover:bg-base-200/50',
          roomId === chat.id && 'bg-base-200/50',
        )}
      >
        <div className="flex items-center justify-center py-2">
          <DefaultAvatar
            username={chat.users[0].username}
            avatar={chat.users[0].avatar}
          />
        </div>
        <div className="flex flex-col w-full py-2 ml-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold truncate">
              {chat.users[0].name}
            </h4>
            <span className="text-xs ml-1 text-gray-500 whitespace-nowrap">
              {formatDate(chat.messages[chat.messages.length - 1].createdAt)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 truncate">
              {htmlToText(chat.messages[chat.messages.length - 1].content)}
            </p>
            {chat.unreadCounter > 0 && (
              <div className="bg-primary rounded-full ml-2">
                <span className="text-sm p-2">{chat.unreadCounter}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ));
};
