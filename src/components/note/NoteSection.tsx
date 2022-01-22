import React, { FC } from "react";
import { GridItem } from "@chakra-ui/react";

const NoteSection: FC = (props) => {
  return (
    <GridItem
      as="section"
      colSpan={1}
      display="grid"
      gridGap="4px"
      gridTemplateColumns="repeat(auto-fill, 21.3rem)"
      gridTemplateRows="repeat(auto-fill, 16.3rem)"
    >
      {props.children}
    </GridItem>
  );
};

export default NoteSection;
