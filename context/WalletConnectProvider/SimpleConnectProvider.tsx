'use client';

import type { ReactNode } from 'react';
import { ConnectKitProvider } from 'connectkit';

import { ConnectAvatar } from '@/components/Avatars/ConnectAvatar/ConnectAvatar';

export const SimpleConnectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <ConnectKitProvider
      theme="soft"
      options={{
        customAvatar: ConnectAvatar,
        embedGoogleFonts: true,
      }}
      customTheme={{
        '--ck-font-family': '"Albert Sans", sans-serif',
      }}
    >
      {children}
    </ConnectKitProvider>
  );
};
