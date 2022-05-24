import React from "react";
import { GridItem, useColorModeValue } from "@chakra-ui/react";

const NotesContainer = (props: NotesContainerProps) => {
  const thumbColor = useColorModeValue(
    "rgba(0, 0, 0 , 0.2)",
    "rgba(255,255,255,0.3)"
  );
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
        "::-webkit-scrollbar": {
          width: "8px",
          backgroundColor: "transparent",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: thumbColor,
          borderRadius: "8px",
        },
      }}
    >
      {props?.children}
    </GridItem>
  );
};

export default NotesContainer;

interface NotesContainerProps {
  colSpan: number;
  children?: React.ReactNode;
}
