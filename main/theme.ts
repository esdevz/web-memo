import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { themeColorPalette } from "../utils/theme";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    darkpink: {
      ...themeColorPalette([
        "#c46697",
        "#ba4d85",
        "#b13374",
        "#a71a62",
        "#9d0051",
        "#8d0049",
        "#7e0041",
        "#6e0039",
        "#5e0031",
      ]),
    },
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
  breakpoints,
  styles: {
    global: {
      h1: {
        fontSize: "1.4rem",
        fontFamily: "Raleway",
        fontWeight: "normal",
      },
      h2: {
        fontSize: "1rem",
        fontWeight: "600",
        fontFamily: "Georgia, sans-serif",
      },
      h3: {
        fontSize: "0.93rem",
        fontWeight: "500",
        fontFamily: "Raleway",
      },
      p: {
        fontSize: "0.88rem",
        fontWeight: "normal",
        fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
      },
      em: {
        fontSize: "0.65rem",
        fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
      },
      "::selection": {
        backgroundColor: "rgb(130,130,130,0.5)",
      },
    },
  },
});

export const clrSwitch: Record<"light" | "dark", Record<string, string>> = {
  light: {
    default: "white",
    yellow: "#FFF9BB",
    gray: "gray.200",
    purple: "purple.100",
    teal: "teal.100",
    red: "red.200",
    pink: "pink.200",
    green: "green.200",
    cyan: "cyan.200",
    blue: "blue.100",
  },
  dark: {
    default: "gray.800",
    yellow: "yellow.800",
    gray: "gray.600",
    purple: "purple.800",
    teal: "teal.800",
    red: "red.800",
    pink: "pink.800",
    green: "green.800",
    cyan: "cyan.800",
    blue: "blue.700",
  },
};

export default theme;
