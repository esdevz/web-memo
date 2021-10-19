import React, { FC } from "react";
import { GridItem } from "@chakra-ui/layout";

const TabContainer: FC<TabContainerProps> = (props) => {
  return (
    <GridItem
      p="1"
      role="tablist"
      aria-label="websites"
      as="section"
      rowSpan={1}
      colSpan={props.colSpan}
      gridGap="2.5"
      display="grid"
      overflow="auto"
      gridAutoRows="max-content"
      sx={{
        scrollbarWidth: "thin",
      }}
    >
      {props.children}
    </GridItem>
  );
};

export default TabContainer;

interface TabContainerProps {
  colSpan: number;
}
