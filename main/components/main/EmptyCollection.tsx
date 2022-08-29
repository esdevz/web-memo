import { GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import { Collection } from "../../store/types";
import { NOTES_TABLE } from "../../../idb/NotesDb";

interface EmptyCollectionProps {
  collections: Record<string, Collection>;
  activeTab: string;
}

const defaultState = (
  collection: Record<string, Collection>,
  activeTab: string
): boolean => {
  const initialState =
    Object.keys(collection).length === 1 &&
    collection[NOTES_TABLE].notes.length === 1;
  const emptyNotesCollection =
    collection[NOTES_TABLE].notes.length === 1 && activeTab === NOTES_TABLE;
  return initialState || emptyNotesCollection;
};

const EmptyCollection = (props: EmptyCollectionProps) => {
  const color = useColorModeValue("blue.400", "gray.200");
  if (defaultState(props.collections, props.activeTab)) {
    return (
      <GridItem
        display="grid"
        placeItems="center"
        gridTemplateRows="minmax(10vh, 80vh)"
        pos="absolute"
        w="full"
      >
        <Text as="h1" color={color}>
          notes collection is empty
        </Text>
      </GridItem>
    );
  }
  return null;
};

export default EmptyCollection;
