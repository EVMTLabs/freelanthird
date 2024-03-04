'use client';

import { useContext } from 'react';

import { MessagesContext } from '../context/MessagesContext';

export const ChatHeader = () => {
  const { rooms, selectedRoomId } = useContext(MessagesContext);

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  return (
    <div className="flex items-center justify-between align-bottom p-6 shadow">
      <h3 className="text-xl font-medium capitalize">
        <span className="underline">{selectedRoom?.users[0].username}</span>
        <span className="text-gray-500 ml-2">
          @{selectedRoom?.users[0].username}
        </span>
      </h3>
    </div>
  );
};
