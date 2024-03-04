'use client';

import { useCallback, useContext, useState } from 'react';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ArrowUp, Paperclip, ReceiptText } from 'lucide-react';

import { useChatHistory } from '@/hooks/messages/useChatHistory';
import { useSession } from '@/hooks/session/useSession';

import { MessagesContext } from '../context/MessagesContext';

export const SendMessage = () => {
  const { selectedRoomId } = useContext(MessagesContext);
  const { userId, username } = useSession();
  const { sendJsonMessage } = useChatHistory();

  const [message, setMessage] = useState('');

  const handleClickSendMessage = useCallback(
    () =>
      sendJsonMessage({
        type: 'text',
        content: message,
        chatRoomId: selectedRoomId,
        receiverId: userId,
        userId,
        username,
      }),
    [selectedRoomId, message],
  );

  const editor = useEditor({
    content: message,
    extensions: [
      StarterKit.configure(),
      Link.configure({
        protocols: ['https'],
        HTMLAttributes: {
          class: 'text-blue-500 underline',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Placeholder.configure({
        placeholder: 'Send message…',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'textarea border-none w-full text-lg focus:outline-none max-h-96 overflow-y-auto',
      },
    },
    autofocus: true,
    onUpdate({ editor }) {
      setMessage(editor.getHTML());
    },
  });

  return (
    <div className="flex place-items-end w-full p-2 max-w-4xl border rounded-lg">
      <div className="flex gap-1">
        <div className="tooltip" data-tip="Create offer">
          <button className="btn btn-square btn-ghost btn-primary">
            <ReceiptText size={24} />
          </button>
        </div>
        <div className="tooltip" data-tip="Attach file">
          <button className="btn btn-ghost btn-square">
            <Paperclip size={24} />
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full relative">
        <EditorContent editor={editor} />
      </div>
      <div className="tooltip" data-tip="Send message">
        <button
          onClick={handleClickSendMessage}
          className="btn btn-square hover:bg-neutral hover:text-neutral-content ml-2"
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </div>
  );
};
