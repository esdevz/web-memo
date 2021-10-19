import React from "react";
import { CustomIcon } from "../../src/store/types";
import { IconProps, Icon } from "@chakra-ui/react";
import { BsFileEarmarkCode, BsListCheck } from "react-icons/bs";
import { BiClipboard, BiFoodMenu, BiScreenshot, BiShoppingBag } from "react-icons/bi";
import { RiMovieLine, RiStickyNoteFill } from "react-icons/ri";

interface CollectionIconProps extends IconProps {
  customIcon: CustomIcon;
}

export const IconList: CustomIcon[] = [
  "screenshot",
  "movie",
  "menu",
  "code",
  "todo",
  "note",
  "shop",
  "clipboard",
];

export const CollectionIcon = ({ customIcon, ...rest }: CollectionIconProps) => {
  switch (customIcon) {
    case "screenshot":
      return <Icon as={BiScreenshot} {...rest} />;
    case "shop":
      return <Icon as={BiShoppingBag} {...rest} />;
    case "code":
      return <Icon as={BsFileEarmarkCode} {...rest} />;
    case "menu":
      return <Icon as={BiFoodMenu} {...rest} />;
    case "movie":
      return <Icon as={RiMovieLine} {...rest} />;
    case "note":
      return <Icon as={RiStickyNoteFill} {...rest} />;
    case "todo":
      return <Icon as={BsListCheck} {...rest} />;
    case "clipboard":
      return <Icon as={BiClipboard} {...rest} />;
    default:
      return null;
  }
};
