import { useEffect, useMemo } from 'react';
import { MessageStatus } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import {
  messagesQueryKey,
  useMessagesContext,
} from '@/app/messages/context/MessagesContext';
import { useSession } from '@/context/SessionContext';
import type { ChatHistory } from '@/types/messages';

export const useChatRooms = () => {
  const { session } = useSession();

  const { userId, username, avatar = '' } = session || {};

  const {
    sendMessage: sendMessageToWS,
    selectedRoomId,
    setSelectedRoomId,
    updateUnreadCounter,
  } = useMessagesContext();

  const { data: chatRooms, isLoading } = useQuery<ChatHistory[]>({
    queryKey: messagesQueryKey,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    if (!selectedRoomId && chatRooms?.length) {
      setSelectedRoomId(chatRooms[0]?.id);
    }
  }, [chatRooms]);

  const currentRoomMessages = useMemo(
    () => chatRooms?.find((room) => room.id === selectedRoomId)?.messages,
    [chatRooms, selectedRoomId],
  );

  const currentRoom = useMemo(
    () => chatRooms?.find((room) => room.id === selectedRoomId),
    [chatRooms, selectedRoomId],
  );

  const sendMessage = ({
    content,
    type,
  }: {
    content: string;
    type: string;
  }) => {
    console.log('first');
    if (!selectedRoomId || !userId || !currentRoom || !username) return;

    console.log('second');

    const receiverId = chatRooms
      ?.find((room) => room.id === selectedRoomId)
      ?.users.find((user) => user.id !== userId)?.id;

    if (!receiverId) return;

    sendMessageToWS({
      id: '',
      content,
      type,
      chatRoomId: selectedRoomId,
      senderId: userId,
      createdAt: new Date().toUTCString(),
      status: MessageStatus.SENT,
      sender: {
        id: userId,
        username,
        avatar,
      },
    });
  };

  return {
    roomId: selectedRoomId,
    setSelectedRoomId,
    sendMessage,
    chatRooms,
    currentRoom,
    currentRoomMessages,
    isLoading,
    updateUnreadCounter,
  };
};
