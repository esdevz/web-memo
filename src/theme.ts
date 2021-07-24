import { extendTheme, Theme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

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

const theme = extendTheme<Theme>({
  config,
  colors: {
    darkpink: {
      100: "#c46697",
      200: "#ba4d85",
      300: "#b13374",
      400: "#a71a62",
      500: "#9d0051",
      600: "#8d0049",
      700: "#7e0041",
      800: "#6e0039",
      900: "#5e0031",
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
        fontSize: "0.9rem",
        fontWeight: "500",
        fontFamily: "Raleway",
      },
      p: {
        fontSize: "0.8rem",
        fontWeight: "normal",
        fontFamily: "Open Sans",
      },
      em: {
        fontSize: "0.65rem",
        fontFamily: "Open Sans",
      },
    },
  },
});

export default theme;
