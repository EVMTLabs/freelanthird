'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { useSession } from '@/context/SessionContext';
import { useWebsocket } from '@/hooks/common/useWebsocket';
import type { ChatHistory, WSChatMessageResponse } from '@/types/messages';

interface MessagesContextProps {
  selectedRoomId: string | null;
  setSelectedRoomId: (id: string) => void;
  sendMessage: (message: WSChatMessageResponse['data']) => void;
  updateUnreadCounter: () => void;
}

export const MessagesContext = createContext<MessagesContextProps>({
  selectedRoomId: null,
  setSelectedRoomId: () => {},
  sendMessage: () => {},
  updateUnreadCounter: () => {},
});

export const messagesQueryKey = ['messages'];

export const MessagesProvider = ({
  children,
  chatHistory,
}: {
  children: React.ReactNode;
  chatHistory: ChatHistory[];
}) => {
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const { session } = useSession();

  const { lastMessage, sendMessage } = useWebsocket<WSChatMessageResponse>();

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const receiverUsername = params.get('username');

  useEffect(() => {
    if (chatHistory) {
      queryClient.setQueryData(messagesQueryKey, chatHistory);
    }
  }, [chatHistory]);

  useEffect(() => {
    if (receiverUsername) {
      const room = chatHistory.find((room) =>
        room.users.some((user) => user.username === receiverUsername),
      );

      if (room) {
        setSelectedRoomId(room.id);
      }
    }
  }, [receiverUsername]);

  useEffect(() => {
    if (lastMessage !== null && lastMessage.event === 'new_message') {
      queryClient.setQueryData(messagesQueryKey, (prevRooms: ChatHistory[]) => {
        if (lastMessage.data.isNewRoom) {
          return [
            {
              id: lastMessage.data.chatRoomId,
              messages: [
                {
                  id: lastMessage.data.id,
                  content: lastMessage.data.content,
                  type: lastMessage.data.type,
                  createdAt: lastMessage.data.createdAt,
                  chatRoomId: lastMessage.data.chatRoomId,
                  status: lastMessage.data.status,
                  sender: lastMessage.data.sender,
                },
              ],
              sender: lastMessage.data.sender,
              receiver: lastMessage.data.receiver,
              users:
                session?.userId === lastMessage.data.sender.id
                  ? [lastMessage.data.receiver]
                  : [lastMessage.data.sender],
              unreadCounter: 1,
            },
            ...prevRooms,
          ];
        }

        return prevRooms.map((room) => {
          if (room.id === lastMessage.data.chatRoomId) {
            return {
              ...room,
              messages: [...room.messages, lastMessage.data],
            };
          }
          return room;
        });
      });

      if (
        lastMessage.data.isNewRoom &&
        session?.userId === lastMessage.data.sender.id
      ) {
        setSelectedRoomId(lastMessage.data.chatRoomId);
      }
    }
  }, [lastMessage]);

  const updateUnreadCounter = async () => {
    try {
      await fetch(`/api/messages/status?chatRoomId=${selectedRoomId}`);
      queryClient.setQueryData(messagesQueryKey, (prevRooms: ChatHistory[]) => {
        return prevRooms.map((room) => {
          if (room.id === selectedRoomId) {
            return {
              ...room,
              unreadCounter: 0,
            };
          }
          return room;
        });
      });
    } catch (error) {
      console.error('Messages:', error);
    }
  };

  return (
    <MessagesContext.Provider
      value={{
        selectedRoomId,
        setSelectedRoomId,
        sendMessage,
        updateUnreadCounter,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessagesContext = () => useContext(MessagesContext);
