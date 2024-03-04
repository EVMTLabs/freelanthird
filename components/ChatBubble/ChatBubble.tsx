import { ChatAvatar } from '@/app/messages/components/ChatAvatar';
import { formatDate } from '@/utils/formatDate';

interface ChatBubbleProps {
  username: string | null;
  avatar: string | null;
  content: string;
  createdAt: Date;
}

export const ChatBubble = ({
  avatar,
  content,
  username = 'Anonymous',
  createdAt,
}: ChatBubbleProps) => {
  const dateTime = formatDate(createdAt);

  return (
    <div className="flex px-6 mt-6">
      <div className="flex flex-start">
        <ChatAvatar username={username} avatar={avatar} />
      </div>
      <div className="flex flex-col ml-4">
        <div className="flex gap-2 items-center">
          <strong className="text-lg">{username}</strong>
          <time className="text-xs opacity-80">{dateTime}</time>
        </div>
        <div className="text-base-content max-w-sm mt-2">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};
