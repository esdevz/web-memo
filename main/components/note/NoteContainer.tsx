import React, { forwardRef } from "react";
import { GridProps, Grid } from "@chakra-ui/react";
import { clrSwitch } from "../../theme";

const NoteContainer = (
  props: NoteContainerProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  return (
    <Grid
      ref={ref}
      {...props}
      tabIndex={0}
      pos={props.open ? "fixed" : "static"}
      w={props.open ? "75%" : "20rem"}
      h={props.open ? "95%" : "16rem"}
      top={props.open ? 0 : undefined}
      p="2.5"
      as="article"
      shadow="md"
      templateRows="repeat(10,1fr)"
      templateColumns="1fr"
      gap={2}
      borderRadius={7}
      m="1"
      border="1px solid var(--border)"
      transition="height 0.2s ease-in-out"
      zIndex={props.open ? 2 : undefined}
      bgColor={clrSwitch[props.colorMode][props.noteColor || "default"]}
      _focusVisible={{
        boxShadow: "0 0 0 3px var(--outline-clr)",
      }}
      _focus={{
        boxShadow: "0 0 0 3px var(--outline-clr)",
      }}
    >
      {props.children}
    </Grid>
  );
};

export default forwardRef(NoteContainer);
interface NoteContainerProps extends GridProps {
  open: boolean;
  colorMode: "light" | "dark";
  noteColor?: string;
}
