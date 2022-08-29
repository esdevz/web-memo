import { CustomIcon } from "../../main/store/types";
import { IconProps, Icon } from "@chakra-ui/react";
import {
  BsClipboard,
  BsFileEarmarkCode,
  BsListCheck,
  BsPaperclip,
} from "react-icons/bs";
import { BiFoodMenu, BiScreenshot, BiShoppingBag } from "react-icons/bi";
import { RiMovieLine, RiStickyNoteFill } from "react-icons/ri";
import { AiOutlineQrcode } from "react-icons/ai";

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
  "QR",
  "paper",
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
      return <Icon as={BsClipboard} {...rest} />;
    case "QR":
      return <Icon as={AiOutlineQrcode} {...rest} />;
    case "paper":
      return <Icon as={BsPaperclip} {...rest} />;
    default:
      return null;
  }
};
