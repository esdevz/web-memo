import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Image,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

const DataList = (props: DataListProps) => {
  return (
    <HStack fontFamily="Raleway" fontSize="1em" spacing="1" w="65%">
      <InputGroup w="clamp(auto, 45%,60%)">
        <InputLeftAddon>
          Collection:
          {props.icon && (
            <Image ml="2ch" borderRadius="50%" w="1.2em" src={props.icon} />
          )}
        </InputLeftAddon>
        <Input
          w="full"
          value={props.defaultValue}
          onChange={props.onChangeHandler}
          name="website"
          list="collections"
          id="collection-list"
          placeholder="collection name ..."
        />
      </InputGroup>

      <datalist id="collections">
        {props.collections.map((col) => (
          <option key={col} value={col} />
        ))}
      </datalist>
    </HStack>
  );
};

export default DataList;

interface DataListProps {
  defaultValue: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  collections: string[];
  icon?: string;
}
