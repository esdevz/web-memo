import { ButtonGroup, ButtonGroupProps } from "@chakra-ui/react";
import { CSSProperties, useCallback } from "react";
import { BsCode } from "react-icons/bs";
import { BiHeading } from "react-icons/bi";
import {
  MdFormatTextdirectionLToR,
  MdFormatTextdirectionRToL,
} from "react-icons/md";
import {
  AiOutlineHighlight,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { FaRemoveFormat } from "react-icons/fa";
import {
  toggleBold,
  toggleItalic,
  toggleStrikethrough,
  toggleUnderline,
  toggleBullet,
  toggleNumbering,
  toggleCodeBlock,
  setDirection,
  setFontSize,
  setFontName,
  setBackgroundColor,
  clearFormat,
} from "roosterjs-editor-api";
import type { Editor } from "roosterjs-editor-core";
import Option from "./Option";
import { OptionValues } from "../main/store/types";
import ToolbarButton from "./ToolbarButton";

interface ToolsProps extends ButtonGroupProps {
  editor?: Editor;
  fontSize?: CSSProperties["fontSize"];
  fonts?: {
    h1: string;
    h2: string;
    h3: string;
  };
}

type FontStyle = "B" | "I" | "U" | "S" | "UL" | "OL" | "RTL" | "LTR" | "CODE" | "RM";

const colors: OptionValues[] = [
  { name: "default", value: "inherit" },
  { name: "teal", value: "var(--hl-teal)" },
  { name: "blue", value: "var(--hl-blue)" },
  { name: "pink", value: "var(--hl-pink)" },
  { name: "yellow", value: "var(--hl-yellow)" },
  { name: "green", value: "var(--hl-green)" },
  { name: "gray", value: "var(--hl-gray)" },
];

const Tools = ({ editor, fontSize, fonts, ...props }: ToolsProps) => {
  const headers: OptionValues[] = [
    { name: "X", value: "inherit", font: "inherit" },
    {
      name: "H1",
      value: "1.8rem",
      font: fonts?.h1 || "Rubik Variable, Verdana, Roboto, sans-serif",
    },
    {
      name: "H2",
      value: "1.6rem",
      font: fonts?.h2 || "Rubik Variable, Verdana, Roboto, sans-serif",
    },
    {
      name: "H3",
      value: "1.4rem",
      font: fonts?.h3 || "Rubik Variable, Verdana, Roboto, sans-serif",
    },
  ];

  const editTextStyle = useCallback(
    (type: FontStyle) => () => {
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
          case "RM":
            clearFormat(editor, 2);
            break;
          default:
            break;
        }
      }
    },
    [editor]
  );

  const setHeader = useCallback(
    (opt: OptionValues) => {
      if (editor) {
        setFontName(editor, opt.font || "inherit");
        setFontSize(editor, opt.value);
      }
    },
    [editor]
  );

  const highlight = useCallback(
    (opt: OptionValues) => {
      if (editor) {
        setBackgroundColor(editor, opt.value);
      }
    },
    [editor]
  );

  return (
    <ButtonGroup
      {...props}
      gridRow={"span 1 / span 1"}
      flexWrap="wrap"
      isAttached
      variant="outline"
    >
      <ToolbarButton
        fontSize={fontSize}
        name="Bold"
        onClick={editTextStyle("B")}
        fontWeight="bold"
      >
        B
      </ToolbarButton>
      <ToolbarButton
        fontSize={fontSize}
        name="Italic"
        onClick={editTextStyle("I")}
        fontStyle="italic"
      >
        I
      </ToolbarButton>
      <ToolbarButton
        fontSize={fontSize}
        name="Underline"
        onClick={editTextStyle("U")}
        textDecor="underline"
      >
        U
      </ToolbarButton>
      <ToolbarButton
        fontSize={fontSize}
        name="Line through"
        onClick={editTextStyle("S")}
        textDecor="line-through"
      >
        S
      </ToolbarButton>
      <Option
        tooltipFontSize={fontSize}
        name="highlight"
        size={props.size}
        aria-label="hightlight color"
        callback={highlight}
        mainIcon={<AiOutlineHighlight />}
        menuOptions={{
          type: "color",
          values: colors,
        }}
      />
      <Option
        tooltipFontSize={fontSize}
        name="Headers"
        size={props.size}
        aria-label="headers"
        callback={setHeader}
        mainIcon={<BiHeading />}
        menuOptions={{
          type: "text",
          values: headers,
        }}
      />
      <ToolbarButton
        fontSize={fontSize}
        name="Code block"
        onClick={editTextStyle("CODE")}
      >
        <BsCode />
      </ToolbarButton>
      <ToolbarButton
        fontSize={fontSize}
        name="Unordered list"
        onClick={editTextStyle("UL")}
      >
        <AiOutlineUnorderedList />
      </ToolbarButton>
      <ToolbarButton
        fontSize={fontSize}
        name="Ordered list"
        onClick={editTextStyle("OL")}
      >
        <AiOutlineOrderedList />
      </ToolbarButton>
      <ToolbarButton
        fontSize={fontSize}
        name="Left to Right"
        onClick={editTextStyle("LTR")}
      >
        <MdFormatTextdirectionLToR />
      </ToolbarButton>
      <ToolbarButton
        fontSize={fontSize}
        name="Right to Left"
        onClick={editTextStyle("RTL")}
      >
        <MdFormatTextdirectionRToL />
      </ToolbarButton>
      <ToolbarButton
        fontSize={fontSize}
        name="Clear format"
        onClick={editTextStyle("RM")}
      >
        <FaRemoveFormat />
      </ToolbarButton>
    </ButtonGroup>
  );
};

export default Tools;
