import { useEffect, useRef, useState } from "react";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

interface CodeMirrorProps {
  value: string;
  onChange: (value: string) => void;
  extensions?: Extension[];
  className?: string | undefined;
}

const lineWrapping = EditorView.lineWrapping;

export default function CodeMirrorEditor({
  value,
  onChange,
  extensions = [],
  className,
}: CodeMirrorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [isShown, setIsShown] = useState<boolean>(false);

  // Initialize the editor only once
  useEffect(() => {
    if (!editorRef.current) return;
    // Create editor state and view
    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const updatedValue = update.state.doc.toString();
            onChange(updatedValue);
          }
        }),
        ...extensions,
        lineWrapping,
      ],
    });

    viewRef.current = new EditorView({
      state,
      parent: editorRef.current,
    });

    setIsShown(true);
    return () => {
      viewRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (view && value !== view.state.doc.toString()) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
    }
  }, [value]); // Listen to only when value chnages.

  return <div ref={editorRef} className={className} />;
}
