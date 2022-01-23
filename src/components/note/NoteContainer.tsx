import React from "react";
import { GridProps, Grid } from "@chakra-ui/react";

const NoteContainer = (props: NoteContainerProps) => {
  return (
    <Grid
      {...props}
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
      border="1px solid rgba(128, 128, 128, 0.34)"
      transition="height 0.2s ease-in-out"
      zIndex={props.open ? 2 : undefined}
      bgColor={props.colorMode === "dark" ? "gray.800" : "white"}
    >
      {props.children}
    </Grid>
  );
};

export default NoteContainer;

interface NoteContainerProps extends GridProps {
  open: boolean;
  colorMode: "light" | "dark";
}
