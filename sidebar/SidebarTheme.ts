import { ColorMode, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { themeColorPalette } from "../utils/theme";

const config: ThemeConfig = {
  initialColorMode:
    (localStorage.getItem("chakra-ui-color-mode") as ColorMode) ?? "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,

  colors: {
    bb: {
      ...themeColorPalette([
        "#D8E6F4",
        "#B9D0E5",
        "#A1BBD5",
        "#8CA9C4",
        "#7C98B3",
        "#6188AD",
        "#4A79A6",
        "#3A6C9C",
        "#2B6093",
      ]),
    },
  },

  styles: {
    global: {
      h3: {
        fontSize: "md",
        fontWeight: "normal",
        fontFamily: "Raleway Variable",
      },
      em: {
        fontSize: "xs",
      },
      "::selection": {
        backgroundColor: "rgb(130,130,130,0.5)",
      },
    },
  },
});

export default theme;
