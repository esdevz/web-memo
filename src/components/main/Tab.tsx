import { Text, Image, Button } from "@chakra-ui/react";

import useNoteStore from "../../store/noteStore";
import { INote } from "../../store/types";

const Tab = (props: SidebarProps) => {
  const setActiveTab = useNoteStore((state) => state.setActiveTab);

  const toggleActiveTab = () => {
    setActiveTab(props.note.website);
  };

  return (
    <Button
      onClick={toggleActiveTab}
      role="tab"
      display="flex"
      align="center"
      justifyContent="flex-start"
      tabIndex={0}
      w="full"
      h="2.7em"
    >
      {props.note.favicon && (
        <Image mr="2ch" borderRadius="50%" w="2rem" src={props.note.favicon} />
      )}
      <Text as="h3"> {props.note.website} </Text>
    </Button>
  );
};
export default Tab;

interface SidebarProps {
  note: INote;
}
