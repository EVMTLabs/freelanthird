'use client';

import { create } from 'zustand';

import type { SessionData } from '@/session/sessionConfig';

interface SessionState {
  session: SessionData | null;
  setSession: (session: SessionData) => void;
  removeSession: () => void;
  isLoading: boolean;
  isProfileCompleted: boolean;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  isLoading: true,
  isProfileCompleted: false,
  setSession: (session: SessionData) => {
    set(() => ({
      session: session,
      isLoading: false,
      isProfileCompleted: Boolean(session.username),
    }));
  },
  removeSession: () => {
    set(() => ({ session: null }));
  },
}));
