import {
  headingsPlugin,
  listsPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { MutableRefObject, useRef } from "react";
import Button from "./button";

export type MarkdownEditorProps = {
  content: string;
  editorRef: MutableRefObject<HTMLDivElement | null>;
};

export function MarkdownEditor(props: MarkdownEditorProps) {
  const { editorRef, content } = props;

  return (
    <div className="flex rounded-md w-full max-w-lg mx-auto border bg-gray-100 divide-y">
      <div className="w-full">
        {/* Toolbar */}
        <Toolbar editorRef={editorRef} />
        {/* EditableContent Div */}
        <div
          ref={editorRef}
          contentEditable={true}
          tabIndex={0}
          className="min-h-[200px] border-t-2 bg-white mb-1 mx-1 p-1 outline-none"
          defaultValue={content}
        />
      </div>
    </div>
  );
}

export function Toolbar({
  editorRef,
}: {
  editorRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const insertMarkdown = (prefix: string, wrap: boolean = false) => {
    let suffix = "";
    if (wrap) suffix = prefix;
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    // Remove the selected content
    range.deleteContents();

    // Insert the markdown syntax with the selected text wrapped
    const markdownText = document.createTextNode(
      `${prefix}${selectedText}${suffix}`
    );
    range.insertNode(markdownText);

    // Create a new range after the inserted text to move the cursor
    range.setStartAfter(markdownText);
    range.setEndAfter(markdownText);
    // range.collapse(false);

    // Clear current selection and set the new range
    selection.removeAllRanges();
    selection.addRange(range);
    selection.collapseToEnd(); // Explicitly collapse to the end of the inserted text
    // Focus back on the editable div to ensure the cursor is visible
    editorRef.current.focus();
  };

  return (
    <div className="flex space-x-1 p-1">
      <Button
        variant="outline"
        className="font-bold bg-white"
        onClick={() => insertMarkdown("**", true)}
      >
        B
      </Button>
      <Button
        variant="outline"
        className="italics bg-white"
        onClick={() => insertMarkdown("__", true)}
      >
        I
      </Button>
      <Button
        variant="outline"
        className="line bg-white"
        onClick={() => insertMarkdown("~~", true)}
      >
        S
      </Button>
    </div>
  );
}
