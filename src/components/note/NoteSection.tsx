import React, { FC } from "react";
import { GridItem } from "@chakra-ui/react";

const NoteSection: FC = (props) => {
  return (
    <GridItem
      as="section"
      colSpan={1}
      display="grid"
      gridGap="1.5"
      gridTemplateColumns="repeat(auto-fill, 255px)"
      gridTemplateRows="repeat(auto-fill,275px)"
    >
      {props.children}
    </GridItem>
  );
};

export default NoteSection;
