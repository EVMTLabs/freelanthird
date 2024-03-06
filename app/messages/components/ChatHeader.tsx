'use client';

import { useChatRooms } from '@/hooks/messages/useChatRooms';

export const ChatHeader = () => {
  const { currentRoom } = useChatRooms();

  return (
    <div className="flex items-center justify-between align-bottom p-6 shadow">
      <h3 className="text-xl font-medium capitalize">
        <span className="underline">{currentRoom?.users[0].username}</span>
        <span className="text-gray-500 ml-2">
          @{currentRoom?.users[0].username}
        </span>
      </h3>
    </div>
  );
};
