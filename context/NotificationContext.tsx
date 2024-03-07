'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { useWebsocket } from '@/hooks/common/useWebsocket';
import type { WSChatMessageResponse } from '@/types/messages';
import { NotificationEvent } from '@/types/notifications';

interface MessagesContextProps {
  hasNewMessages: boolean;
}

export const NotificationContext = createContext<MessagesContextProps>({
  hasNewMessages: false,
});

export const messagesQueryKey = ['messages'];

export const MessagesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasNewMessages, setHasNewMessages] = useState(false);

  const { lastMessage } = useWebsocket<WSChatMessageResponse>();

  useEffect(() => {
    if (
      lastMessage !== null &&
      lastMessage.event === NotificationEvent.NEW_MESSAGE
    ) {
      setHasNewMessages(true);
    }
  }, [lastMessage]);

  return (
    <NotificationContext.Provider
      value={{
        hasNewMessages,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
