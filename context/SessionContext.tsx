'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSIWE } from 'connectkit';
import { useAccount, useDisconnect } from 'wagmi';

import type { SessionData } from '@/session/sessionConfig';
import { useSessionStore } from '@/stores/useSessionStore';

interface SessionContextProps {
  session: SessionData | null;
  isProfileCompleted: boolean;
  setSession: (session: SessionData) => void;
}

export const SessionContext = createContext<SessionContextProps>({
  session: null,
  isProfileCompleted: false,
  setSession: () => {},
});

export const sessionQueryKey = ['session'];

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isSignedIn, signOut } = useSIWE();
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { session, removeSession, setSession, isProfileCompleted } =
    useSessionStore();

  const handleSignOut = async () => {
    try {
      await disconnectAsync();
      await signOut();
      removeSession();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  useEffect(() => {
    if (isSignedIn && isConnected) {
      setIsLoggedIn(true);
    } else if (!isConnected) {
      handleSignOut();
    }
  }, [isSignedIn, isConnected]);

  return (
    <SessionContext.Provider
      value={{
        session: session
          ? {
              ...session,
              isLoggedIn,
            }
          : null,
        isProfileCompleted,
        setSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
