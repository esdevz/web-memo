import { GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import { defaultState } from "../../store/noteStore";
import { INote } from "../../store/types";

interface EmptyCollectionProps {
  notes: Record<string, INote[]>;
}

const EmptyCollection = (props: EmptyCollectionProps) => {
  const color = useColorModeValue("blue.400", "gray.200");
  if (defaultState(props.notes)) {
    return (
      <GridItem
        display="grid"
        placeItems="center"
        gridTemplateRows="minmax(10vh, 80vh)"
        colSpan={1}
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
