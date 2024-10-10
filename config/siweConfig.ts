'use client';

import type { SIWEConfig } from 'connectkit';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SiweMessage } from 'siwe';

import type { SessionData } from '@/session/sessionConfig';
import { useSessionStore } from '@/stores/useSessionStore';

export const siweConfig = (router: AppRouterInstance) =>
  ({
    getNonce: async () => {
      const res = await fetch('/api/session/siwe', { method: 'PUT' });
      if (!res.ok) throw new Error('Failed to fetch SIWE nonce');

      return res.text();
    },
    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        nonce,
        chainId,
        address,
        version: '1',
        uri: window.location.origin,
        domain: window.location.host,
        statement: 'Sign In With Ethereum to prove you control this wallet.',
      }).prepareMessage();
    },
    verifyMessage: async ({ message, signature }) => {
      const response = await fetch('/api/session/siwe', {
        method: 'POST',
        body: JSON.stringify({ message, signature }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        router.refresh();
      }

      return response.ok;
    },
    getSession: async () => {
      const res = await fetch('/api/session');
      if (!res.ok) throw new Error('Failed to fetch SIWE session');

      const session: SessionData = await res.json();

      useSessionStore.setState({ session, isLoading: false });

      if (session.isLoggedIn && !session.username) {
        router.replace('/onboarding');
      }

      return session.address && session.chainId
        ? { address: session.address, chainId: session.chainId }
        : null;
    },
    signOut: async () => {
      const response = await fetch('/api/session/delete');
      useSessionStore.setState({ session: null, isLoading: false });
      router.replace('/');
      return response.ok;
    },
  }) satisfies SIWEConfig;
