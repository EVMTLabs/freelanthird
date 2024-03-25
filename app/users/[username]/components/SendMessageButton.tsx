import { Send, SquarePen } from 'lucide-react';
import Link from 'next/link';

export const SendMessageButton = ({
  username,
  name,
  isSameUser,
}: {
  username: string | null;
  name: string | null;
  isSameUser: boolean;
}) => {
  if (isSameUser) {
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
