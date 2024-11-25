import React, { useEffect, useLayoutEffect, useRef } from "react";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

interface CodeMirrorProps {
  value: string;
  onChange: (value: string) => void;
  extensions?: Extension[];
}

export default function CodeMirrorEditor({
  value,
  onChange,
  extensions = [],
}: CodeMirrorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useLayoutEffect(() => {
    if (editorRef.current) {
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
        ],
      });

      viewRef.current = new EditorView({
        state,
        parent: editorRef.current,
      });
    }

    return () => {
      viewRef.current?.destroy();
    };
  }, [editorRef, value, onChange, extensions]);

  return <div ref={editorRef} />;
}
