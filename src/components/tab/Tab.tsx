import React from "react";
import { Text, Button, Tooltip, IconButton } from "@chakra-ui/react";
import useNoteStore from "../../store/noteStore";
import { CustomIcon, INote } from "../../store/types";
import TabIcon from "./TabIcon";

const Tab = (props: SidebarProps) => {
  const [setActiveTab, activeTab, tabLayout] = useNoteStore((state) => [
    state.setActiveTab,
    state.activeTab,
    state.tabLayout,
  ]);

  const toggleActiveTab = () => {
    setActiveTab(props.note.website);
  };

  if (tabLayout === "minimized") {
    return (
      <Tooltip label={props.displayName}>
        <IconButton
          w="3.5rem"
          h="3.6rem"
          borderRadius="27%"
          m="auto"
          onClick={toggleActiveTab}
          colorScheme={activeTab === props.note.website ? "bb" : "gray"}
          _focus={{
            outlineColor: "transparent",
          }}
          role="tab"
          aria-label={props.displayName}
          icon={
            <TabIcon
              icon={props.favicon}
              layoutType={tabLayout}
              customIcon={props.customIconType}
              collectionName={props.note.website}
              collectionLabel={props.displayName}
            />
          }
        />
      </Tooltip>
    );
  }
  return (
    <Button
      onClick={toggleActiveTab}
      borderRadius="md"
      role="tab"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      tabIndex={0}
      w="full"
      h="2.7em"
      colorScheme={activeTab === props.note.website ? "bb" : "gray"}
      leftIcon={
        <TabIcon
          icon={props.favicon}
          layoutType={tabLayout}
          customIcon={props.customIconType}
          collectionName={props.note.website}
          collectionLabel={props.displayName}
        />
      }
    >
      <Text as="h3"> {props.displayName} </Text>
    </Button>
  );
};
export default Tab;

interface SidebarProps {
  note: INote;
  favicon?: string;
  displayName: string;
  customIconType: CustomIcon;
}
