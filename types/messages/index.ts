import type { MessageStatus } from '@prisma/client';

import type { NotificationEvent } from '../notifications';

type User = {
  id: string;
  username: string | null;
  avatar: string | null;
};
export interface ChatRoomMessage {
  id: string;
  content: string;
  type: string;
  createdAt: Date;
  chatRoomId: string;
  senderId: string;
  status: MessageStatus;
  sender: User;
}

export interface ChatHistory {
  id: string;
  users: User[];
  messages: ChatRoomMessage[];
  unreadCounter: number;
}

export interface WSChatMessageResponse {
  data: {
    id: string;
    content: string;
    type: string;
    createdAt: string;
    chatRoomId: string;
    senderId: string;
    status: MessageStatus;
    sender: User;
    isNewRoom?: boolean;
    newRoomUsers?: User[];
  };
  event: NotificationEvent.NEW_MESSAGE;
}

export interface WSChatUnreadMessagesResponse {
  data: ChatRoomMessage | string[];
  event: NotificationEvent.NEW_MESSAGE;
}
