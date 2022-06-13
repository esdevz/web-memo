import React from "react";
import { GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import { INote } from "../../store/types";

interface EmptyCollectionProps {
  notes?: INote[];
  activeTab: string;
}

const EmptyCollection = (props: EmptyCollectionProps) => {
  const color = useColorModeValue("blue.400", "gray.200");
  if (props.notes?.length === 0 && props.activeTab === "notes") {
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
