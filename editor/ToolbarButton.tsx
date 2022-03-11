import { Button, ButtonProps, ComponentWithAs, Tooltip } from "@chakra-ui/react";
import React from "react";

const ToolbarButton: ComponentWithAs<"button", ButtonProps> = (props) => {
  return (
    <Tooltip label={props.name} placement="bottom">
      <Button {...props}>{props?.children}</Button>
    </Tooltip>
  );
};

export default ToolbarButton;
