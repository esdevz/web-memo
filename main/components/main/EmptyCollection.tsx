import React from "react";
import { GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import { defaultState } from "../../../utils";
import { Collection } from "../../store/types";

interface EmptyCollectionProps {
  collections: Record<string, Collection>;
  activeTab: string;
}

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
