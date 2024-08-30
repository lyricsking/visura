import { FormEvent, MutableRefObject, useRef, useState } from "react";
import { Textarea, TextareaProps, textareaVariants } from "./textarea";
import { cn } from "~/utils";
import ReactMarkdown from "react-markdown";

export interface MardownEditorProps extends TextareaProps {
  editorRef: MutableRefObject<HTMLTextAreaElement | null>;
}
export default function MarkdownEditor(props: MardownEditorProps) {
  const { className, editorRef, onInput, ...attrs } = props;

  // const previewRef = useRef<typeof ReactMarkdown>(null);
  const [content, setContent] = useState<string>("kj");

  async function handleInput(
    event: FormEvent<HTMLTextAreaElement>
  ): Promise<void> {
    if (editorRef.current) {
      const markdownContent = editorRef.current.value;
      alert(JSON.stringify(markdownContent, null, 2));
      setContent(markdownContent);
    }
  }

  return (
    <div className="grid md:grid-cols-2 w-full mx-auto gap-2 p-2 border ">
      <Textarea ref={editorRef} {...attrs} onInput={handleInput} />
      <div className="prose md:prose-lg lg:prose-xl">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

// Utility function to move caret to the end of the contentEditable div
function placeCaretAtEnd(el: HTMLElement) {
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}
