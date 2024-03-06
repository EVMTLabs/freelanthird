'use client';

import { useCallback, useState } from 'react';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, Extension, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ArrowUp, Paperclip, ReceiptText } from 'lucide-react';

import { useChatRooms } from '@/hooks/messages/useChatRooms';

export const SendMessageInput = () => {
  const { sendMessage } = useChatRooms();

  const [message, setMessage] = useState('');

  const sendWSMessage = useCallback(() => {
    if (!message) return;

    sendMessage({
      type: 'text',
      content: message,
    });

    setMessage('');
  }, [message]);

  const ClearInputOnEnterExtension = Extension.create({
    name: 'clearInputOnEnter',

    addKeyboardShortcuts() {
      return {
        Enter: ({ editor }) => {
          // Clear input when Enter is pressed without Shift
          sendWSMessage();
          editor.commands.clearContent();
          return true; // Return true to indicate that the command has been handled
        },
        'Shift-Enter': ({ editor }) => {
          // Insert an empty line when Shift+Enter is pressed
          editor.chain().focus().setHardBreak().run();
          return true; // Return true to indicate that the command has been handled
        },
      };
    },
  });

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
      ClearInputOnEnterExtension,
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

  const handleClickSendMessage = useCallback(() => {
    sendWSMessage();
    editor?.commands.clearContent();
  }, [sendWSMessage, editor]);

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
