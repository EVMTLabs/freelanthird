import { useSuspenseQuery } from '@tanstack/react-query';

import type { SessionData } from '@/session/sessionConfig';
import { getBaseURL } from '@/utils/getBaseUrl';

const fetchSession = async (): Promise<SessionData> => {
  const host = getBaseURL();
  const res = await fetch(`${host}/api/session`);
  if (!res.ok) throw new Error('Failed to fetch session');

  return res.json();
};

export const useSession = () => {
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: ['session'],
    queryFn: fetchSession,
  });

  const { username, isLoggedIn, role, userId, token } = data;

  return {
    username,
    isLoggedIn,
    role,
    userId,
    token,
    isLoading,
    isError,
  };
};
