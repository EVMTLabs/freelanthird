'use client';

import { useEffect, useMemo } from 'react';
import { MessageStatus } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  messagesQueryKey,
  useMessagesContext,
} from '@/app/messages/context/MessagesContext';
import { useSession } from '@/hooks/session/useSession';
import type { ChatHistory } from '@/types/messages';

export const useChatRooms = () => {
  const { session } = useSession();
  const params = useSearchParams();

  const router = useRouter();

  const { userId, username, avatar = '', name } = session || {};

  const paramUsername = params.get('username');
  const paramName = params.get('name');

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
    if (!paramUsername && !selectedRoomId && chatRooms?.length) {
      const usernameRoute =
        chatRooms[0].users[0].username === username
          ? chatRooms[0].users[1].username
          : chatRooms[0].users[0].username;
      router.push(`/messages?username=${usernameRoute}`);
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
    if (!userId || !username || !name) return;

    const receiver = chatRooms
      ?.find((room) => room.id === selectedRoomId)
      ?.users.find((user) => user.id !== userId);

    sendMessageToWS({
      id: '',
      content,
      type,
      chatRoomId: selectedRoomId || '',
      isNewRoom: !selectedRoomId,
      createdAt: new Date().toUTCString(),
      status: MessageStatus.SENT,
      sender: {
        id: userId,
        username,
        avatar,
        name,
      },
      receiver: {
        id: receiver?.id || '',
        username: receiver?.username || paramUsername || '',
        avatar: receiver?.avatar || '',
        name: receiver?.name || paramName || '',
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
