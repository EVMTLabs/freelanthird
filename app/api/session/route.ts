import { NextResponse } from 'next/server';

import { getServerSession } from '@/session/getServerSession';

export const GET = async () => {
  try {
    const session = await getServerSession();

    return NextResponse.json(session);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Internal server error',
      status: 500,
    });
  }
};

export const DELETE = async () => {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({
        message: 'No session found',
        status: 404,
      });
    }

    session.destroy();

    return NextResponse.json({
      message: 'Session destroyed',
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Internal server error',
      status: 500,
    });
  }
};
