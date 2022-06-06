import React, { ForwardedRef, forwardRef } from "react";
import { GridItem, GridItemProps } from "@chakra-ui/react";

interface EditableProps extends GridItemProps {
  sanitizedHtml: string;
  isOpen: boolean;
  customFonts?: {
    body?: string;
    code?: string;
  };
}

const Editable = (
  { sanitizedHtml, isOpen, customFonts, ...props }: EditableProps,
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
        fontSize="0.95rem"
        lineHeight="1.55"
        css={`
          & ol,
          & ul {
            padding-inline: revert;
          }
          & * {
            white-space: pre-wrap;
          }
          & pre,
          code {
            font-family: ${customFonts?.code ?? ""};
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
      fontSize="0.95rem"
      lineHeight="1.55"
      contentEditable
      css={`
        scrollbar-width: thin;
        & ol,
        & ul {
          padding-inline: 2.6ch;
        }
        & pre,
        code {
          font-family: ${customFonts?.code ?? ""};
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
