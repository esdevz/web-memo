import { useState, useCallback, useMemo, useEffect, KeyboardEvent } from "react";
import { Editor } from "roosterjs-editor-core";

export function useEditor(content: string) {
  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null);

  const onRefChange = useCallback((node: HTMLDivElement) => {
    setEditorRef(node);
  }, []);

  const editor = useMemo(() => {
    if (editorRef) {
      const roosterEditor = new Editor(editorRef, {
        doNotAdjustEditorColor: true,
        initialContent: content,
        defaultFormat: {
          backgroundColor: "inherit",
          fontFamily: "inherit",
          fontSize: "inherit",
          backgroundColors: {
            lightModeColor: "inherit",
            darkModeColor: "inherit",
          },
          textColor: "inherit",
          textColors: {
            darkModeColor: "inherit",
            lightModeColor: "inherit",
          },
        },
      });
      return roosterEditor;
    }
  }, [editorRef, content]);

  useEffect(() => {
    if (editor) {
      return () => {
        editor.dispose();
      };
    }
  }, [editor]);

  const onBlurHandler = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      selection.removeAllRanges();
    }
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    switch (e.key) {
      case e.ctrlKey && "z":
      case e.ctrlKey && "Z":
        editor?.undo();
        break;
      case e.ctrlKey && "y":
      case e.ctrlKey && "Y":
        editor?.redo();
        break;
      default:
        break;
    }
  };

  return {
    onRefChange,
    editor,
    editorRef,
    onBlurHandler,
    keyDownHandler,
  };
}
