'use client';

import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export const EditorContentView = ({ description }: { description: string }) => {
  const editor = useEditor({
    editable: false,
    content: description,
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        HTMLAttributes: {
          class: 'text-2xl my-2 font-bold',
          levels: [2],
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-8',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-8',
        },
      }),
      Link.configure({
        protocols: ['https'],
        HTMLAttributes: {
          class: 'text-blue-500 underline',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'text-lg',
      },
    },
  });

  return <EditorContent editor={editor} />;
};
