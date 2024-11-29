import { MutableRefObject, useEffect, useRef, useState } from "react";
import Button from "../button";
import { Textarea, TextareaProps } from "../textarea";
import {
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  Redo2Icon,
  StrikethroughIcon,
  Undo2Icon,
} from "lucide-react";
import { customMarkdownParser } from "~/utils/markdown-utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea, ScrollBar } from "../scrollable.area";
import rehypeRaw from "rehype-raw";

export interface MarkdownEditorProps extends TextareaProps {
  editorRef: MutableRefObject<HTMLTextAreaElement | null>;
}

export function MarkdownEditor(props: MarkdownEditorProps) {
  const { editorRef, defaultValue, ...attrs } = props;
  const historyStackRef = useRef<string[]>([defaultValue?.toString() || ""]);
  const redoStackRef = useRef<string[]>([]);

  const [preview, setPreview] = useState<string>(
    editorRef.current?.value || ""
  );

  const MAX_HISTORY_SIZE = 50;

  const saveToHistory = (text: string) => {
    const history = historyStackRef.current;
    history.push(text);
    // if history stack is more allowable size,
    // remove the oldest state.
    if (history.length > MAX_HISTORY_SIZE) {
      history.shift();
    }
    // Clear redo stack on new changes
    redoStackRef.current = [];
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;

    if (editorRef.current) {
      editorRef.current.value = newText;
    }

    saveToHistoryWithDebounce(newText);

    // Update preview
    setPreview(newText);
  };

  const saveToHistoryWithDebounce = debounce((text: string) => {
    saveToHistory(text);
  }, 500);

  const handleUndo = () => {
    const history = historyStackRef.current;
    if (history.length > 0) {
      const currentText = editorRef.current?.value || "";
      redoStackRef.current.push(currentText);
      const lastState = history.pop();
      if (editorRef.current && lastState !== undefined) {
        editorRef.current.value = lastState;
        setPreview(lastState);
      }
    }
  };

  const handleRedo = () => {
    const redoStack = redoStackRef.current;
    if (redoStack.length > 0) {
      const nextState = redoStack.pop();
      if (editorRef.current && nextState !== undefined) {
        saveToHistory(editorRef.current.value);
        editorRef.current.value = nextState;
        setPreview(nextState);
      }
    }
  };

  const tools = [
    "h1",
    "h2",
    "h3",
    "bold",
    "italic",
    "strikethrough",
    "leftAlign",
    "rightAlign",
    "justify",
    "link",
    "quote",
    // "image",
    "numberList",
    "list",
  ];

  return (
    <div className="border rounded-md bg-gray-100 divide-y">
      <div className="grid grid-cols-[20%_1fr] md:grid-cols-[8%_1fr] divide-x-2">
        <div className="grid grid-cols-2 items-center gap-2 px-2">
          <Button variant="ghost" size="icon" onClick={handleUndo}>
            <Undo2Icon className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={handleRedo}>
            <Redo2Icon className="h-5 w-5" />
          </Button>
        </div>

        {/* Toolbar */}
        <Toolbar editorRef={editorRef} tools={tools} />
      </div>
      {/* EditableContent Div and Preview */}
      <div className="flex flex-col gap-2 mx-1 mb-1">
        {/* The editor textarea */}
        <Textarea
          ref={editorRef}
          onInput={handleInputChange}
          className="min-h-44 w-full rounded-none rounded-b-md bg-white p-2 outline-none"
          {...attrs}
        />

        <div className="min-h-44 min-w-full prose md:prose-lg lg:prose-xl rounded-md bg-white p-2">
          {/* Preview */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {customMarkdownParser(preview)}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

// Debounce function to reduce frequency of state-saving
function debounce(saveFunc: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    // callback funcion passed to setTimeout
    const later = () => {
      // Clear this active timeout from memory, sice we are handling it.
      clearTimeout(timeout);
      saveFunc(...args);
    };
    // Clear existing timeout, before setting a new one, this ensures that only the saveFunc is called once within 500ms.
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

type ToolbarItem = {
  prefix: string;
  suffix?: string;
  icon: React.ElementType;
};

type ToolbarProps = {
  editorRef: MutableRefObject<HTMLTextAreaElement | null>;
  tools: ToolbarItemKey[];
};

export function Toolbar({ editorRef, tools: itemsKey }: ToolbarProps) {
  //  Todo Memoize to avoid re-initializing for each re-render.
  const insertMarkdown = (prefix: string, suffix: string = "") => {
    if (!editorRef.current) return;

    const textarea = editorRef.current;
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
    <ScrollArea className="whitespace-nowrap">
      <div className=" flex items-center justify-between gap-4 p-4 divide-x overflow-x-auto">
        {itemsKey.map((itemKey) => {
          let item = toolbarItems[itemKey];
          const IconTag = item.icon;

          return (
            <Button
              key={item.prefix}
              variant="ghost"
              size="icon"
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent the form from losing focus
                return insertMarkdown(item.prefix, item.suffix);
              }}
            >
              <IconTag className="w-5 h-5" />
            </Button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

const toolbarItems: Record<string, ToolbarItem> = {
  bold: {
    prefix: "**",
    suffix: "**",
    icon: BoldIcon,
  },
  italic: {
    prefix: "*",
    suffix: "*",
    icon: ItalicIcon,
  },
  strikethrough: {
    prefix: "~~",
    suffix: "~~",
    icon: StrikethroughIcon,
  },
  h1: {
    prefix: "# ",
    suffix: "\n",
    icon: Heading1Icon,
  },
  h2: {
    prefix: "## ",
    suffix: "\n",
    icon: Heading2Icon,
  },
  h3: {
    prefix: "### ",
    suffix: "\n",
    icon: Heading3Icon,
  },
  link: {
    prefix: "[link text](link url)",
    icon: LinkIcon,
  },
  quote: {
    prefix: "> ",
    icon: QuoteIcon,
  },
  image: {
    prefix: "![alt text](image url)",
    icon: ImageIcon,
  },
  numberList: {
    prefix: "1. Item",
    icon: ListOrderedIcon,
  },
  list: {
    prefix: "- ",
    icon: ListIcon,
  },
  leftAlign: {
    prefix: "::left::",
    suffix: "::",
    icon: AlignLeftIcon,
  },
  rightAlign: {
    prefix: "::right::",
    suffix: "::",
    icon: AlignRightIcon,
  },
  justify: {
    prefix: "::justify::",
    suffix: "::",
    icon: AlignJustifyIcon,
  },
} as const;
type ToolbarItemKey = keyof typeof toolbarItems;
