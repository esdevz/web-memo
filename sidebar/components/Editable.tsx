import React from "react";
import { Box } from "@chakra-ui/layout";
import { sanitizeHtml, setBadgeTempNote } from "../../utils";

interface Props {
  contentRef: React.RefObject<HTMLDivElement>;
  sanitizedHtml: string;
  port: chrome.runtime.Port;
}

const Editable = (props: Props) => {
  const onPasteHandler = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const data = e.clipboardData.getData("text/html");
    if (data.length !== 0) {
      e.preventDefault();
      setBadgeTempNote();
      const selection = window.getSelection();
      if (!selection?.rangeCount) return false;

      selection.deleteFromDocument();
      let node = document.createElement("div");
      node.innerHTML = sanitizeHtml(data).trim();
      selection.getRangeAt(0).insertNode(node);
      props.port.postMessage({
        msg: "EDITING",
        changes: {
          content: props.contentRef.current?.innerHTML,
          createdAt: Date.now(),
        },
      });
    }
  };

  const onInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    setBadgeTempNote();
    props.port.postMessage({
      msg: "EDITING",
      changes: { content: e.currentTarget.innerHTML, createdAt: Date.now() },
    });
  };
  return (
    <Box
      ref={props.contentRef}
      onInput={onInputChange}
      onPaste={onPasteHandler}
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
      lineHeight="1.7"
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
