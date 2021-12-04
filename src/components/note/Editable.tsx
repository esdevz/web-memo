import React, { ForwardedRef, forwardRef } from "react";
import { GridItem, GridItemProps } from "@chakra-ui/react";
import { sanitizeHtml } from "../../../utils/sanitizeHtml";

const Editable = forwardRef(
  (
    { sanitizedHtml, isOpen, ...props }: EditableProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
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

    return (
      <GridItem
        onPaste={onPasteHandler}
        ref={ref}
        overflow={isOpen ? "auto" : "hidden"}
        sx={{ scrollbarWidth: "thin" }}
        noOfLines={isOpen ? undefined : 6}
        whiteSpace="break-spaces"
        rowSpan={isOpen ? 8 : 7}
        cursor={isOpen ? undefined : "pointer"}
        p="1.5"
        _focusVisible={{
          outline: "2px solid rgba(128, 128, 128, 0.34)",
          borderRadius: "4px",
        }}
        contentEditable={isOpen}
        spellCheck="false"
        maxW="100ch"
        fontWeight="normal"
        fontSize="0.88rem"
        lineHeight="1.55"
        dangerouslySetInnerHTML={{
          __html: sanitizedHtml,
        }}
        {...props}
      >
        {props.children}
      </GridItem>
    );
  }
);

export default Editable;

interface EditableProps extends GridItemProps {
  sanitizedHtml: string;
  isOpen: boolean;
}
