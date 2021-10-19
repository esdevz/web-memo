import React from "react";
import { Image, Avatar, IconProps } from "@chakra-ui/react";
import { CustomIcon, Layout } from "../../store/types";
import { CollectionIcon } from "../../../ui/icons";

const tabIconProps: IconProps = {
  boxSize: "7",
};
const TabIcon = (props: TabIconProps) => {
  if (props.collectionName === "notes") {
    return (
      <CollectionIcon
        {...tabIconProps}
        customIcon={props.customIcon === "default" ? "note" : props.customIcon}
      />
    );
  }

  if (props.customIcon !== "default") {
    return <CollectionIcon {...tabIconProps} customIcon={props.customIcon} />;
  }

  if (props.icon && props.customIcon === "default") {
    return <Image borderRadius="50%" w="2rem" src={props.icon} />;
  }

  if (props.layoutType === "minimized" && props.customIcon === "default" && !props.icon) {
    return <Avatar size="sm" name={props.collectionLabel} />;
  }

  return null;
};

export default TabIcon;

interface TabIconProps {
  icon?: string;
  customIcon: CustomIcon;
  layoutType: Layout;
  collectionName: string;
  collectionLabel: string;
}
