'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useChatRooms } from '@/hooks/messages/useChatRooms';

export const ChatHeader = () => {
  const { currentRoom } = useChatRooms();
  const params = useSearchParams();

  const username = currentRoom?.users[0].username || params.get('username');
  const name = currentRoom?.users[0].name || params.get('name');

  return (
    <div className="flex items-center justify-between align-bottom p-6 shadow">
      <h3 className="text-xl font-medium capitalize">
        <Link href={`/users/${username}`} className="underline">
          {name}
        </Link>
        <span className="text-gray-500 ml-2">@{username}</span>
      </h3>
    </div>
  );
};
