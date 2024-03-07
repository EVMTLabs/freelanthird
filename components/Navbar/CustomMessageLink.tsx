'use client';

import { useNotificationContext } from '@/context/NotificationContext';

import { CustomLink } from '../CustomLink/CustomLink';

export const CustomMessageLink = ({
  hasUnreadMessages,
}: {
  hasUnreadMessages: boolean;
}) => {
  const { hasNewMessages } = useNotificationContext();

  const showNotificationAlert = hasUnreadMessages || hasNewMessages;

  return (
    <CustomLink href="/messages">
      <span className="indicator">
        Messages
        {showNotificationAlert && (
          <span className="badge badge-xs badge-primary indicator-item right-[-10px] top-1" />
        )}
      </span>
    </CustomLink>
  );
};
