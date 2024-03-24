'use client';

import { Send, SquarePen } from 'lucide-react';
import Link from 'next/link';
import { useAccount } from 'wagmi';

export const SendMessageButton = ({
  username,
  name,
  userAddress,
}: {
  username: string | null;
  name: string | null;
  userAddress: string;
}) => {
  const { address } = useAccount();

  if (address === userAddress) {
    return (
      <Link className="btn btn-outline" href="/profile">
        Edit profile <SquarePen size={24} />
      </Link>
    );
  }

  if (!username || !name) {
    return null;
  }

  return (
    <Link
      className="btn btn-outline"
      href={`/messages?username=${username}&name=${name}`}
    >
      Send message <Send size={24} />
    </Link>
  );
};
