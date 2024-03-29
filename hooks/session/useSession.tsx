'use client';

import { useSessionStore } from '@/stores/useSessionStore';

export const useSession = () => {
  const { session, isProfileCompleted, isLoading, setSession } =
    useSessionStore();

  return { session, isProfileCompleted, isLoading, setSession };
};
