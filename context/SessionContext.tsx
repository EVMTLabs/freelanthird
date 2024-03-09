'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

import type { SessionData } from '@/session/sessionConfig';
import { getBaseURL } from '@/utils/getBaseUrl';

interface SessionContextProps {
  isLoggedIn: boolean;
  username: string | null;
  role: string;
  userId: string;
  token: string;
  avatar: string | null;
}

export const SessionContext = createContext<SessionContextProps>({
  isLoggedIn: false,
  username: null,
  role: 'user',
  userId: '',
  token: '',
  avatar: null,
});

const fetchSession = async (): Promise<SessionData> => {
  const host = getBaseURL();
  const res = await fetch(`${host}/api/session`);
  if (!res.ok) throw new Error('Failed to fetch session');

  return res.json();
};

export const sessionQueryKey = ['session'];

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isSignedIn } = useSIWE();
  const { isConnected } = useAccount();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data } = useSuspenseQuery({
    queryKey: ['session'],
    queryFn: fetchSession,
  });

  const { username, role, userId, token, avatar } = data;

  useEffect(() => {
    if (isSignedIn && isConnected) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isSignedIn, isConnected]);

  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        username,
        role,
        userId,
        token,
        avatar,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
