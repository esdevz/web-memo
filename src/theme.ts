import { extendTheme, ThemeConfig, Theme } from "@chakra-ui/react";
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
  config,
  styles: {
    global: {
      h2: {
        fontSize: "1.3em",
        fontWeight: "600",
        fontFamily: "Montserrat",
      },
      h3: {
        fontSize: "1em",
        fontWeight: "500",
        fontFamily: "Raleway",
      },
      em: {
        fontSize: "xs",
      },
    },
  },
});

export default theme;
