'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';

import { ChatBubble } from '@/components/ChatBubble/ChatBubble';
import { useWindowVisibility } from '@/hooks/common/useWindowVisibility';
import { useChatRooms } from '@/hooks/messages/useChatRooms';

export const ChatMessages = () => {
  const { currentRoomMessages, updateUnreadCounter } = useChatRooms();
  const [showMessages, setShowMessages] = useState(false);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { isActiveTab } = useWindowVisibility();

  useEffect(() => {
    if (currentRoomMessages?.length && (!showMessages || inView)) {
      lastMessageRef.current?.scrollIntoView({ behavior: 'instant' });
      setShowMessages(true);
    }
  }, [currentRoomMessages]);

  useEffect(() => {
    updateUnreadCounter();
  }, [inView, isActiveTab]);

  return (
    <div
      id="chat-messages"
      className="flex flex-col relative h-full py-6 mx-2 flex-1 items-center scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-base-200 scrollbar-track-transparent overflow-y-auto"
    >
      <div
        className={clsx(
          'flex flex-col gap-4 relative transition-all duration-300 w-full h-full max-w-4xl opacity-0',
          showMessages && 'opacity-100',
        )}
      >
        {currentRoomMessages?.map(({ id, createdAt, content, sender }) => (
          <ChatBubble
            key={id}
            content={content}
            avatar={sender?.avatar}
            username={sender?.username}
            createdAt={createdAt}
          />
        ))}
        <div ref={ref} />
        <div ref={lastMessageRef} className="p-5" />
      </div>
    </div>
  );
};
