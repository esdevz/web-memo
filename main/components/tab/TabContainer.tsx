import React, { FC } from "react";
import { Reorder } from "framer-motion";

const TabContainer: FC<TabContainerProps> = (props) => {
  return (
    <Reorder.Group
      as="section"
      axis="y"
      style={{
        padding: 4,
        gridArea: `1 / 1 / 1 / ${props.colSpan}`,
        gap: 8,
        display: "grid",
        overflow: "auto",
        scrollbarWidth: "none",
        gridAutoRows: "max-content",
      }}
      values={props.values}
      layoutScroll
      onReorder={props.onReorder}
      role="tablist"
      aria-label="websites"
    >
      {props.children}
    </Reorder.Group>
  );
};

export default TabContainer;

interface TabContainerProps {
  colSpan: number;
  values: any[];
  onReorder: (newOrder: any[]) => void;
}
