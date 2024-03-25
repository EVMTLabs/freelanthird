import { getServerSession } from '@/session/getServerSession';

export const GET = async () => {
  try {
    const session = await getServerSession();

    if (!session) {
      return Response.json({
        message: 'No session found',
        status: 404,
      });
    }

    session.destroy();

    return Response.redirect('/');
  } catch (error) {
    console.error(error);
    return Response.json({
      message: 'Internal server error',
      status: 500,
    });
  }
};
