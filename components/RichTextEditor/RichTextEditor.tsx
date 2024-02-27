"use client";

import { useEffect } from "react";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { EditorToolBar } from "./EditorToolBar";

export const RichTextEditor = ({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    content: description,
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        HTMLAttributes: {
          class: "text-2xl my-2 font-bold",
          levels: [2],
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-8",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-8",
        },
      }),
      Link.configure({
        protocols: ["https"],
        HTMLAttributes: {
          class: "text-blue-500 underline",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "textarea textarea-bordered textarea-lg pt-20 min-h-[500px]",
      },
    },
    autofocus: true,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.focus();
    }
  }, [editor]);

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] relative">
      <EditorToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
