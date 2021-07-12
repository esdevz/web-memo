import { GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";

const NotesContainer = (props: { children: ReactNode }) => {
  return (
    <GridItem
      pos="relative"
      role="tabpanel"
      tabIndex={0}
      as="section"
      rowSpan={1}
      colSpan={6}
      display="grid"
      gridGap="1"
      gridTemplateColumns="1fr"
      gridAutoRows="max-content"
      borderLeft="1px solid rgba(128, 128, 128, 0.34)"
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
