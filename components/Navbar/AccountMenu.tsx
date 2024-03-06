'use client';

import { Avatar, ConnectKitButton, useSIWE } from 'connectkit';
import { Bell, HelpCircle } from 'lucide-react';
import { useDisconnect } from 'wagmi';

export const AccountMenu = () => {
  const { disconnect } = useDisconnect();
  const { isSignedIn } = useSIWE();

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
                <a href="/" className="btn btn-sm btn-outline mr-2">
                  Hire Teams
                </a>
                <a
                  href="/"
                  className="btn btn-ghost btn-circle hover:bg-transparent"
                >
                  <HelpCircle size={21} />
                </a>
                <button className="btn btn-ghost btn-circle hover:bg-transparent">
                  <div className="indicator">
                    <Bell size={21} />
                    <span className="badge badge-xs badge-primary indicator-item" />
                  </div>
                </button>
              </div>
              <div className="dropdown dropdown-end ml-2">
                <div tabIndex={0} role="button">
                  <Avatar size={32} />
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <button className="" onClick={handleDisconnect}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          );
        }
        return (
          <button onClick={show} className="btn btn-neutral text-base-100">
            Connect Wallet
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
