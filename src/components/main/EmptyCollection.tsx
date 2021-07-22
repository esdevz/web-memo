import { GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import { defaultState } from "../../store/noteStore";
import { INote } from "../../store/types";

interface EmptyCollectionProps {
  notes: Record<string, INote[]>;
  activeTab: string;
}

const EmptyCollection = (props: EmptyCollectionProps) => {
  const color = useColorModeValue("blue.400", "gray.200");
  if (defaultState(props.notes, props.activeTab)) {
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
