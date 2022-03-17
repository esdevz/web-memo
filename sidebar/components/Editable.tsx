import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { setBadgeTempNote } from "../../utils/badgeColors";
import { Editor } from "roosterjs-editor-core";

interface Props extends BoxProps {
  port: chrome.runtime.Port;
  editor?: Editor;
}

const Editable = (
  { editor, port, ...props }: Props,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const onInputChange = () => {
    setBadgeTempNote();
    if (editor) {
      port.postMessage({
        msg: "EDITING",
        changes: { content: editor.getContent(), createdAt: Date.now() },
      });
    }
  };

  return (
    <Box
      ref={ref}
      onInput={onInputChange}
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
