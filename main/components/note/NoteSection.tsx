import React from "react";
import { GridItem } from "@chakra-ui/react";
import { LayoutGroup } from "framer-motion";

interface NoteSectionProps {
  children?: React.ReactNode;
  groupLayoutId?: string;
}

const NoteSection = (props: NoteSectionProps) => {
  return (
    <GridItem
      as="section"
      colSpan={1}
      display="grid"
      gridGap="4px"
      gridTemplateColumns="repeat(auto-fill, var(--note-section-column))"
      gridTemplateRows="repeat(auto-fill, 16.3rem)"
    >
      <LayoutGroup id={props.groupLayoutId}>{props?.children}</LayoutGroup>
    </GridItem>
  );
};

export default NoteSection;
