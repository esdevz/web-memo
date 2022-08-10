import React, { ChangeEvent, FormEvent, useState } from "react";
import type {
  CollectionOptions,
  CustomIcon,
  NotificationMessage,
} from "../../main/store/types";
import Select from "./Select";
import { IconList } from "../icons";
import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";

const EditCollectionForm = (props: EditCollectionFormProps) => {
  const [name, setName] = useState(props.dispalyName);
  const [icon, setIcon] = useState(props.iconType);
  const toast = useToast();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleIconChange = (option: CustomIcon) => {
    setIcon(option);
  };

  const submitCollection = async (e: FormEvent) => {
    e.preventDefault();
    const feedback = await props.editCollection(props.url, {
      customIconType: icon,
      displayName: name,
      favicon: props.favicon,
    });
    feedback.type === "error" &&
      toast({
        title: (
          <Text as="h2" textTransform="capitalize">
            {feedback.message}
          </Text>
        ),
        status: feedback.type,
        duration: 1500,
      });
  };
  return (
    <form style={{ gridArea: "coll" }} onSubmit={submitCollection}>
      <FormControl id="collection-option">
        <FormLabel>
          <Text color="var(--txt-clr-header)" as="h2">
            Collection :
          </Text>
        </FormLabel>
        <HStack>
          <Select
            currentIcon={icon}
            favicon={props.favicon}
            changeMenuIcon={handleIconChange}
            options={IconList}
          />
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="name"
          />
        </HStack>
      </FormControl>
      <Button mt="2rem" w="full" variant="outline" colorScheme="bb" type="submit">
        <Text as="h3">Apply</Text>
      </Button>
    </form>
  );
};

export default EditCollectionForm;

interface EditCollectionFormProps {
  url: string;
  dispalyName: string;
  iconType: CustomIcon;
  favicon?: string;
  editCollection: (
    website: string,
    newCollection: CollectionOptions
  ) => Promise<NotificationMessage>;
}
