import { NextResponse } from 'next/server';

import { getServerSession } from '@/session/getServerSession';

export const GET = async () => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      {
        message: 'No session found',
      },
      { status: 404 },
    );
  }

  session.destroy();

  return NextResponse.json({
    message: 'Session destroyed',
  });
};
