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
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const togglePreview = () => {
    setSearchParams((prev) => {
      
      prev.has("preview") 
      ? prev.delete("preview") 
      : prev.set("preview", true);
      
      return prev;
    });
  };
  
  return (
    <div className="flex rounded-md w-full max-w-lg mx-auto border bg-gray-100 divide-y">
      <div className="w-full">
        <div className="flex items-center h-16 gap-2 px-2 divide-x border-black overflow-hidden">
          {/* Toolbar */}
          <Toolbar textareaRef={editorRef} />
          {/* Preview toggle */}
          <div className="ml-auto ">
            <Button
              variant="ghost"
              size="default"
              onClick={togglePreview}
            >
              Preview
            </Button>
          </div>
        </div>
        {/* EditableContent Div and Preview */}
        <div className="mx-1 mb-1">
          {/***/}
          <Textarea
            ref={editorRef}
            className="min-h-44 w-full border-t-2 bg-white p-2 outline-none"
            {...attrs}
          />
          { /* Preview */ }
          <div className="min-h-44 w-full border-t-2 bg-white p-2">
            <ReactMarkdown>{customMarkdownParser(editorRef.current.value)}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

type ToolbarItem = {
  prefix: string,
  suffix?: string,
  icon: React.ElementType
}

const toolbarItems: Record<string, ToolbarItem> = {
  bold: {
    prefix: "**",
    suffix: "**",
    icon: BoldIcon
  },
  italic: {
    prefix: "*",
    suffix: "*",
    icon: ItalicIcon,
  }, 
  strikethrough: {
    prefix:"~~",
    suffix: "~~",
    icon: StrikethroughIcon,
  },
  h1: {
    prefix:"# ",
    icon: Heading1Icon,
  },
  h1: {
    prefix: "## ",
    icon: Heading2Icon
  },
  h3: {
    prefix: "### ",
    icon: Heading3Icon
  },
  link: {
    prefix: "[ link text ] (link url)",
    icon: LinkIcon
  },
  quote: {
    prefix: "> ",
    icon: QuoteIcon
  },
  image: {
    prefix: "![alt text](image url)",
    icon: ImageIcon
  },
  numberList: {
    prefix: "1. Item",
    icon: OrderedIcon
  },
  list: {
    prefix: "## ",
    icon: ListIcon
  },
  leftAlign: {
    prefix: "<< ",
    suffix: " <<",
    icon: AlignLeftIcon
  },
  rightAlign: {
    prefix: ">> ",
    suffix: " >>",
    icon: AlignRightIcon
  },
  justify: {
    prefix: "== ",
    suffix: " ==",
    icon: AlignJustifyIcon
  }
} as const

type ToolbarProps = {
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  itemsKey: (keyof typeof toolbarItems)[]
}

export function Toolbar({ textareaRef, itemsKey }: ToolbarProps) {
  //  Todo Memoize to avoid re-initializing for each re-render.
  const insertMarkdown = (prefix: string, suffix: string = "") => {

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
      <div className="flex items-center gap-2 divide-x border-black overflow-x-auto">
        {
          itemsKey.map((itemKey) => {
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
            )
          })
        }
      </div>
  );
}
