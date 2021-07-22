import { GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";

const NoteSection = (props: { children: ReactNode }) => {
  return (
    <GridItem
      as="section"
      colSpan={1}
      display="grid"
      gridGap="1.5"
      gridTemplateColumns="repeat(auto-fill, 355px)"
      gridTemplateRows="repeat(auto-fill,275px)"
    >
      {props.children}
    </GridItem>
  );
};

export default NoteSection;
