"use client";

import type { Editor } from "@tiptap/react";
import clsx from "clsx";
import {
  Bold,
  Heading,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

export const EditorToolBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="absolute top-0 left-0 right-0 z-10 border-b flex gap-4 bg-transparent px-4 py-2">
      <div className="flex gap-4 p-2">
        <button
          type="button"
          className={clsx(
            "btn btn-sm w-fit",
            !editor.isActive("heading") && "btn-ghost"
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading size={18} />
        </button>
        <button
          type="button"
          className={clsx(
            "btn btn-sm w-fit",
            !editor.isActive("bold") && "btn-ghost"
          )}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          className={clsx(
            "btn btn-sm w-fit",
            !editor.isActive("italic") && "btn-ghost"
          )}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          className={clsx(
            "btn btn-sm w-fit",
            !editor.isActive("strike") && "btn-ghost"
          )}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={18} />
        </button>
        <button
          type="button"
          className={clsx(
            "btn btn-sm w-fit",
            !editor.isActive("bulletList") && "btn-ghost"
          )}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={18} />
        </button>
        <button
          type="button"
          className={clsx(
            "btn btn-sm w-fit",
            !editor.isActive("orderedList") && "btn-ghost"
          )}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={18} />
        </button>
        {/* TODO: add link button option https://tiptap.dev/docs/editor/api/marks/link */}
      </div>
    </div>
  );
};
