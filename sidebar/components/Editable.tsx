import React from "react";
import { Box } from "@chakra-ui/layout";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

interface Props {
  contentRef: React.RefObject<HTMLDivElement>;
  onInputChange?: (e: React.FormEvent<HTMLDivElement>) => void;
  onPasteHandler?: (e: React.ClipboardEvent<HTMLDivElement>) => false | void;
  onDropHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
  sanitizedHtml: string;
}

const Editable = (props: Props) => {
  const onBlurHandler = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      selection.removeAllRanges();
    }
  };

  const onPasteHandler = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const data = e.clipboardData.getData("text/html");
    if (data.length !== 0) {
      e.preventDefault();

      const selection = window.getSelection();
      if (!selection?.rangeCount) return false;

      selection.deleteFromDocument();
      let node = document.createElement("div");
      node.innerHTML = sanitizeHtml(data).trim();
      selection.getRangeAt(0).insertNode(node);
    }
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const data = e.dataTransfer.getData("text/html");
    const selection = window.getSelection();

    if (data.length !== 0 && selection?.type !== "Range") {
      e.preventDefault();
      let node = document.createElement("div");
      node.innerHTML = sanitizeHtml(data).trim();
      if (props.contentRef.current) {
        props.contentRef.current.appendChild(node);
      }
    }
  };

  return (
    <Box
      onBlur={onBlurHandler}
      ref={props.contentRef}
      onPaste={onPasteHandler}
      onDrop={onDropHandler}
      contentEditable="true"
      w="full"
      maxW="full"
      h="full"
      border="1px solid rgba(128, 128, 128, 0.34)"
      borderRadius="2"
      p="1.5"
      spellCheck="false"
      overflow="auto"
      whiteSpace="break-spaces"
      __css={{
        "& *": {
          whiteSpace: "break-spaces",
        },
      }}
      lineHeight="1.55"
      _focusVisible={{
        outline: "2px solid rgb(49, 130, 206)",
      }}
      dangerouslySetInnerHTML={{
        __html: props.sanitizedHtml,
      }}
    ></Box>
  );
};

export default Editable;
