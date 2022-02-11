import React, { FC } from "react";
import { GridItem } from "@chakra-ui/react";

const NotesContainer: FC<NotesContainerProps> = (props) => {
  return (
    <GridItem
      pos="relative"
      role="tabpanel"
      tabIndex={0}
      as="section"
      rowSpan={1}
      colSpan={props.colSpan}
      display="grid"
      gridGap="1"
      gridTemplateColumns="1fr"
      gridAutoRows="max-content"
      overflow="auto"
      sx={{
        scrollbarWidth: "thin",
      }}
    >
      {props.children}
    </GridItem>
  );
};

export default NotesContainer;

interface NotesContainerProps {
  colSpan: number;
}
