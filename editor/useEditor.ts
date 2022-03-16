import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  ClipboardEvent,
  KeyboardEvent,
  DragEvent,
} from "react";
import { Editor } from "roosterjs-editor-core";
import { sanitizeHtml } from "../utils";

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

  const onPasteCaptureHandler = (e: ClipboardEvent<HTMLDivElement>) => {
    const data = e.clipboardData.getData("text/html");
    if (data.length !== 0) {
      e.preventDefault();
      e.stopPropagation();

      let content = sanitizeHtml(data).trim();
      let range = editor?.getSelectionRange();
      editor?.insertContent(content, {
        position: 5,
        range,
      });
    }
  };

  const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
    const data = e.dataTransfer.getData("text/html");
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return false;
    }
    e.preventDefault();
    e.stopPropagation();
    let content = sanitizeHtml(data).trim();
    editor?.insertContent(content, {
      position: 1,
    });
  };

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
    onPasteCaptureHandler,
    onDropHandler,
    onBlurHandler,
    keyDownHandler,
  };
}
