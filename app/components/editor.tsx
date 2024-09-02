import "@mdxeditor/editor/style.css";
import { MutableRefObject, useRef } from "react";
import Button from "./button";
import { Textarea, TextareaProps } from "./textarea";
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
  StrikethroughIcon,
} from "lucide-react";
import { useSearchParams } from "@remix-run/react";
import { customMarkdownParser } from "~/utils/md-helper";

export interface MarkdownEditorProps extends TextareaProps {
  editorRef: MutableRefObject<HTMLTextAreaElement | null>;
}

export function MarkdownEditor(props: MarkdownEditorProps) {
  const { editorRef, ...attrs } = props;
  const historyRef = useRef<string[]>([]);
  const redoStackRef = useRef<string[]>([]);
  const MAX_HISTORY_SIZE = 50;

  const [searchParams, setSearchParams] = useSearchParams();

  const togglePreview = () => {
    setSearchParams((prev) => {
      prev.has("preview")
        ? prev.delete("preview")
        : prev.set("preview", "true");

      return prev;
    });
  };

  const saveToHistory = (text: string) => {
    const history = historyRef.current;
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
  };

  const saveToHistoryWithDebounce = debounce((text: string) => {
    saveToHistory(text);
  }, 500);

  // Debounce function to reduce frequency of state-saving
  function debounce(saveFunc: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        saveFunc(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const handleUndo = () => {
    const history = historyRef.current;
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

  return (
    <div className="flex rounded-md w-full max-w-lg mx-auto border bg-gray-100 divide-y">
      <div className="w-full">
        <div className="flex items-center h-16 gap-2 px-2 divide-x border-black overflow-hidden">
          <button type="button" className="border p-1" onClick={handleUndo}>
            Undo
          </button>
          <button type="button" className="border p-1" onClick={handleRedo}>
            Redo
          </button>
          {/* Toolbar */}
          <Toolbar editorRef={editorRef} itemsKey={["bold"]} />
          {/* Preview toggle */}
          <div className="ml-auto ">
            <Button variant="ghost" size="default" onClick={togglePreview}>
              Preview
            </Button>
          </div>
        </div>
        {/* EditableContent Div and Preview */}
        <div className="mx-1 mb-1">
          {/* The editor textarea */}
          <Textarea
            ref={editorRef}
            onInput={handleInputChange}
            className="min-h-44 w-full border-t-2 bg-white p-2 outline-none"
            {...attrs}
          />
          {/* Preview */}
          <div className="min-h-44 w-full border-t-2 bg-white p-2">
            <ReactMarkdown>
              {customMarkdownParser(editorRef.current.value)}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

type ToolbarItem = {
  prefix: string;
  suffix?: string;
  icon: React.ElementType;
};

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

type ToolbarProps = {
  editorRef: MutableRefObject<HTMLTextAreaElement | null>;
  itemsKey: (keyof typeof toolbarItems)[];
};

export function Toolbar({ editorRef, itemsKey }: ToolbarProps) {
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
    <div className="flex items-center gap-2 divide-x border-black overflow-x-auto">
      {itemsKey.map((itemKey) => {
        let item = toolbarItems[itemKey];
        const IconTag = item.icon;

        return (
          <Button
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
  );
}
