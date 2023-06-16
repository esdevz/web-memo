import { DragEvent } from "react";
import { Text, Button, Tooltip, IconButton, useBoolean } from "@chakra-ui/react";
import useNoteStore from "../../store/noteStore";
import type { CustomIcon, Layout } from "../../store/types";
import TabIcon from "./TabIcon";
import { shallow } from "zustand/shallow";

const Tab = (props: SidebarProps) => {
  const { setActiveTab, activeTab, dropToCollection } = useNoteStore(
    (state) => ({
      setActiveTab: state.setActiveTab,
      activeTab: state.activeTab,
      dropToCollection: state.updateTargetCollection,
    }),
    shallow
  );

  const [dragHover, setDragHover] = useBoolean(false);

  const toggleActiveTab = () => {
    setActiveTab(props.website);
  };

  const onDropHandler = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (activeTab !== props.website) {
      dropToCollection(props.website);
      setDragHover.off();
    }
  };

  const dragOverHandler = (e: DragEvent<HTMLButtonElement>) => {
    if (activeTab !== props.website) {
      e.preventDefault();
    }
  };

  const dragHandlers = {
    onClick: toggleActiveTab,
    onDragEnter: setDragHover.on,
    onDragLeave: setDragHover.off,
    onDragOver: dragOverHandler,
    onDrop: onDropHandler,
  };

  if (props.tabLayout === "minimized") {
    return (
      <Tooltip placement="right" closeOnMouseDown label={props.displayName}>
        <IconButton
          {...dragHandlers}
          w="3.2rem"
          h="3.2rem"
          borderRadius="27%"
          colorScheme={setColorScheme(activeTab, props.website, dragHover)}
          _focus={{
            outlineColor: "transparent",
          }}
          _focusVisible={{
            boxShadow: "0 0 0 3px var(--outline-clr)",
          }}
          role="tab"
          aria-label={props.displayName}
          css={`
            & > * {
              pointer-events: none;
            }
          `}
          icon={
            <TabIcon
              icon={props.favicon}
              layoutType={props.tabLayout}
              customIcon={props.customIconType}
              collectionName={props.website}
              collectionLabel={props.displayName}
            />
          }
        />
      </Tooltip>
    );
  }
  return (
    <Button
      {...dragHandlers}
      borderRadius="md"
      role="tab"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      tabIndex={0}
      w="full"
      h="2.7em"
      colorScheme={setColorScheme(activeTab, props.website, dragHover)}
      css={`
        & > * {
          pointer-events: none;
        }
      `}
      leftIcon={
        <TabIcon
          icon={props.favicon}
          layoutType={props.tabLayout}
          customIcon={props.customIconType}
          collectionName={props.website}
          collectionLabel={props.displayName}
        />
      }
    >
      <Text as="h3">{props.displayName}</Text>
    </Button>
  );
};
export default Tab;

interface SidebarProps {
  website: string;
  favicon?: string;
  displayName: string;
  customIconType: CustomIcon;
  tabLayout: Layout;
}

function setColorScheme(activeTab: string, url: string, dragOver: boolean) {
  if (dragOver) {
    return "purple";
  }
  return activeTab === url ? "bb" : "gray";
}
