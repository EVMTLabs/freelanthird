'use client';

import { useEffect } from 'react';
import { ConnectKitButton, useSIWE } from 'connectkit';
import { Bell, HelpCircle, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useAccount, useDisconnect } from 'wagmi';

import { WalletAvatar } from '@/components/Avatars/WalletAvatar/WalletAvatar';
import { useSessionStore } from '@/stores/useSessionStore';

export const AccountMenu = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { isSignedIn, signOut } = useSIWE();

  const { isLoading } = useSessionStore();

  const handleDisconnect = () => {
    disconnect();
  };

  useEffect(() => {
    if (!isConnected && isSignedIn) {
      signOut();
    }
  }, []);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        if (isConnected && isSignedIn) {
          return (
            <>
              <div className="flex items-center">
                <Link
                  href="/faq"
                  className="btn btn-ghost btn-circle hover:bg-transparent"
                >
                  <HelpCircle size={21} />
                </Link>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle hover:bg-transparent"
                  >
                    <div className="indicator">
                      <Bell size={21} />
                      {/* <span className="badge badge-xs badge-primary indicator-item" /> */}
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-80 border"
                  >
                    <p className="text-lg font-bold border-b px-2">
                      New notifications
                    </p>
                    <p className="text-center text-md font-medium py-4 text-gray-500">
                      No new notifications
                    </p>
                  </div>
                </div>
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
                      <User size={18} /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="text-lg font-medium" href="/settings">
                      <Settings size={18} /> Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      className="text-lg font-medium"
                      onClick={handleDisconnect}
                    >
                      <LogOut size={18} />
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
            className="btn btn-neutral text-base-100 w-32"
          >
            Connect
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
