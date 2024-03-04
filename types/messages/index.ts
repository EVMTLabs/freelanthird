import type { MessageStatus } from '@prisma/client';

export interface ChatRoomMessages {
  id: string;
  content: string;
  type: string;
  createdAt: Date;
  userId: string;
  chatRoomId: string;
  status: MessageStatus;
  user: {
    id: string;
    username: string | null;
    avatar: string | null;
  };
}

export interface ChatHistory {
  id: string;
  users: {
    id: string;
    username: string | null;
    avatar: string | null;
  }[];
  messages: ChatRoomMessages[];
  unreadCounter: number;
}

export interface WSChatMessageResponse {
  data: ChatRoomMessages;
  event: 'new_message';
}
