import { GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";

const NoteSection = (props: { children: ReactNode }) => {
  return (
    <GridItem
      as="section"
      colSpan={1}
      display="grid"
      gridGap="1"
      gridTemplateColumns="repeat(auto-fill, 345px)"
      gridTemplateRows="repeat(auto-fill,265px)"
    >
      {props.children}
    </GridItem>
  );
};

export default NoteSection;
