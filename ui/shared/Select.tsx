import React from "react";
import { CollectionIcon } from "../icons";
import { CustomIcon } from "../../src/store/types";
import {
  Image,
  HStack,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MdKeyboardArrowDown } from "react-icons/md";

const IconSelect = ({
  options,
  currentIcon,
  favicon,
  changeMenuIcon,
}: IconSelectProps) => {
  return (
    <HStack>
      <Menu>
        <MenuButton as={Button} w="5rem" rightIcon={<MdKeyboardArrowDown />}>
          {currentIcon === "default" && favicon ? (
            <Image boxSize="6" borderRadius="50%" src={favicon} />
          ) : (
            <CollectionIcon
              boxSize="6"
              marginInline="auto"
              customIcon={currentIcon}
            />
          )}
        </MenuButton>
        <MenuList justifyContent="center" minW="0" w="5rem">
          <MenuItem onClick={() => changeMenuIcon("default")}>default</MenuItem>
          {options.map((iconName) => (
            <MenuItem
              justifyContent="center"
              key={iconName}
              onClick={() => changeMenuIcon(iconName)}
            >
              <CollectionIcon boxSize="6" customIcon={iconName} />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  );
};
export default IconSelect;

interface IconSelectProps {
  options: CustomIcon[];
  currentIcon: CustomIcon;
  favicon?: string;
  changeMenuIcon: (opt: CustomIcon) => void;
}
