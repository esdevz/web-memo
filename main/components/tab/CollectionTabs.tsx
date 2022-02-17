import React, { useCallback } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import useNoteStore from "../../store/noteStore";
import Tab from "./Tab";
import { db } from "../../store/db";
import shallow from "zustand/shallow";

const CollectionTabs = () => {
  const [collections, tabs, setTabs, layout] = useNoteStore(
    useCallback(
      (state) => [state.collections, state.tabs, state.setTabs, state.tabLayout],
      []
    ),
    shallow
  );

  const updateCollectionOrder = () => {
    db.updateCollections(tabs);
  };

  return (
    <Reorder.Group
      as="section"
      axis="y"
      style={{
        padding: 4,
        gridArea: `1 / 1 / 1 / ${layout === "default" ? 3 : 1}`,
        gap: 8,
        display: "grid",
        overflow: "auto",
        scrollbarWidth: "none",
        gridAutoRows: "max-content",
      }}
      values={tabs}
      layoutScroll
      onReorder={setTabs}
      role="tablist"
      aria-label="websites"
    >
      <AnimatePresence>
        {tabs.map((url) => (
          <Tab
            updateOrder={updateCollectionOrder}
            value={url}
            key={url}
            displayName={collections[url].displayName}
            customIconType={collections[url].customIconType}
            website={url}
            favicon={collections[url].favicon}
          />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default CollectionTabs;
