import { ChangeEvent } from "react";
import { HStack, Input } from "@chakra-ui/react";
import Select from "../shared/Select";
import { IconList } from "../icons";
import { CustomIcon } from "../../main/store/types";

const DataList = (props: DataListProps) => {
  return (
    <HStack fontFamily="Raleway Variable" fontSize="1em" spacing="1" w="65%">
      <Select
        currentIcon={props.icon}
        favicon={props.favicon}
        changeMenuIcon={props.handleIconChange}
        options={IconList}
      />
      <Input
        w="full"
        value={props.defaultValue}
        onChange={props.onChangeHandler}
        name="website"
        list="collections"
        id="collection-list"
        placeholder="collection name ..."
      />

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
  handleIconChange: (opt: CustomIcon) => void;
  collections: string[];
  icon: CustomIcon;
  favicon?: string;
}
