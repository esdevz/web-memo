import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  useColorMode,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { IoColorPaletteSharp } from "react-icons/io5";
import { NotificationMessage } from "../../store/types";
import { clrSwitch } from "../../theme";
interface ColorSwitchProps {
  setNoteColor: (
    id: number,
    clr: string,
    website: string
  ) => Promise<NotificationMessage>;
  noteId: number;
  website: string;
}

const Colors = (props: ColorSwitchProps) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [loading, setLoading] = useBoolean(false);

  const setNoteColorHandler = async (clr: string) => {
    setLoading.on();
    const feedback = await props.setNoteColor(props.noteId, clr, props.website);
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
