'use client';

import type { MouseEvent } from 'react';
import clsx from 'clsx';

import { useChatRooms } from '@/hooks/messages/useChatRooms';
import { formatDate } from '@/utils/formatDate';

import { ChatAvatar } from './ChatAvatar';

export const ChatHistory = () => {
  const { chatRooms, roomId, setSelectedRoomId } = useChatRooms();

  const handleSelectRoom = (event: MouseEvent<HTMLDivElement>) => {
    const id = event?.currentTarget?.dataset?.roomId;
    if (id) setSelectedRoomId?.(id);
  };

  if (!chatRooms?.length || !chatRooms[0].messages.length) return null;

  return chatRooms.map((chat) => (
    <div key={chat.id} className="flex flex-col mt-4 border-b">
      <div
        role="button"
        onClick={handleSelectRoom}
        data-room-id={chat.id}
        className={clsx(
          'flex flex-row px-6 cursor-pointer hover:bg-base-200/50',
          roomId === chat.id && 'bg-base-200/50',
        )}
      >
        <div className="flex items-center justify-center py-2">
          <ChatAvatar
            username={chat.users[0].username}
            avatar={chat.users[0].avatar}
            size={42}
          />
        </div>
        <div className="flex flex-col w-full py-2 ml-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold truncate">
              {chat.users[0].username}
            </h4>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {formatDate(chat.messages[0].createdAt)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm truncate text-gray-500">
              {chat.messages[0].content}
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
