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
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { SelectValue } from "@radix-ui/react-select";
import { wrap } from "lodash";
import {
  AlignHorizontalDistributeCenter,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Heading1,
  Heading1Icon,
  Heading2,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListEndIcon,
  ListIcon,
  ListOrderedIcon,
  ListXIcon,
  QuoteIcon,
  Strikethrough,
  StrikethroughIcon,
} from "lucide-react";

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
  const insertMarkdown = (prefix: string, shouldWrap: boolean = false) => {
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
      start + prefix.length + selectedText.length
    );
    // Focus back on the editable textarea to ensure the cursor is visible
    //textarea.focus();
  };

  return (
    <div className="flex items-center gap-2 px-2 divide-x border-black overflow-hidden">
      <div className="flex items-center gap-2 divide-x border-black overflow-x-auto">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 grow-0 font-bold"
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("**", true);
          }}
        >
          <BoldIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="italic"
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("__", true);
          }}
        >
          <ItalicIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="line "
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("~~", true);
          }}
        >
          <StrikethroughIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="line "
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("# ");
          }}
        >
          <Heading1Icon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="line "
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("## ");
          }}
        >
          <Heading2Icon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="line "
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("### ");
          }}
        >
          <Heading3Icon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="line "
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("### ");
          }}
        >
          <ImageIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="line "
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("### ");
          }}
        >
          <QuoteIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="line "
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("### ");
          }}
        >
          <LinkIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="line "
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("### ");
          }}
        >
          <ListIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="line "
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("### ");
          }}
        >
          <ListOrderedIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="line "
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("### ");
          }}
        >
          <AlignLeftIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="line "
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("### ");
          }}
        >
          <AlignJustifyIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="line "
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent the form losing focus
            return insertMarkdown("### ");
          }}
        >
          <AlignRightIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="ml-auto ">
        <Button
          variant="ghost"
          size="default"
          onClick={() => alert("Preview not implemented yet")}
        >
          Preview
        </Button>
      </div>
    </div>
  );
}
