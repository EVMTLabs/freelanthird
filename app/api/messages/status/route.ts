import { updateMessagesToSeen } from '@/actions/messages';
import { getServerSession } from '@/session/getServerSession';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const chatRoomId = searchParams.get('chatRoomId');

    if (!chatRoomId) {
      return Response.json({
        message: 'Bad request',
        status: 400,
      });
    }

    const session = await getServerSession();

    if (!session || !session.isLoggedIn) {
      return Response.json({
        message: 'Unauthorized',
        status: 401,
      });
    }

    await updateMessagesToSeen(chatRoomId, session.userId);

    return new Response('All messages status has been updated');
  } catch (error) {
    console.error(error);
    return Response.json({
      message: 'Internal server error',
      status: 500,
    });
  }
};
