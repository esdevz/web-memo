import { useCallback, useMemo } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import useNoteStore from "../../store/noteStore";
import Tab from "./Tab";
import { db } from "../../store/db";
import shallow from "zustand/shallow";
import { IconButton, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import Drawer from "../../../ui/drawer/Drawer";
import { RiMenuUnfoldFill } from "react-icons/ri";

const CollectionTabs = () => {
  const [collections, tabs, setTabs, layout] = useNoteStore(
    useCallback(
      (state) => [state.collections, state.tabs, state.setTabs, state.tabLayout],
      []
    ),
    shallow
  );

  const [smallScreen] = useMediaQuery("(max-width: 55em)");
  const { isOpen, onClose, onOpen } = useDisclosure();

  const updateCollectionOrder = useCallback(() => {
    db.updateCollections(tabs);
  }, [tabs]);

  const ReorderTabs = useMemo(
    () => (
      <Reorder.Group
        as="section"
        axis="y"
        style={{
          padding: 4,
          gridArea: `span 1 / ${layout === "default" ? "span 3" : "span 1"}`,
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
              tabLayout={!smallScreen ? layout : "default"}
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
    ),
    [collections, layout, setTabs, tabs, updateCollectionOrder, smallScreen]
  );

  if (smallScreen) {
    return (
      <>
        <IconButton
          aria-label="view tabs"
          colorScheme="bb"
          boxSize="2.85rem"
          position="fixed"
          bottom="1em"
          left="0"
          margin="0.7em"
          borderRadius="30%"
          zIndex={2}
          icon={<RiMenuUnfoldFill />}
          onClick={onOpen}
        />
        <Drawer
          size="sm"
          drawerTitle="Tabs"
          onClose={onClose}
          isOpen={isOpen}
          returnFocusOnClose={false}
          placement="left"
        >
          {ReorderTabs}
        </Drawer>
      </>
    );
  }
  return ReorderTabs;
};

export default CollectionTabs;
