'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

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
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { lastMessage, sendMessage } = useWebsocket<WSChatMessageResponse>();

  useEffect(() => {
    if (chatHistory) {
      queryClient.setQueryData(messagesQueryKey, chatHistory);
    }
  }, [chatHistory]);

  useEffect(() => {
    if (lastMessage !== null && lastMessage.event === 'new_message') {
      queryClient.setQueryData(messagesQueryKey, (prevRooms: ChatHistory[]) => {
        if (lastMessage.data.isNewRoom) {
          return [
            ...prevRooms,
            {
              id: lastMessage.data.chatRoomId,
              messages: [
                {
                  id: lastMessage.data.id,
                  content: lastMessage.data.content,
                  type: lastMessage.data.type,
                  createdAt: lastMessage.data.createdAt,
                  chatRoomId: lastMessage.data.chatRoomId,
                  senderId: lastMessage.data.senderId,
                  status: lastMessage.data.status,
                },
              ],
              users: lastMessage.data.newRoomUsers,
              unreadCounter: 1,
            },
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
