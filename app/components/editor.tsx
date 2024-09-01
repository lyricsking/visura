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
import { Textarea, TextareaProps } from "./textarea";

export interface MarkdownEditorProps extends TextareaProps {
  editorRef: MutableRefObject<HTMLTextAreaElement | null>;
}

export function MarkdownEditor(props: MarkdownEditorProps) {
  const { editorRef, ...attrs } = props;

  return (
    <div className="flex rounded-md w-full max-w-lg mx-auto border bg-gray-100 divide-y">
      <div className="w-full">
        {/* Toolbar */}
        <Toolbar textareaRef={editorRef} />
        {/* EditableContent Div */}
        <div className="mx-1 mb-1">
          <Textarea
            ref={editorRef}
            className="min-h-44 w-full border-t-2 bg-white p-2 outline-none"
            {...attrs}
          />
        </div>
      </div>
    </div>
  );
}

export function Toolbar({
  textareaRef,
}: {
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
}) {
  const insertMarkdown = (
    e: React.MouseEvent<HTMLButtonElement>,
    prefix: string,
    shouldWrap: boolean = false
  ) => {
    e.preventDefault(); // Prevent the form losing focus

    let suffix = "";
    if (shouldWrap) suffix = prefix;

    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    const markdownText = `${prefix}${selectedText}${suffix}`;
    const newText =
      textarea.value.substring(0, start) +
      markdownText +
      textarea.value.substring(end);

    textarea.value = newText;

    // Move the cursor to after the inserted text
    textarea.setSelectionRange(
      start + prefix.length,
      start + suffix.length + selectedText.length
    );
    // Focus back on the editable textarea to ensure the cursor is visible
    textarea.focus();
  };

  return (
    <div className="flex space-x-1 p-1">
      <Button
        variant="outline"
        className="font-bold bg-white"
        onMouseDown={(e) => insertMarkdown(e, "**", true)}
      >
        B
      </Button>
      <Button
        variant="outline"
        className="italics bg-white"
        onMouseDown={(e) => insertMarkdown(e, "__", true)}
      >
        I
      </Button>
      <Button
        variant="outline"
        className="line bg-white"
        onMouseDown={(e) => insertMarkdown(e, "~~", true)}
      >
        S
      </Button>
      <select
        className="border p-1"
        onChange={(e) => applyFormatting("formatBlock", e.target.value)}
      >
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="p">Paragraph</option>
      </select>
      <button
        className="border p-1"
        onClick={() => alert("Preview not implemented yet")}
      >
        Preview
      </button>
    </div>
  );
}
