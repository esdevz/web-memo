import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  useColorMode,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { IoColorPaletteSharp } from "react-icons/io5";
import { db } from "../../store/db";
import { clrSwitch } from "../../theme";
interface ColorSwitchProps {
  noteId: number;
  website: string;
}

const Colors = (props: ColorSwitchProps) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [loading, setLoading] = useBoolean(false);

  const setNoteColorHandler = async (clr: string) => {
    setLoading.on();
    const feedback = await db.updateNote(props.noteId, { colorScheme: clr });
    setLoading.off();
    feedback.type === "error" &&
      toast({
        title: feedback.message,
        status: feedback.type,
        duration: 1500,
      });
  };

  return (
    <Menu placement="top-end">
      <MenuButton>
        <IconButton
          borderColor="var(--border)"
          isLoading={loading}
          size="sm"
          variant="outline"
          icon={<IoColorPaletteSharp />}
          aria-label="change background color"
        />
      </MenuButton>
      <MenuList>
        {Object.entries(clrSwitch[colorMode]).map(([clr, val]) => (
          <IconButton
            onClick={() => setNoteColorHandler(clr)}
            variant="unstyled"
            aria-label={clr}
            key={clr}
            bgColor={val}
            border="1px solid var(--border)"
            size="xs"
            isRound
            marginInline="1"
          />
        ))}
      </MenuList>
    </Menu>
  );
};

export default Colors;
