import React from "react";
import { Box, BoxProps } from "@chakra-ui/layout";

const Editable = (props: BoxProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <Box
      ref={ref}
      w="full"
      maxW="full"
      h="full"
      border="1px solid rgba(128, 128, 128, 0.34)"
      borderRadius="2"
      p="1.5"
      spellCheck="false"
      overflow="auto"
      lineHeight="1.55"
      css={`
        scrollbar-width: thin;
        & ol,
        & ul {
          padding-inline: revert;
        }
        & * {
          white-space: break-spaces;
        }
        &:focus-visible {
          outline: 2px solid rgb(49, 130, 206);
          border-radius: 4px;
        }
      `}
      {...props}
    />
  );
};

export default React.forwardRef(Editable);
