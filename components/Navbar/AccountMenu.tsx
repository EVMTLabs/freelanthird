'use client';

import { ConnectKitButton, useSIWE } from 'connectkit';
import { Bell, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useDisconnect } from 'wagmi';

import { WalletAvatar } from '@/components/Avatars/WalletAvatar/WalletAvatar';
import { useSessionStore } from '@/stores/useSessionStore';

export const AccountMenu = () => {
  const { disconnect } = useDisconnect();
  const { isSignedIn } = useSIWE();

  const { isLoading } = useSessionStore();

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        if (isConnected && isSignedIn) {
          return (
            <>
              <div className="flex items-center">
                <Link
                  href="/help"
                  className="btn btn-ghost btn-circle hover:bg-transparent"
                >
                  <HelpCircle size={21} />
                </Link>
                <button className="btn btn-ghost btn-circle hover:bg-transparent">
                  <div className="indicator">
                    <Bell size={21} />
                    <span className="badge badge-xs badge-primary indicator-item" />
                  </div>
                </button>
              </div>
              <div className="dropdown dropdown-end ml-2">
                <div tabIndex={0} role="button">
                  <WalletAvatar />
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 border w-44"
                >
                  <li>
                    <Link className="text-lg font-medium" href="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="text-lg font-medium" href="/settings">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      className="text-lg font-medium"
                      onClick={handleDisconnect}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          );
        }
        return (
          <button
            onClick={show}
            disabled={isLoading}
            className="btn btn-neutral text-base-100"
          >
            Connect Wallet
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
