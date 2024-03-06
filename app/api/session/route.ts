import { NextResponse } from 'next/server';

import { getServerSession } from '@/session/getServerSession';

export const GET = async () => {
  try {
    const session = await getServerSession();

    if (!session.isLoggedIn) {
      return NextResponse.json({
        message: 'No session found',
        status: 404,
      });
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Internal server error',
      status: 500,
    });
  }
};
