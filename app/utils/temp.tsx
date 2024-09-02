import React, { useState, useRef, useCallback } from 'react';

const MarkdownTextarea: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState<string>('');
  
  const MAX_HISTORY_SIZE = 50; // Limit the history size
  
  const saveToHistory = (text: string) => {
    setHistory(prevHistory => {
      const newHistory = [...prevHistory, text];
      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory.shift(); // Remove the oldest state if limit exceeded
      }
      return newHistory;
    });
    setRedoStack([]); // Clear redo stack on new changes
  };

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setCurrentText(newText);
    debouncedSaveToHistory(newText);
  }, []);

  const debouncedSaveToHistory = useCallback(
    debounce((text: string) => saveToHistory(text), 500), // Debounce state saving by 500ms
    []
  );

  const handleUndo = () => {
    if (history.length > 0) {
      const newRedoStack = [...redoStack, currentText];
      const lastState = history[history.length - 1];
      setRedoStack(newRedoStack);
      setHistory(history.slice(0, history.length - 1));
      setCurrentText(lastState);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setRedoStack(redoStack.slice(0, redoStack.length - 1));
      saveToHistory(currentText);
      setCurrentText(nextState);
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
        <button type="button" className="border p-1" onClick={handleUndo} disabled={history.length === 0}>
          Undo
        </button>
        <button type="button" className="border p-1" onClick={handleRedo} disabled={redoStack.length === 0}>
          Redo
        </button>
        {/* Other toolbar buttons like Bold, Italic, etc. */}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        className="border p-2 min-h-[200px] w-full outline-none"
        placeholder="Start typing..."
        value={currentText}
        onChange={handleInputChange}
      ></textarea>
    </div>
  );
};

export default MarkdownTextarea;
