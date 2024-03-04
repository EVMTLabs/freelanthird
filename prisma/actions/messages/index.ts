import { MessageStatus } from '@prisma/client';

import prisma from '@/prisma/db';

export const findChatHistory = async (id: string) => {
  try {
    const chatHistory = await prisma.chatRoom.findMany({
      take: 100,
      where: {
        users: {
          some: {
            id,
          },
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
          take: 50,
        },
        users: {
          where: {
            id: {
              not: id,
            },
          },
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return chatHistory.map((chatRoom) => ({
      ...chatRoom,
      unreadCounter: chatRoom.messages.filter(
        (message) => message.status === MessageStatus.SENT,
      ).length,
    }));
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const findUserInChatRoom = async (
  chatRoomId: string,
  userId: string,
) => {
  return prisma.chatRoom.findFirst({
    where: {
      id: chatRoomId,
      users: {
        some: {
          id: userId,
        },
      },
    },
  });
};

export const findChatMessages = async (chatRoomId: string) => {
  return prisma.chatMessage.findMany({
    take: 100,
    where: {
      chatRoomId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
};

export const updateMessagesToSeen = async (
  chatRoomId: string,
  userId: string,
) => {
  const updatedMessages = await prisma.chatMessage.updateMany({
    where: {
      chatRoomId: chatRoomId,
      userId: userId,
      status: MessageStatus.SENT,
    },
    data: {
      status: MessageStatus.SEEN,
    },
  });

  return updatedMessages;
};
