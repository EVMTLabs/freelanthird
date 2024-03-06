import type { MessageStatus } from '@prisma/client';

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

type WSEvents = 'new_message' | 'unread_messages';

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
  event: WSEvents;
}

export interface WSChatUnreadMessagesResponse {
  data: ChatRoomMessage | string[];
  event: WSEvents;
}
