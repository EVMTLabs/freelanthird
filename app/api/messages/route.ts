import { NextResponse } from 'next/server';

import {
  findChatMessages,
  findUserInChatRoom,
} from '@/prisma/actions/messages';
import { getServerSession } from '@/session/getServerSession';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const chatRoomId = searchParams.get('chatRoomId');

    if (!chatRoomId) {
      return NextResponse.json({
        message: 'Bad request',
        status: 400,
      });
    }

    const session = await getServerSession();

    if (!session || !session.isLoggedIn) {
      return NextResponse.json({
        message: 'Unauthorized',
        status: 401,
      });
    }

    const isUserInChatRoom = await findUserInChatRoom(
      chatRoomId,
      session.userId,
    );

    if (!isUserInChatRoom) {
      return NextResponse.json({
        message: 'Unauthorized',
        status: 401,
      });
    }

    const messages = await findChatMessages(chatRoomId);

    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Internal server error',
      status: 500,
    });
  }
};
