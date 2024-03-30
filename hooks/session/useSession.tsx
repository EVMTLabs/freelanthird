'use client';

import { useMemo } from 'react';
import { useAccount } from 'wagmi';

import { useSessionStore } from '@/stores/useSessionStore';

export const useSession = () => {
  const { isConnected } = useAccount();
  const { session, isProfileCompleted, isLoading, setSession } =
    useSessionStore();

  const isLoggedIn = useMemo(
    () => isConnected && session?.isLoggedIn,
    [isConnected, session?.isLoggedIn],
  );

  return {
    session: { ...session, isLoggedIn },
    isProfileCompleted,
    isLoading,
    setSession,
  };
};
