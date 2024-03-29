import { NextResponse } from 'next/server';

import { getServerSession } from '@/session/getServerSession';

export const GET = async () => {
  const session = await getServerSession();

  if (!session.isLoggedIn) {
    return NextResponse.json({
      message: 'No session found',
      session: null,
    });
  }

  return NextResponse.json(session);
};
