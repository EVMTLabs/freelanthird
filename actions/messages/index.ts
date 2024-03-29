'use server';

import { MessageStatus } from '@prisma/client';

import prisma from '@/prisma/db';
import { getServerSession } from '@/session/getServerSession';

export const findChatHistory = async (id: string) => {
  try {
    const chatHistory = await prisma.chatRoom.findMany({
      take: 100,
      orderBy: {
        updatedAt: 'desc',
      },
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
            sender: {
              select: {
                id: true,
                username: true,
                avatar: true,
                name: true,
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
            name: true,
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
      sender: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
};

export const findFirstUnreadMessage = async (userId: string) => {
  if (!userId) {
    return null;
  }

  return prisma.chatMessage.findFirst({
    where: {
      status: MessageStatus.SENT,
      chatRoom: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    },
  });
};

export const updateMessagesToSeen = async (chatRoomId: string) => {
  if (!chatRoomId) {
    throw new Error('Bad request');
  }

  const session = await getServerSession();

  if (!session || !session.isLoggedIn) {
    throw new Error('Unauthorized');
  }

  const updatedMessages = await prisma.chatMessage.updateMany({
    where: {
      chatRoomId: chatRoomId,
      status: MessageStatus.SENT,
      chatRoom: {
        users: {
          some: {
            id: session.userId,
          },
        },
      },
    },
    data: {
      status: MessageStatus.SEEN,
    },
  });

  return updatedMessages;
};
