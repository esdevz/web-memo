import {
  Button,
  IconButton,
  IconButtonProps,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { CSSProperties } from "react";
import { MenuOptions, OptionValues } from "../main/store/types";

interface Props extends IconButtonProps {
  mainIcon: JSX.Element;
  menuOptions: MenuOptions;
  callback: (opt: OptionValues) => void;
  tooltipFontSize?: CSSProperties["fontSize"];
}

const Option = ({
  mainIcon,
  menuOptions,
  callback,
  tooltipFontSize,
  ...props
}: Props) => {
  return (
    <Menu placement="bottom">
      <Tooltip fontSize={tooltipFontSize} label={props.name} placement="bottom">
        <MenuButton type="button" alignSelf="baseline">
          <IconButton
            {...props}
            variant="outline"
            borderRadius="0"
            icon={mainIcon}
          />
        </MenuButton>
      </Tooltip>

      <MenuList minW={0} w="max-content" paddingInline="0.3rem">
        {menuOptions.values.map((op) => (
          <Button
            type="button"
            onClick={() => callback(op)}
            variant={menuOptions.type === "color" ? "unstyled" : "outline"}
            aria-label={op.name}
            key={op.name}
            bgColor={menuOptions.type === "color" ? op.value : undefined}
            border="1px solid var(--border)"
            size="xs"
            marginInline="1"
            borderRadius={4}
          >
            {menuOptions.type === "text" && op.name}
          </Button>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Option;
