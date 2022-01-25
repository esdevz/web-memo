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
    },
  },
});

export const clrSwitch: Record<"light" | "dark", Record<string, string>> = {
  light: {
    default: "white",
    yellow: "yellow.100",
    gray: "gray.200",
    purple: "purple.100",
    teal: "teal.100",
    red: "red.100",
    pink: "pink.200",
    green: "green.100",
    cyan: "cyan.100",
    blue: "blue.100",
  },
  dark: {
    default: "gray.800",
    yellow: "yellow.900",
    gray: "gray.600",
    purple: "purple.900",
    teal: "teal.800",
    red: "red.900",
    pink: "pink.800",
    green: "green.900",
    cyan: "cyan.900",
    blue: "blue.800",
  },
};

export default theme;
