import React, { ForwardedRef, forwardRef } from "react";
import { GridItem, GridItemProps } from "@chakra-ui/react";

const Editable = forwardRef(
  (
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

            &:focus-visible {
              outline: 2px solid rgba(128, 128, 128, 0.34);
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
        whiteSpace="break-spaces"
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
            padding-inline: revert;
          }

          &:focus-visible {
            outline: 2px solid rgba(128, 128, 128, 0.34);
            border-radius: 4px;
          }
        `}
        {...props}
      />
    );
  }
);

export default Editable;

interface EditableProps extends GridItemProps {
  sanitizedHtml: string;
  isOpen: boolean;
}
