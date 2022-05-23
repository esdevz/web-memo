import React from "react";
import { GridItem } from "@chakra-ui/react";

interface NoteSectionProps {
  children?: React.ReactNode;
}

const NoteSection = (props: NoteSectionProps) => {
  return (
    <GridItem
      as="section"
      colSpan={1}
      display="grid"
      gridGap="4px"
      gridTemplateColumns="repeat(auto-fill, 20.3rem)"
      gridTemplateRows="repeat(auto-fill, 16.3rem)"
    >
      {props?.children}
    </GridItem>
  );
};

export default NoteSection;
