import React from "react";
import { GridItem } from "@chakra-ui/react";
import type { Layout } from "../../store/types";

const NotesContainer = (props: NotesContainerProps) => {
  const colSpan = props.layout === "default" ? 13 : 15;

  return (
    <GridItem
      pos="relative"
      role="tabpanel"
      tabIndex={0}
      as="section"
      rowSpan={1}
      colSpan={props.smallScreen ? 16 : colSpan}
      display="grid"
      gridGap="1"
      gridTemplateColumns="1fr"
      gridAutoRows="max-content"
      overflow="auto"
      sx={{
        scrollbarWidth: "thin",
      }}
    >
      {props?.children}
    </GridItem>
  );
};

export default NotesContainer;

interface NotesContainerProps {
  children?: React.ReactNode;
  layout: Layout;
  smallScreen?: boolean;
}
