import { Button, ButtonGroup, ButtonGroupProps } from "@chakra-ui/react";
import React from "react";
import { BsCode } from "react-icons/bs";
import { BiHeading, BiHighlight } from "react-icons/bi";
import {
  MdFormatTextdirectionLToR,
  MdFormatTextdirectionRToL,
} from "react-icons/md";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import {
  toggleBold,
  toggleItalic,
  toggleStrikethrough,
  toggleUnderline,
  toggleBullet,
  toggleNumbering,
  toggleCodeBlock,
  setDirection,
  setBackgroundColor,
  setFontSize,
  setFontName,
} from "roosterjs-editor-api";
import type { Editor } from "roosterjs-editor-core";
import Option from "./Option";
import { OptionValues } from "../main/store/types";
import { useHighLightColors } from "./useHLColors";

interface ToolsProps extends ButtonGroupProps {
  editor?: Editor;
}

type FontStyle = "B" | "I" | "U" | "S" | "UL" | "OL" | "RTL" | "LTR" | "CODE";

const headers: OptionValues[] = [
  { name: "X", value: "inherit", font: "inherit" },
  { name: "H1", value: "1.8rem", font: "Trebuchet MS,Roboto,sans-serif" },
  { name: "H2", value: "1.6rem", font: "Trebuchet MS,Roboto,sans-serif" },
  { name: "H3", value: "1.4rem", font: "Trebuchet MS,Roboto,sans-serif" },
];

const Tools = ({ editor, ...props }: ToolsProps) => {
  const colors = useHighLightColors();

  const editTextStyle = (type: FontStyle) => () => {
    if (editor) {
      switch (type) {
        case "B":
          toggleBold(editor);
          break;
        case "I":
          toggleItalic(editor);
          break;
        case "U":
          toggleUnderline(editor);
          break;
        case "S":
          toggleStrikethrough(editor);
          break;
        case "UL":
          toggleBullet(editor);
          break;
        case "OL":
          toggleNumbering(editor);
          break;
        case "RTL":
          setDirection(editor, 1);
          break;
        case "LTR":
          setDirection(editor, 0);
          break;
        case "CODE":
          toggleCodeBlock(editor);
          break;

        default:
          break;
      }
    }
  };

  const highlight = (opt: OptionValues) => {
    if (editor) {
      setBackgroundColor(editor, opt.value);
    }
  };

  const setHeader = (opt: OptionValues) => {
    if (editor) {
      setFontName(editor, opt.font || "inherit");
      setFontSize(editor, opt.value);
    }
  };

  return (
    <ButtonGroup
      {...props}
      gridRow={"span 1 / span 1"}
      flexWrap="wrap"
      spacing="2px"
      isAttached
      variant="outline"
    >
      <Button onClick={editTextStyle("B")} fontWeight="bold">
        B
      </Button>
      <Button onClick={editTextStyle("I")} fontStyle="italic">
        I
      </Button>
      <Button onClick={editTextStyle("U")} textDecor="underline">
        U
      </Button>
      <Button onClick={editTextStyle("S")} textDecor="line-through">
        S
      </Button>
      <Button onClick={editTextStyle("CODE")}>
        <BsCode />
      </Button>
      <Button onClick={editTextStyle("UL")}>
        <AiOutlineUnorderedList />
      </Button>
      <Button onClick={editTextStyle("OL")}>
        <AiOutlineOrderedList />
      </Button>
      <Button onClick={editTextStyle("LTR")}>
        <MdFormatTextdirectionLToR />
      </Button>
      <Button onClick={editTextStyle("RTL")}>
        <MdFormatTextdirectionRToL />
      </Button>
      <Option
        size={props.size}
        aria-label="headers"
        callback={setHeader}
        mainIcon={<BiHeading />}
        menuOptions={{
          type: "text",
          values: headers,
        }}
      />
      <Option
        size={props.size}
        aria-label="highlight color"
        callback={highlight}
        mainIcon={<BiHighlight />}
        menuOptions={{
          type: "color",
          values: colors,
        }}
      />
    </ButtonGroup>
  );
};

export default Tools;
