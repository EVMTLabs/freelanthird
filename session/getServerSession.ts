'use server';

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

import type { SessionData } from './sessionConfig';
import { sessionOptions } from './sessionConfig';

export async function getServerSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}
