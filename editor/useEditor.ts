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
      const roosterEditor = new Editor(editorRef);
      roosterEditor.setEditorDomAttribute("style", "");
      roosterEditor.setContent(content ? content : "<div> </div>");

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
      node.innerHTML = sanitizeHtml(data, true).trim();
      selection.getRangeAt(0).insertNode(node);
    }
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const data = e.dataTransfer.getData("text/html");
    const selection = window.getSelection();

    if (data.length !== 0 && selection?.type !== "Range") {
      e.preventDefault();
      e.stopPropagation();
      editor?.insertContent(sanitizeHtml(data, true).trim());
    }
  };

  return {
    onRefChange,
    editor,
    editorRef,
    onPasteCaptureHandler,
    onDropHandler,
  };
}
