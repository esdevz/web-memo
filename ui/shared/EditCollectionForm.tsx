import React, { ChangeEvent, FormEvent, useState } from "react";
import { CollectionOptions, CustomIcon } from "../../src/store/types";
import Select from "./Select";
import { IconList } from "../icons";
import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Button,
  useBoolean,
} from "@chakra-ui/react";

const EditCollectionForm = (props: EditCollectionFormProps) => {
  const [loading, setLoading] = useBoolean(false);
  const [name, setName] = useState(props.dispalyName);
  const [icon, setIcon] = useState(props.iconType);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleIconChange = (option: CustomIcon) => {
    setIcon(option);
  };

  const submitCollection = async (e: FormEvent) => {
    e.preventDefault();
    setLoading.on();
    await props.editCollection(props.url, {
      customIconType: icon,
      displayName: name,
    });
    setLoading.off();
  };
  return (
    <form onSubmit={submitCollection}>
      <FormControl id="collection-option">
        <FormLabel> Collection :</FormLabel>
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
      <Button
        mt="2rem"
        isLoading={loading}
        w="full"
        variant="outline"
        colorScheme="bb"
        type="submit"
      >
        save
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
  editCollection: (website: string, newCollection: CollectionOptions) => Promise<void>;
}
