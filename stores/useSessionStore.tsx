import { create } from 'zustand';

import type { SessionData } from '@/session/sessionConfig';

interface SessionState {
  session: SessionData | null;
  setSession: (session: SessionData) => void;
  removeSession: () => void;
  isLoading: boolean;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  isLoading: true,
  setSession: (session: SessionData) => {
    set(() => ({ session: session, isLoading: false }));
  },
  removeSession: () => {
    set(() => ({ session: null }));
  },
}));
