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
import { setBadgeTempNote } from "../utils";
import { sanitizeHtml } from "../utils/sanitizeHtml";
import readFile from "./readFile";

export function useEditor(content: string, port?: chrome.runtime.Port) {
  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null);

  const onRefChange = useCallback((node: HTMLDivElement) => {
    setEditorRef(node);
  }, []);

  const editor = useMemo(() => {
    if (editorRef) {
      const roosterEditor = new Editor(editorRef, {
        doNotAdjustEditorColor: true,
        allowKeyboardEventPropagation: true,
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

  const onPasteCaptureHandler = async (e: ClipboardEvent<HTMLDivElement>) => {
    const html = e.clipboardData.getData("text/html");
    const text = e.clipboardData.getData("text/plain");
    const file = e.clipboardData.files[0];
    if (editor) {
      setBadgeTempNote();
      e.preventDefault();
      e.stopPropagation();
      const dataUri = file ? await readFile(file) : null;
      const content = sanitizeHtml(html).trim();

      editor?.paste({
        customValues: {},
        image: e.clipboardData.files[0],
        html: content,
        text,
        rawHtml: html,
        types: e.clipboardData.types as string[],
        imageDataUri: dataUri,
      });

      port?.postMessage({
        msg: "EDITING",
        changes: {
          content: editor?.getContent(),
          createdAt: Date.now(),
        },
      });
    }
  };

  const onDropHandler = async (e: DragEvent<HTMLDivElement>) => {
    const html = e.dataTransfer.getData("text/html");
    const text = e.dataTransfer.getData("text/plain");
    const file = e.dataTransfer.files[0];
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return false;
    }
    if (editor) {
      setBadgeTempNote();
      e.preventDefault();
      e.stopPropagation();
      const dataUri = file ? await readFile(file) : null;
      const content = sanitizeHtml(html).trim();

      editor?.paste({
        customValues: {},
        image: file,
        html: content,
        text,
        rawHtml: html,
        types: e.dataTransfer.types as string[],
        imageDataUri: dataUri,
      });

      port?.postMessage({
        msg: "EDITING",
        changes: {
          content: editor?.getContent(),
          createdAt: Date.now(),
        },
      });
    }
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
