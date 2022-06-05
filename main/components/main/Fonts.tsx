import React, { useCallback, useState } from "react";
import { Button, Text, useBoolean, useToast, Box } from "@chakra-ui/react";
import FormInput from "../../../ui/form/FormInput";
import { CustomFonts } from "../../store/types";
import useNoteStore from "../../store/noteStore";
import shallow from "zustand/shallow";

const options = [
  "Note title",
  "Header 1",
  "Note body",
  "Header 2",
  "code",
  "Header 3",
];

export const Fonts = () => {
  const [customFonts, updateCustomFonts] = useNoteStore(
    useCallback((state) => [state.customFonts, state.updateCustomFonts], []),
    shallow
  );

  const initialFontsState: CustomFonts = {
    title: customFonts?.title || "",
    h1: customFonts?.h1 || "",
    body: customFonts?.body || "",
    h2: customFonts?.h2 || "",
    code: customFonts?.code || "",
    h3: customFonts?.h3 || "",
  };
  const [fonts, setFonts] = useState(initialFontsState);
  const [loading, setLoading] = useBoolean();
  const toast = useToast();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFonts({
      ...fonts,
      [e.target.name]: e.target.value,
    });
  };
  const fontsArray = Object.keys(fonts) as Array<keyof typeof fonts>;

  const saveFonts = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading.on();
    const feedback = await updateCustomFonts(fonts);
    setLoading.off();
    toast({
      title: <Text as="h2">{feedback.message} </Text>,
      status: feedback.type,
      duration: 1500,
    });
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr 1fr"
      gridAutoRows="max-content"
      gridGap="5px"
      onSubmit={saveFonts}
      as="form"
      gridColumn="2"
      gridRow="1/6"
      w="full"
    >
      <Text gridColumn="1/3" color="var(--txt-clr-header)" alignSelf="start" as="h2">
        Custom fonts :
      </Text>
      <Text gridColumn="1/3" alignSelf="start" as="em">
        choose fonts installed on your system
      </Text>
      {fontsArray.map((prop, idx) => (
        <FormInput
          w="full"
          label={options[idx]}
          inputProps={{
            w: "full",
            size: "sm",
            type: "text",
            value: fonts[prop],
            name: prop,
            onChange: onChangeHandler,
          }}
        />
      ))}
      <Button
        isLoading={loading}
        isDisabled={loading}
        w="full"
        type="submit"
        variant="outline"
        colorScheme="bb"
        gridColumn="1/3"
      >
        <Text as="h3"> Save </Text>
      </Button>
    </Box>
  );
};
