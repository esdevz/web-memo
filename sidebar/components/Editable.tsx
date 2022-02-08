import React from "react";
import { Box } from "@chakra-ui/layout";

interface Props {
  contentRef: React.RefObject<HTMLDivElement>;
  onInputChange: (e: React.FormEvent<HTMLDivElement>) => void;
  onPasteHandler: (e: React.ClipboardEvent<HTMLDivElement>) => false | void;
  sanitizedHtml: string;
}

const Editable = (props: Props) => {
  return (
    <Box
      ref={props.contentRef}
      onInput={props.onInputChange}
      onPaste={props.onPasteHandler}
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
