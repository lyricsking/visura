import { MutableRefObject, useEffect, useRef, useState } from "react";
import Button from "./button";
import { Textarea, TextareaProps } from "./textarea";
import {
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  EyeIcon,
  EyeOffIcon,
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
import { useSearchParams } from "@remix-run/react";
import { customMarkdownParser } from "~/utils/md-helper";
import ReactMarkdown from "react-markdown";
import { cn } from "~/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "./scrollable.area";
import { Toggle } from "./toggle";

export interface MarkdownEditorProps extends TextareaProps {
  editorRef: MutableRefObject<HTMLTextAreaElement | null>;
}

export function MarkdownEditor(props: MarkdownEditorProps) {
  const { editorRef, ...attrs } = props;
  const historyStackRef = useRef<string[]>([]);
  const redoStackRef = useRef<string[]>([]);
  const MAX_HISTORY_SIZE = 50;

  const [searchParams, setSearchParams] = useSearchParams();
  const isPreviewMode = searchParams.has("preview");
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    // alert(JSON.stringify(editorRef.current?.value, null, 2));
  }, [editorRef.current]);

  const togglePreview = () => {
    // setSearchParams((prev) => {
    //   isPreviewMode ? prev.delete("preview") : prev.set("preview", "true");

    //   return prev;
    // });

    setShow(!show);
  };

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

    // saveToHistoryWithDebounce(newText);
  };

  const saveToHistoryWithDebounce = debounce((text: string) => {
    saveToHistory(text);
  }, 500);

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

  const handleUndo = () => {
    const history = historyStackRef.current;
    if (history.length > 0) {
      const currentText = editorRef.current?.value || "";
      redoStackRef.current.push(currentText);
      const lastState = history.pop();
      if (editorRef.current && lastState !== undefined) {
        editorRef.current.value = lastState;
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
      }
    }
  };

  const tools = [
    "bold",
    "italic",
    "strikethrough",
    "h1",
    "h2",
    "h3",
    "link",
    "quote",
    "image",
    "numberList",
    "link",
    "leftAlign",
    "rightAlign",
    "justify",
  ];

  return (
    <div className="flex flex-col rounded-md w-full max-w-lg mx-auto border bg-gray-100 divide-y">
      <div className="flex h-10 w-full items-center gap-2 divide-x-2">
        <div className="flex gap-2 px-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleUndo}
            disabled={historyStackRef.current.length === 0}
          >
            <Undo2Icon className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleRedo}
            disabled={redoStackRef.current.length === 0}
          >
            <Redo2Icon className="h-5 w-5" />
          </Button>
        </div>

        {/* Toolbar */}
        <Toolbar editorRef={editorRef} tools={tools} />

        {/* Preview toggle */}
        <div className="flex gap-2 px-2 ">
          <Button onClick={togglePreview}>
            {show ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeOffIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      {/* EditableContent Div and Preview */}
      <div className="mx-1 mb-1">
        {!show ? (
          <>
            {/* The editor textarea */}
            <Textarea
              ref={editorRef}
              onInput={handleInputChange}
              className="min-h-44 w-full border-t-2 bg-white p-2 outline-none"
              {...attrs}
            />
          </>
        ) : (
          <>
            {/* Preview */}
            <div className="min-h-44 w-full border-t-2 bg-white p-2">
              <ReactMarkdown allowedElements={["div"]}>
                {customMarkdownParser(
                  editorRef.current ? editorRef.current.value : ""
                )}
              </ReactMarkdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
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
    <div className="grid grid-flow-col auto-cols-min space-x-4 p-4 divide-x overflow-x-auto">
      {itemsKey.map((itemKey) => {
        let item = toolbarItems[itemKey];
        const IconTag = item.icon;

        return (
          <Button
            key={item.prefix}
            // variant="ghost"
            // size="icon"
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
    icon: Heading1Icon,
  },
  h2: {
    prefix: "## ",
    icon: Heading2Icon,
  },
  h3: {
    prefix: "### ",
    icon: Heading3Icon,
  },
  link: {
    prefix: "[ link text ] (link url)",
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
    prefix: "## ",
    icon: ListIcon,
  },
  leftAlign: {
    prefix: "<< ",
    suffix: " <<",
    icon: AlignLeftIcon,
  },
  rightAlign: {
    prefix: ">> ",
    suffix: " >>",
    icon: AlignRightIcon,
  },
  justify: {
    prefix: "== ",
    suffix: " ==",
    icon: AlignJustifyIcon,
  },
} as const;
type ToolbarItemKey = keyof typeof toolbarItems;
