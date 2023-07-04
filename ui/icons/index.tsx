import { CustomIcon } from "../../main/store/types";
import {
  IconProps,
  Icon,
  Tooltip,
  IconButton,
  CircularProgress,
  IconButtonProps,
} from "@chakra-ui/react";
import {
  BsClipboard,
  BsFileEarmarkCode,
  BsListCheck,
  BsPaperclip,
} from "react-icons/bs";
import { BiFoodMenu, BiScreenshot, BiShoppingBag } from "react-icons/bi";
import { RiMovieLine, RiStickyNoteFill } from "react-icons/ri";
import { AiOutlineQrcode, AiOutlineSave, AiOutlineClear } from "react-icons/ai";
import { ImNewTab } from "react-icons/im";
import { PiTabsDuotone } from "react-icons/pi";

interface CollectionIconProps extends IconProps {
  customIcon: CustomIcon;
}

interface SidebarButtonProps {
  cb?: (arg?: any) => void | Promise<void>;
}

interface SaveButtonProps extends SidebarButtonProps {
  loading: boolean;
}

const IconButtonProps: Omit<IconButtonProps, "aria-label"> = {
  borderRadius: "50%",
  w: "4em",
  h: "4em",
};

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

export const Save = (props: SaveButtonProps) => {
  return (
    <Tooltip fontFamily="Raleway Variable" fontSize="1rem" label="save note">
      <IconButton
        {...IconButtonProps}
        type="submit"
        form="note-form"
        onClick={props.cb}
        icon={
          props.loading ? (
            <CircularProgress size="1em" isIndeterminate color="gray.400" />
          ) : (
            <AiOutlineSave size={20} />
          )
        }
        aria-label="save note"
      />
    </Tooltip>
  );
};
export const OpenInNewTab = (props: SidebarButtonProps) => {
  return (
    <Tooltip fontFamily="Raleway Variable" fontSize="1rem" label="Open Notes Tab">
      <IconButton
        {...IconButtonProps}
        onClick={props.cb}
        icon={<ImNewTab size={20} />}
        aria-label="open notes tab"
      />
    </Tooltip>
  );
};
export const SaveTabs = () => {
  return (
    <Tooltip fontFamily="Raleway Variable" fontSize="1rem" label="Save current Tabs">
      <IconButton
        {...IconButtonProps}
        icon={<PiTabsDuotone size={20} />}
        aria-label="save current tabs"
      />
    </Tooltip>
  );
};
export const Clear = () => {
  return (
    <Tooltip fontFamily="Raleway Variable" fontSize="1rem" label="Clear Note">
      <IconButton
        {...IconButtonProps}
        icon={<AiOutlineClear size={20} />}
        aria-label="clear note"
      />
    </Tooltip>
  );
};
