'use client';

import type { ReactNode } from 'react';

import { useSession } from '@/hooks/session/useSession';

import { ConnectWalletMessage } from './ConnectWalletMessage';

export const ProposalContainer = ({ children }: { children: ReactNode }) => {
  const { session } = useSession();

  if (!session || !session.isLoggedIn) {
    return <ConnectWalletMessage />;
  }

  return children;
};
