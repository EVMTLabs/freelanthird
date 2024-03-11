'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSIWE } from 'connectkit';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

import type { SessionData } from '@/session/sessionConfig';
import { getBaseURL } from '@/utils/getBaseUrl';

interface SessionContextProps extends SessionData {
  isLoading: boolean;
  isProfileCompleted: boolean;
  refetchSession: () => void;
}

export const SessionContext = createContext<SessionContextProps>({
  isLoggedIn: false,
  role: 'user',
  userId: '',
  token: '',
  isLoading: true,
  isProfileCompleted: false,
  isFreelancer: false,
  nonce: '',
  address: '',
  chainId: 0,
  refetchSession: () => {},
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
  const { isSignedIn, signOut } = useSIWE();
  const { isConnected } = useAccount();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    data: userSession,
    isLoading,
    refetch,
  } = useSuspenseQuery({
    queryKey: ['session'],
    queryFn: fetchSession,
  });

  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    if (isSignedIn && isConnected) {
      setIsLoggedIn(true);
    } else if (isSignedIn && !isConnected) {
      setIsLoggedIn(false);
      handleSignOut();
    } else {
      setIsLoggedIn(false);
    }
  }, [isSignedIn, isConnected]);

  const isProfileCompleted = useMemo(() => {
    return !isLoading && !!userSession.username;
  }, [isLoading, userSession.username]);

  useEffect(() => {
    if (!isProfileCompleted && isLoggedIn) {
      router.push('/onboarding');
    }
  }, [isProfileCompleted, isLoggedIn]);

  const refetchSession = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error('Error refetching session', error);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        ...userSession,
        isLoading,
        isProfileCompleted,
        refetchSession,
        isLoggedIn,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
