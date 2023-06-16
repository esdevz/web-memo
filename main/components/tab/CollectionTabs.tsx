import { useCallback } from "react";
import { AnimatePresence, MotionProps, Reorder } from "framer-motion";
import useNoteStore from "../../store/noteStore";
import Tab from "./Tab";
import { db } from "../../store/db";
import { shallow } from "zustand/shallow";
import { IconButton, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import Drawer from "../../../ui/drawer/Drawer";
import { RiMenuUnfoldFill } from "react-icons/ri";
import type { Collection, Layout } from "../../store/types";

type ReorderTabsProps = {
  layout: Layout;
  tabs: string[];
  setTabs: (next: string[]) => void;
  updateCollectionOrder: () => void;
  collections: Record<string, Collection>;
  smallScreen: boolean;
};
const animationProps: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const ReorderTabs = (props: ReorderTabsProps) => {
  return (
    <Reorder.Group
      as="section"
      axis="y"
      style={{
        padding: 4,
        gridArea: `span 1 / ${props.layout === "default" ? "span 3" : "span 1"}`,
        gap: 8,
        display: "grid",
        overflow: "auto",
        scrollbarWidth: "none",
        gridAutoRows: "max-content",
      }}
      values={props.tabs}
      layoutScroll
      onReorder={props.setTabs}
      role="tablist"
      aria-label="websites"
    >
      <AnimatePresence>
        {props.tabs.map((url) => (
          <Reorder.Item
            as="div"
            key={url}
            value={url}
            onDragEnd={props.updateCollectionOrder}
            {...animationProps}
            layout
          >
            <Tab
              tabLayout={!props.smallScreen ? props.layout : "default"}
              displayName={props.collections[url].displayName}
              customIconType={props.collections[url].customIconType}
              website={url}
              favicon={props.collections[url].favicon}
            />
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

const CollectionTabs = () => {
  const { collections, tabs, setTabs, layout } = useNoteStore(
    (state) => ({
      collections: state.collections,
      tabs: state.tabs,
      setTabs: state.setTabs,
      layout: state.tabLayout,
    }),
    shallow
  );

  const [smallScreen] = useMediaQuery("(max-width: 55em)");
  const { isOpen, onClose, onOpen } = useDisclosure();

  const updateCollectionOrder = useCallback(() => {
    db.updateCollections(tabs);
  }, [tabs]);

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
          <ReorderTabs
            collections={collections}
            layout={layout}
            setTabs={setTabs}
            smallScreen={smallScreen}
            tabs={tabs}
            updateCollectionOrder={updateCollectionOrder}
          />
        </Drawer>
      </>
    );
  }
  return (
    <ReorderTabs
      collections={collections}
      layout={layout}
      setTabs={setTabs}
      smallScreen={smallScreen}
      tabs={tabs}
      updateCollectionOrder={updateCollectionOrder}
    />
  );
};

export default CollectionTabs;
