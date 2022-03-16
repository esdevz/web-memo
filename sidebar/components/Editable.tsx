import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { setBadgeTempNote } from "../../utils/badgeColors";
import { Editor } from "roosterjs-editor-core";

interface Props extends BoxProps {
  sanitizer: (html?: string) => string;
  port: chrome.runtime.Port;
  editor?: Editor;
}

const Editable = (
  { editor, port, sanitizer, ...props }: Props,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const onPasteHandler = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const data = e.clipboardData.getData("text/html");
    if (data.length !== 0) {
      if (editor) {
        e.preventDefault();
        e.stopPropagation();
        let content = sanitizer(data).trim();
        let range = editor?.getSelectionRange();
        editor?.insertContent(content, {
          position: 5,
          range,
        });

        port.postMessage({
          msg: "EDITING",
          changes: {
            content: editor?.getContent(),
            createdAt: Date.now(),
          },
        });
      }
    }
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const data = e.dataTransfer.getData("text/html");
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return false;
    }
    if (editor) {
      e.preventDefault();
      e.stopPropagation();
      let content = sanitizer(data).trim();
      editor.insertContent(content, {
        position: 1,
      });
      port.postMessage({
        msg: "EDITING",
        changes: {
          content: editor.getContent(),
          createdAt: Date.now(),
        },
      });
    }
  };

  const onInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    /* 
    this is not triggering
    could interfere with editor instance
    content wont save when the popup is closed 
    */
    setBadgeTempNote();
    port.postMessage({
      msg: "EDITING",
      changes: { content: e.currentTarget.innerHTML, createdAt: Date.now() },
    });
  };

  return (
    <Box
      ref={ref}
      onInput={onInputChange}
      onPasteCapture={onPasteHandler}
      onDrop={onDropHandler}
      contentEditable
      w="full"
      maxW="full"
      h="full"
      border="1px solid rgba(128, 128, 128, 0.34)"
      borderRadius="2"
      p="1"
      spellCheck="false"
      overflow="auto"
      lineHeight="1.55"
      css={`
        scrollbar-width: thin;
        white-space: break-spaces;
        & ol,
        & ul {
          padding-inline: 2ch;
        }
        & * {
          white-space: pre-wrap;
        }
        & pre {
          padding: 0.5em;
        }
        &:focus-visible {
          outline: 2px solid rgb(49, 130, 206);
          border-radius: 4px;
        }
      `}
      {...props}
    ></Box>
  );
};

export default React.forwardRef(Editable);
