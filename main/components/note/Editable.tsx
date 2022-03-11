import React, { ForwardedRef, forwardRef } from "react";
import { GridItem, GridItemProps } from "@chakra-ui/react";

const Editable = (
  { sanitizedHtml, isOpen, ...props }: EditableProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  if (!isOpen) {
    return (
      <GridItem
        overflow="hidden"
        noOfLines={6}
        whiteSpace="break-spaces"
        rowSpan={7}
        cursor={"pointer"}
        p="1"
        maxW="95%"
        fontWeight="normal"
        fontSize="0.9rem"
        lineHeight="1.55"
        css={`
          & ol,
          & ul {
            padding-inline: revert;
          }
          & * {
            white-space: pre-wrap;
          }
          & pre {
            padding: 0.5em;
          }
          &:focus-visible {
            outline: 2px solid var(--border);
            border-radius: 4px;
          }
        `}
        dangerouslySetInnerHTML={{
          __html: sanitizedHtml,
        }}
        {...props}
      />
    );
  }
  return (
    <GridItem
      ref={ref}
      overflow="auto"
      rowSpan={8}
      p="1"
      spellCheck="false"
      maxW="95%"
      fontWeight="normal"
      fontSize="0.9rem"
      lineHeight="1.55"
      css={`
        scrollbar-width: thin;
        & ol,
        & ul {
          padding-inline: 2ch;
        }
        & pre {
          padding: 0.5em;
        }
        & * {
          white-space: pre-wrap;
        }

        &:focus-visible {
          outline: 2px solid var(--border);
          border-radius: 4px;
        }
      `}
      {...props}
    />
  );
};

export default forwardRef(Editable);

interface EditableProps extends GridItemProps {
  sanitizedHtml: string;
  isOpen: boolean;
}
