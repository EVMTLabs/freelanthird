import { useContext, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

import { MessagesContext } from '@/app/messages/context/MessagesContext';
import type { WSChatUnreadMessagesResponse } from '@/types/messages';

import { useSession } from '../session/useSession';

export const useUnreadRoomsIds = () => {
  const { token } = useSession();
  const { unreadChatRoomsIds, setUnreadChatRoomsIds } =
    useContext(MessagesContext);

  const { lastJsonMessage, sendJsonMessage } =
    useWebSocket<WSChatUnreadMessagesResponse>(
      process.env.NEXT_PUBLIC_WSS_URL!,
      {
        protocols: ['Authorization', token],
        reconnectAttempts: 10,
        reconnectInterval: 3000,
        retryOnError: true,
        shouldReconnect: (closeEvent) => {
          if (closeEvent.code === 1000) {
            return false;
          }
          return true;
        },
        share: true,
      },
    );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      switch (lastJsonMessage.event) {
        case 'unread_messages':
          setUnreadChatRoomsIds((prev) => [
            ...prev,
            ...(lastJsonMessage.data as string[]),
          ]);
          break;
        case 'new_message':
          setUnreadChatRoomsIds((prev) => {
            if (
              'chatRoomId' in lastJsonMessage.data &&
              !prev.includes(lastJsonMessage.data.chatRoomId)
            ) {
              return [...prev, lastJsonMessage.data.chatRoomId];
            }
            return prev;
          });
      }
    }
  }, [lastJsonMessage]);

  return { unreadChatRoomsIds, sendJsonMessage };
};
