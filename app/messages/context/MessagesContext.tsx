'use client';

import type { Dispatch, SetStateAction } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';

import { useChatHistory } from '@/hooks/messages/useChatHistory';
import type { ChatHistory, ChatRoomMessages } from '@/types/messages';

interface MessagesContextProps {
  rooms: ChatHistory[];
  currentRoomMessages: ChatRoomMessages[] | undefined;
  selectedRoomId: string | null;
  setSelectedRoomId?: (id: string) => void;
  setRooms: Dispatch<SetStateAction<ChatHistory[]>>;
}

export const MessagesContext = createContext<MessagesContextProps>({
  rooms: [],
  currentRoomMessages: [],
  selectedRoomId: null,
  setSelectedRoomId: () => {},
  setRooms: () => {},
});

export const MessagesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [rooms, setRooms] = useState<ChatHistory[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const { lastMessage } = useChatHistory();

  useEffect(() => {
    if (lastMessage !== null && lastMessage.event === 'new_message') {
      setRooms((prevRooms) => {
        const roomExists = prevRooms.some(
          (room: ChatHistory) => room.id === lastMessage.data.chatRoomId,
        );
        if (!roomExists) {
          return [
            ...prevRooms,
            {
              id: lastMessage.data.chatRoomId,
              messages: [lastMessage.data],
              createdAt: new Date(),
              users: [],
              unreadCounter: 0,
            },
          ];
        }

        const newRooms = prevRooms.map((room) => {
          if (room.id === lastMessage.data.chatRoomId) {
            return {
              ...room,
              messages: [...room.messages, lastMessage.data],
            };
          }
          return room;
        });
        return newRooms;
      });
    }
  }, [lastMessage]);

  useEffect(() => {
    if (rooms.length && !selectedRoomId && rooms[0].messages.length) {
      setSelectedRoomId(rooms[0]?.id);
    }
  }, [rooms]);

  const currentRoomMessages = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId)?.messages,
    [rooms, selectedRoomId],
  );

  return (
    <MessagesContext.Provider
      value={{
        rooms,
        currentRoomMessages,
        selectedRoomId,
        setSelectedRoomId,
        setRooms,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
