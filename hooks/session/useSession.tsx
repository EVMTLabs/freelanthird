'use client';

import { useSessionStore } from '@/stores/useSessionStore';

export const useSession = () => {
  const { session, isProfileCompleted, isLoading } = useSessionStore();

  return { session, isProfileCompleted, isLoading };
};
