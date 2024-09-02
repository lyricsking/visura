import React, { useRef } from 'react';

const MarkdownTextarea: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<string[]>([]);
  const redoStackRef = useRef<string[]>([]);
  const MAX_HISTORY_SIZE = 50;


  const saveToHistory = (text: string) => {
    const history = historyRef.current;
    history.push(text);
    if (history.length > MAX_HISTORY_SIZE) {
      history.shift(); // Remove the oldest state if limit exceeded
    }
    redoStackRef.current = []; // Clear redo stack on new changes
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (textareaRef.current) {
      textareaRef.current.value = newText;
    }
    debouncedSaveToHistory(newText);
  };

  const debouncedSaveToHistory = debounce((text: string) => {
    saveToHistory(text);
  }, 500);

  const handleUndo = () => {
    const history = historyRef.current;
    if (history.length > 0) {
      const currentText = textareaRef.current?.value || "";
      redoStackRef.current.push(currentText);
      const lastState = history.pop();
      if (textareaRef.current && lastState !== undefined) {
        textareaRef.current.value = lastState;
      }
    }
  };

  const handleRedo = () => {
    const redoStack = redoStackRef.current;
    if (redoStack.length > 0) {
      const nextState = redoStack.pop();
      if (textareaRef.current && nextState !== undefined) {
        saveToHistory(textareaRef.current.value);
        textareaRef.current.value = nextState;
      }
    }
  };

  // Debounce function to reduce frequency of state-saving
  function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  return (
    <div className="border rounded-md p-2 w-full max-w-lg">
      {/* Toolbar */}
      <div className="flex space-x-2 mb-2">
        <button type="button" className="border p-1" onClick={handleUndo}>
          Undo
        </button>
        <button type="button" className="border p-1" onClick={handleRedo}>
          Redo
        </button>
        {/* Other toolbar buttons like Bold, Italic, etc. */}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        className="border p-2 min-h-[200px] w-full outline-none"
        placeholder="Start typing..."
        onChange={handleInputChange}
      ></textarea>
    </div>
  );
};

export default MarkdownTextarea;
