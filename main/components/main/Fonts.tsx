import React from "react";
import { Button, Text, VStack } from "@chakra-ui/react";
import FormInput from "../../../ui/form/FormInput";

const options = [
  "Note title",
  "Note body",
  "Note link",
  "Header 1",
  "Header 2",
  "Header 3",
];

export const Fonts = () => {
  return (
    <VStack as="form" gridColumn="2" gridRow="1/6" w="full">
      <Text color="var(--txt-clr-header)" alignSelf="start" as="h2">
        Custom fonts :
      </Text>
      <Text alignSelf="start" as="em">
        choose fonts installed on your system
      </Text>
      {options.map((option) => (
        <FormInput
          w="full"
          label={option}
          inputProps={{
            w: "full",
            size: "sm",
          }}
        />
      ))}
      <Button w="full" type="submit" variant="outline" colorScheme="bb">
        <Text as="h3"> Save </Text>
      </Button>
    </VStack>
  );
};
