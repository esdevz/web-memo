import { useState, useCallback, useMemo, useEffect } from "react";
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
        initialContent: content || "<div> </div>",
        defaultFormat: {
          backgroundColor: "inherit",
          fontFamily: "inherit",
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

  const onPasteCaptureHandler = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const data = e.clipboardData.getData("text/html");
    if (data.length !== 0) {
      e.preventDefault();
      e.stopPropagation();
      const selection = window.getSelection();
      if (!selection?.rangeCount) return false;

      selection.deleteFromDocument();
      let node = document.createElement("div");
      node.innerHTML = sanitizeHtml(data).trim();
      selection.getRangeAt(0).insertNode(node);
    }
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const data = e.dataTransfer.getData("text/html");
    let content = sanitizeHtml(data);
    editor?.insertContent(content);
  };

  return {
    onRefChange,
    editor,
    editorRef,
    onPasteCaptureHandler,
    onDropHandler,
  };
}
